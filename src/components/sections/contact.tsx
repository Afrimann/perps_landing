import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives";
import { contact, contactSection, whatsappHref } from "@/content/site";

type Tone = "light" | "dark";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-4.5 4.4c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.19 3.34 5.3 4.55 2.59 1.02 3.12.82 3.68.77.56-.05 1.81-.74 2.07-1.46.25-.72.25-1.33.18-1.46-.08-.13-.29-.21-.6-.36-.31-.16-1.81-.9-2.09-1-.28-.1-.49-.16-.69.16-.21.31-.79 1-.97 1.2-.18.21-.36.24-.66.08-.31-.16-1.29-.48-2.46-1.52-.91-.81-1.52-1.81-1.7-2.12-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.15-.18.2-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.68-1.67-.95-2.28-.24-.56-.49-.53-.69-.54h-.58z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const FormIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-5"
    aria-hidden="true"
  >
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

/**
 * The three ways in, in the order the foundation wants them used:
 * applications through the form, everything else through WhatsApp or email.
 *
 * `primary` is the registration form — it is visually weighted above the two
 * enquiry channels on purpose, because an application that arrives as a
 * WhatsApp message has no structure and gets lost in a thread.
 */
const channels = (includeForm: boolean) => [
  ...(includeForm
    ? [
        {
          key: "form",
          label: "Programme applications",
          value: "Registration form",
          detail:
            "The main channel. Everything the foundation needs, in one place.",
          href: "/apply",
          internal: true,
          primary: true,
          icon: FormIcon,
        },
      ]
    : []),
  {
    key: "whatsapp",
    label: "Enquiries & follow-up",
    value: contact.whatsappDisplay,
    detail: "Fastest reply. Good for questions and checking on an application.",
    href: whatsappHref(),
    internal: false,
    primary: false,
    icon: WhatsAppIcon,
  },
  {
    key: "email",
    label: "Enquiries & partnerships",
    value: contact.email,
    detail: "Best for detailed enquiries, partnerships and anything with a paper trail.",
    href: contact.emailHref,
    internal: false,
    primary: false,
    icon: MailIcon,
  },
];

export function ContactChannels({
  tone = "light",
  includeForm = true,
}: {
  tone?: Tone;
  includeForm?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <StaggerGroup
      as="ul"
      className={`grid gap-5 ${includeForm ? "lg:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {channels(includeForm).map((channel) => {
        const Icon = channel.icon;

        const shell = channel.primary
          ? "border-brass-500/45 bg-gradient-to-br from-white to-brass-200/25 hover:border-brass-500"
          : dark
            ? "border-white/10 bg-ink-800/70 hover:border-brass-500/45"
            : "border-stone-300/70 bg-white hover:border-brass-500/50";

        const labelColor = dark && !channel.primary ? "text-stone-500" : "text-stone-500";
        const valueColor =
          dark && !channel.primary ? "text-white" : "text-stone-900";
        const detailColor =
          dark && !channel.primary ? "text-stone-500" : "text-stone-600";

        const inner = (
          <>
            <span
              className={`grid size-11 place-items-center rounded-xl ${
                channel.primary
                  ? "bg-brass-500/20 text-brass-600"
                  : dark
                    ? "bg-white/6 text-brass-300"
                    : "bg-stone-100 text-stone-600"
              }`}
            >
              <Icon />
            </span>

            <p
              className={`mt-6 font-mono text-[0.64rem] tracking-[0.2em] uppercase ${labelColor}`}
            >
              {channel.label}
            </p>
            <p
              className={`mt-2.5 font-display text-lg [overflow-wrap:anywhere] ${valueColor}`}
            >
              {channel.value}
            </p>
            <p className={`mt-3 grow text-[0.88rem] leading-relaxed ${detailColor}`}>
              {channel.detail}
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.14em] text-brass-600 uppercase transition-all duration-300 group-hover:gap-3">
              {channel.primary ? "Start application" : "Open"}
              <span aria-hidden="true">→</span>
            </span>
          </>
        );

        const shellClass = `group flex h-full flex-col rounded-2xl border p-7 transition-all duration-500 hover:-translate-y-1 ${shell}`;

        return (
          <StaggerItem key={channel.key} as="li">
            {channel.internal ? (
              <Link href={channel.href} className={shellClass}>
                {inner}
              </Link>
            ) : (
              <a
                href={channel.href}
                target={channel.key === "whatsapp" ? "_blank" : undefined}
                rel={channel.key === "whatsapp" ? "noopener noreferrer" : undefined}
                className={shellClass}
              >
                {inner}
              </a>
            )}
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}

export function Contact() {
  return (
    <section id="contact" className="bg-ivory-dim py-28 lg:py-36">
      <Container>
        <SectionHeading
          eyebrow={contactSection.eyebrow}
          intro={contactSection.body}
          tone="light"
        >
          {contactSection.heading}
        </SectionHeading>

        <div className="mt-16">
          <ContactChannels tone="light" />
        </div>
      </Container>
    </section>
  );
}
