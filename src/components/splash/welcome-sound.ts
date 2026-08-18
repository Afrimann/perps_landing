/**
 * The welcome instrumental.
 *
 * A short music-box piece — a plucked melody over a slow chord bed, through a
 * generated reverb — composed at runtime rather than streamed from a file.
 * Nothing to download on the first screen a visitor sees, nothing to license,
 * and the fade-out can be sample-accurate instead of fighting an <audio>
 * element's buffering.
 *
 * If the foundation supplies a recorded track, set `splash.audio` in
 * content/site.ts to its URL and this module plays that instead — the calling
 * component does not change either way.
 *
 * Everything is in A major pentatonic, which has no semitone clashes: any two
 * notes sound consonant together, so the melody stays pleasant even where the
 * reverb tail of one phrase overlaps the attack of the next.
 */

/** Seconds per beat. Slow — this is a foyer, not a trailer. */
const BEAT = 0.62;

/* A major pentatonic. */
const A4 = 440;
const B4 = 493.88;
const CS5 = 554.37;
const E5 = 659.25;
const FS5 = 739.99;
const A5 = 880;

/** The melody, as [frequency, length in beats]. Twenty-four beats, then loops. */
const MELODY: readonly (readonly [number, number])[] = [
  [A4, 1], [CS5, 1], [E5, 2],
  [FS5, 1], [E5, 1], [CS5, 2],
  [B4, 1], [CS5, 1], [A4, 2],
  [E5, 1], [FS5, 1], [A5, 2],
  [E5, 1], [CS5, 1], [B4, 2],
  [A4, 1], [B4, 1], [CS5, 2],
];

/** One chord per four beats: A · A · F#m · D · E · A. Resolves home each loop. */
const CHORDS: readonly (readonly number[])[] = [
  [220.0, 277.18, 329.63],
  [220.0, 277.18, 329.63],
  [185.0, 220.0, 277.18],
  [146.83, 185.0, 220.0],
  [164.81, 207.65, 246.94],
  [220.0, 277.18, 329.63],
];

const CHORD_BEATS = 4;

/** Overall ceiling. Unrequested audio must never be the loudest thing running. */
const PEAK = 0.42;

/** How far ahead of the clock notes are queued, and how often we top it up. */
const HORIZON = 0.6;
const TICK_MS = 120;

export type WelcomeSound = {
  /** Resolves false when the browser blocked playback (no user gesture yet). */
  start: () => Promise<boolean>;
  setMuted: (muted: boolean) => void;
  /** Fades out, then tears the graph down. Safe to call more than once. */
  stop: () => void;
};

/**
 * Noise with an exponential decay — a cheap, convincing hall. Generating it
 * costs a few milliseconds and saves shipping an impulse-response file.
 */
function buildReverb(ctx: AudioContext, seconds: number, decay: number) {
  const length = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    }
  }

  return buffer;
}

/** Plays a supplied recording instead of synthesising one. */
function fileSound(src: string): WelcomeSound {
  const el = new Audio(src);
  el.loop = true;
  el.volume = 0;
  el.preload = "auto";

  let fade = 0;
  let stopped = false;
  let muted = false;

  const rampTo = (target: number, ms: number, onDone?: () => void) => {
    window.clearInterval(fade);
    const from = el.volume;
    const started = performance.now();
    fade = window.setInterval(() => {
      const t = Math.min((performance.now() - started) / ms, 1);
      el.volume = Math.max(0, Math.min(1, from + (target - from) * t));
      if (t === 1) {
        window.clearInterval(fade);
        onDone?.();
      }
    }, 40);
  };

  return {
    async start() {
      if (stopped) return false;
      try {
        await el.play();
      } catch {
        return false;
      }
      rampTo(muted ? 0 : PEAK, 2400);
      return true;
    },
    setMuted(next) {
      muted = next;
      if (!stopped) rampTo(next ? 0 : PEAK, 400);
    },
    stop() {
      if (stopped) return;
      stopped = true;
      rampTo(0, 700, () => {
        el.pause();
        el.src = "";
      });
    },
  };
}

