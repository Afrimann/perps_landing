"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Counter, MaskedLines, Reveal } from "@/components/motion/primitives";
import { bankDetails, contact, give } from "@/content/site";
import {
  givingPresets,
  givingRange,
  givingUnits,
  naira,
} from "@/content/giving";

function CopyableRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard unavailable (insecure context or denied) — the value is
         still on screen to read, so there is nothing to recover from. */
    }
  };

  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-white/8 py-4 last:border-0">
      <dt className="text-sm text-stone-500">{label}</dt>
      <dd className="flex items-center gap-3">
        <span
          className={`font-semibold text-white ${mono ? "font-mono text-lg tracking-[0.14em] tabular" : ""}`}
        >
          {value}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-full border border-white/12 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] text-stone-500 uppercase transition-colors hover:border-brass-500/50 hover:text-brass-300"
          aria-label={`Copy ${label}`}
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </dd>
    </div>
  );
}

export function Give() {
  const [amount, setAmount] = useState(25000);

  return (
    <section
      id="give"
      className="grain relative overflow-hidden bg-ink-900 py-28 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="animate-drift pointer-events-none absolute -top-1/4 left-1/2 h-[60vh] w-[80vw] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(168,122,34,0.5) 0%, transparent 65%)",
        }}
      />

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[2rem] leading-[1.1] tracking-tight text-white sm:text-[2.8rem] lg:text-[3.3rem]">
            <MaskedLines
              lines={[
                give.headingLead,
                <span key="a" className="text-gradient-brass">
                  {give.headingAccent}
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-8 max-w-xl text-[1.02rem] leading-relaxed text-stone-400">
              {give.body}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-2">
          {/* ── Calculator ── */}
          <Reveal>
            <div className="rounded-3xl border border-white/8 bg-ink-800/80 p-8 backdrop-blur lg:p-10">
              <p className="font-mono text-[0.68rem] tracking-[0.24em] text-brass-500 uppercase">
                What your gift can do
              </p>

              <div className="mt-7 flex items-baseline gap-2">
                <span className="font-display text-4xl text-white sm:text-5xl">
                  ₦
                </span>
                {/* `key` on the amount remounts the node whenever the figure
                    changes, which restarts the CSS animation — the same
                    trick the motion version used to retrigger its own. */}
                <span
                  key={amount}
                  className="animate-amount-tick font-display text-4xl text-white tabular sm:text-5xl"
                >
                  {amount.toLocaleString("en-NG")}
                </span>
              </div>

              <label className="mt-8 block">
                <span className="sr-only">Donation amount in naira</span>
                <input
                  type="range"
                  min={givingRange.min}
                  max={givingRange.max}
                  step={givingRange.step}
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brass-500"
                />
              </label>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {givingPresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] tracking-[0.1em] transition-colors ${
                      amount === preset
                        ? "border-brass-500 bg-brass-500/15 text-brass-300"
                        : "border-white/12 text-stone-500 hover:border-white/25 hover:text-stone-300"
                    }`}
                  >
                    {naira(preset)}
                  </button>
                ))}
              </div>

              <ul className="mt-9 space-y-3.5 border-t border-white/8 pt-7">
                {givingUnits.map((unit) => {
                  const count = Math.floor(amount / unit.cost);
                  return (
                    <li
                      key={unit.one}
                      className="flex items-baseline justify-between gap-4"
                    >
                      <span className="text-sm text-stone-400">
                        {count === 1 ? unit.one : unit.many}
                      </span>
                      <span className="font-display text-2xl text-brass-300">
                        <Counter to={count} duration={0.5} immediate />
                      </span>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-7 text-xs leading-relaxed text-stone-600">
                Each line shows what this amount could cover on its own, not
                all at once. Unit costs are working estimates pending the
                foundation&rsquo;s confirmed figures.
              </p>
            </div>
          </Reveal>

          {/* ── Transfer details ── */}
          <Reveal delay={0.12}>
            <div className="rounded-3xl border border-brass-500/25 bg-gradient-to-br from-ink-800 to-ink-900 p-8 lg:p-10">
              <p className="font-mono text-[0.68rem] tracking-[0.24em] text-brass-500 uppercase">
                Bank transfer
              </p>

              <dl className="mt-7">
                <CopyableRow
                  label="Account name"
                  value={bankDetails.accountName}
                />
                <CopyableRow label="Bank" value={bankDetails.bank} />
                <CopyableRow
                  label="Account number"
                  value={bankDetails.accountNumber}
                  mono
                />
              </dl>

              <div className="mt-9 space-y-3 border-t border-white/8 pt-7 text-sm">
                <p className="text-stone-500">
                  Send your transfer reference and we will confirm receipt and
                  tell you exactly where it went.
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1">
                  <a
                    href={contact.phoneHref}
                    className="font-mono text-brass-300 transition-colors hover:text-brass-200"
                  >
                    {contact.phone}
                  </a>
                  <a
                    href={contact.emailHref}
                    className="text-brass-300 transition-colors [overflow-wrap:anywhere] hover:text-brass-200"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
