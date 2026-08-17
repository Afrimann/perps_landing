import { genders, programmes, statuses } from "@/content/apply";
import { site } from "@/content/site";

/**
 * Receives a programme application and emails it to the foundation.
 *
 * Deliberately has no database. The foundation's working tool is its inbox,
 * and an application that arrives as an email is one they can reply to,
 * forward and search on day one — where a database they never log into is a
 * place applications go to be forgotten. `reply_to` is set to the applicant,
 * so replying in the mail client reaches the person directly.
 *
 * Never cached: this route is POST-only, and Next does not cache POST.
 */

/** Resend is called over its REST API rather than its SDK — one fetch, no dependency. */
const RESEND_ENDPOINT = "https://api.resend.com/emails";

type Errors = Partial<Record<string, string>>;

/** Collapses whitespace so a field of only spaces cannot pass a length check. */
const clean = (value: unknown): string =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] as string
  );

function validate(payload: Record<string, unknown>) {
  const errors: Errors = {};

  const fullName = clean(payload.fullName);
  const phone = clean(payload.phone);
  const email = clean(payload.email).toLowerCase();
  const age = clean(payload.age);
  const gender = clean(payload.gender);
  const location = clean(payload.location);
  const status = clean(payload.status);
  const programme = clean(payload.programme);
  /* Not whitespace-collapsed: the applicant's own paragraph breaks are part
     of what they wrote, and flattening them makes long answers unreadable. */
  const reason =
    typeof payload.reason === "string" ? payload.reason.trim() : "";

  if (fullName.length < 2 || fullName.length > 120) {
    errors.fullName = "Please enter your full name.";
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Please enter a phone number we can reach you on.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    errors.email = "Please enter a valid email address.";
  }

  const ageNumber = Number(age);
  if (!Number.isInteger(ageNumber) || ageNumber < 1 || ageNumber > 120) {
    errors.age = "Please enter your age in years.";
  }

  if (!(genders as readonly string[]).includes(gender)) {
    errors.gender = "Please select an option.";
  }

  if (location.length < 2 || location.length > 160) {
    errors.location = "Please tell us your town or city and state.";
  }

  if (!(statuses as readonly string[]).includes(status)) {
    errors.status = "Please select an option.";
  }

  if (!(programmes as readonly string[]).includes(programme)) {
    errors.programme = "Please select the programme you are applying for.";
  }

  if (reason.length < 20) {
    errors.reason = "Please tell us a little more — at least a sentence or two.";
  } else if (reason.length > 1500) {
    errors.reason = "Please keep this under 1,500 characters.";
  }

  if (payload.consent !== true) {
    errors.consent = "Please confirm this before submitting.";
  }

  return {
    errors,
    values: {
      fullName,
      phone,
      email,
      age: String(ageNumber),
      gender,
      location,
      status,
      programme,
      reason,
    },
  };
}

type Values = ReturnType<typeof validate>["values"];

function buildEmail(values: Values) {
  const rows: [string, string][] = [
    ["Full name", values.fullName],
    ["Phone / WhatsApp", values.phone],
    ["Email", values.email],
    ["Age", values.age],
    ["Gender", values.gender],
    ["Location", values.location],
    ["Status", values.status],
    ["Programme", values.programme],
  ];

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Why they are applying:",
    values.reason,
  ].join("\n");

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#221f1c;max-width:640px">
      <p style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#a87a22;margin:0 0 4px">
        ${escapeHtml(site.name)}
      </p>
      <h1 style="font-size:20px;margin:0 0 20px">New programme application</h1>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 16px 8px 0;color:#857d74;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee">${escapeHtml(label)}</td>
            <td style="padding:8px 0;font-weight:600;border-bottom:1px solid #eee">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      <h2 style="font-size:15px;margin:28px 0 8px">Why they are applying</h2>
      <p style="font-size:14px;line-height:1.7;white-space:pre-wrap;margin:0">${escapeHtml(values.reason)}</p>
      <p style="font-size:12px;color:#857d74;margin:28px 0 0">
        Reply to this email to reach ${escapeHtml(values.fullName)} directly.
      </p>
    </div>`;

  return { text, html };
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  /* Honeypot: a hidden field no human fills in. Answer 200 so a bot sees
     success and does not retry with the field cleared. */
  if (clean(payload.website)) {
    return Response.json({ ok: true });
  }

  const { errors, values } = validate(payload);
  if (Object.keys(errors).length > 0) {
    return Response.json({ errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.APPLICATIONS_TO_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;

  /* Misconfiguration is OUR fault, not the applicant's — so it is logged
     loudly for us and reported as a plain server error to them, with no
     mention of missing keys. */
  if (!apiKey || !to || !from) {
    console.error(
      "[apply] Missing env: " +
        [
          !apiKey && "RESEND_API_KEY",
          !to && "APPLICATIONS_TO_EMAIL",
          !from && "RESEND_FROM_EMAIL",
        ]
          .filter(Boolean)
          .join(", ")
    );
    return Response.json(
      { error: "Applications are temporarily unavailable." },
      { status: 503 }
    );
  }

  const { text, html } = buildEmail(values);

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `Application — ${values.programme} — ${values.fullName}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error(
        `[apply] Resend responded ${response.status}: ${await response.text()}`
      );
      return Response.json(
        { error: "We could not send your application." },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[apply] Resend request failed:", error);
    return Response.json(
      { error: "We could not send your application." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
