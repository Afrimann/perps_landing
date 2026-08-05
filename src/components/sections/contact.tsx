import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact, contactSection } from "@/content/site";

/* No contact form yet: there is no backend or form service to receive
   submissions, and a form that silently drops enquiries is worse than none.
   These route to channels the foundation actually monitors. */
const channels = [
  {
    label: "Call or WhatsApp",
    value: contact.phone,
    href: contact.phoneHref,
    /* Short enough for the display face. */
    valueClass: "font-display text-xl",
  },
  {
    label: "Email",
    value: contact.email,
    href: contact.emailHref,
    /* The address is long and the display serif is wide — sans keeps it on
       one line at every breakpoint. */
    valueClass: "font-sans text-base sm:text-lg",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={contactSection.eyebrow}
          intro={contactSection.body}
          align="center"
        >
          {contactSection.heading}
        </SectionHeading>

        <ul className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {channels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-8 transition duration-200 ease-out-soft hover:border-brand-300 hover:shadow-[0_12px_32px_-16px_rgba(22,58,44,0.35)]"
              >
                <span className="text-xs font-semibold tracking-[0.18em] text-brand-600 uppercase">
                  {channel.label}
                </span>
                <span
                  className={`mt-4 font-semibold text-brand-900 [overflow-wrap:anywhere] ${channel.valueClass}`}
                >
                  {channel.value}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