function synthSound(): WelcomeSound | null {
  const Ctx =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;

  if (!Ctx) return null;

  let ctx: AudioContext;
  try {
    ctx = new Ctx();
  } catch {
    /* Some embedded webviews expose the constructor but refuse to build one.
       Sound is a garnish here, so failing to get it is not an error state. */
    return null;
  }

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  /* Dry and reverberated paths run in parallel so the tail can sit well
     behind the notes without smearing their attack. */
  const dry = ctx.createGain();
  dry.gain.value = 0.72;
  dry.connect(master);

  const wet = ctx.createGain();
  wet.gain.value = 0.38;
  wet.connect(master);

  const hall = ctx.createConvolver();
  hall.buffer = buildReverb(ctx, 2.8, 2.4);
  hall.connect(wet);

  const send = (node: AudioNode) => {
    node.connect(dry);
    node.connect(hall);
  };

  const melodyBus = ctx.createGain();
  melodyBus.gain.value = 1;
  send(melodyBus);

  /* The pad is filtered well below the melody so the two occupy different
     bands and the chord never masks the tune. */
  const padTone = ctx.createBiquadFilter();
  padTone.type = "lowpass";
  padTone.frequency.value = 900;
  padTone.Q.value = 0.5;
  send(padTone);

  let timer = 0;
  let stopped = false;
  let muted = false;
  let running = false;

  let melodyStep = 0;
  let melodyAt = 0;
  let chordStep = 0;
  let chordAt = 0;

  /** Music-box timbre: a sine fundamental plus a quiet octave, struck and left to ring. */
  const pluck = (frequency: number, at: number, beats: number) => {
    const ring = Math.max(1.7, beats * BEAT * 1.9);

    const envelope = ctx.createGain();
    envelope.gain.setValueAtTime(0.0001, at);
    envelope.gain.exponentialRampToValueAtTime(0.19, at + 0.006);
    envelope.gain.exponentialRampToValueAtTime(0.0001, at + ring);

    /* Alternating placement gives the loop a gentle sway across the stereo
       field. StereoPanner is missing on older Safari, where it simply plays
       centred. */
    const pan = ctx.createStereoPanner?.();
    if (pan) {
      pan.pan.value = melodyStep % 2 === 0 ? -0.18 : 0.18;
      envelope.connect(pan);
      pan.connect(melodyBus);
    } else {
      envelope.connect(melodyBus);
    }

    const fundamental = ctx.createOscillator();
    fundamental.type = "sine";
    fundamental.frequency.value = frequency;
    fundamental.connect(envelope);

    const octave = ctx.createOscillator();
    octave.type = "sine";
    /* Two cents sharp of a true octave — the beating between them is what
       reads as struck metal rather than a test tone. */
    octave.frequency.value = frequency * 2.002;
    const octaveLevel = ctx.createGain();
    octaveLevel.gain.value = 0.16;
    octave.connect(octaveLevel);
    octaveLevel.connect(envelope);

    fundamental.start(at);
    octave.start(at);
    fundamental.stop(at + ring + 0.1);
    octave.stop(at + ring + 0.1);
  };

  const chord = (notes: readonly number[], at: number, beats: number) => {
    const length = beats * BEAT;

    notes.forEach((frequency, index) => {
      const level = 0.055 / (index * 0.6 + 1);

      const envelope = ctx.createGain();
      envelope.gain.setValueAtTime(0, at);
      envelope.gain.linearRampToValueAtTime(level, at + 1.1);
      envelope.gain.setValueAtTime(level, at + Math.max(1.2, length - 0.8));
      envelope.gain.linearRampToValueAtTime(0, at + length + 0.5);
      envelope.connect(padTone);

      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = frequency;
      osc.connect(envelope);
      osc.start(at);
      osc.stop(at + length + 0.6);
    });
  };

  /* Queues whatever falls inside the horizon. Scheduling against the audio
     clock rather than firing notes from the timer itself is what keeps the
     rhythm steady when the main thread is busy laying out the page. */
  const pump = () => {
    if (stopped) return;
    const horizon = ctx.currentTime + HORIZON;

    while (melodyAt < horizon) {
      const [frequency, beats] = MELODY[melodyStep % MELODY.length];
      pluck(frequency, melodyAt, beats);
      melodyAt += beats * BEAT;
      melodyStep += 1;
    }

    while (chordAt < horizon) {
      chord(CHORDS[chordStep % CHORDS.length], chordAt, CHORD_BEATS);
      chordAt += CHORD_BEATS * BEAT;
      chordStep += 1;
    }
  };

  return {
    async start() {
      if (stopped) return false;

      /* Autoplay policy: a context created without a prior user gesture is
         born suspended. resume() rejects in some engines and simply never
         settles in others, so a blocked attempt may just hang here — which is
         harmless, because the caller treats "never resolved" the same as
         "declined" and offers the visitor a button. */
      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch {
          return false;
        }
      }
      if (ctx.state !== "running") return false;
      if (running) return true;
      running = true;

      const at = ctx.currentTime + 0.12;
      melodyAt = at;
      chordAt = at;

      master.gain.setValueAtTime(0, at);
      master.gain.linearRampToValueAtTime(muted ? 0 : PEAK, at + 2.2);

      pump();
      timer = window.setInterval(pump, TICK_MS);
      return true;
    },

    setMuted(next) {
      muted = next;
      if (stopped) return;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(next ? 0 : PEAK, now + 0.4);
    },

    stop() {
      if (stopped) return;
      stopped = true;
      window.clearInterval(timer);

      const now = ctx.currentTime;
      const release = 0.8;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + release);

      /* Closing releases the audio hardware and every node with it. Once this
         runs there is no handle left to restart from, which is what makes the
         sound genuinely gone on the site rather than merely paused. */
      window.setTimeout(
        () => {
          void ctx.close().catch(() => {});
        },
        (release + 0.3) * 1000
      );
    },
  };
}

export function createWelcomeSound(src?: string | null): WelcomeSound | null {
  if (typeof window === "undefined") return null;
  return src ? fileSound(src) : synthSound();
}
