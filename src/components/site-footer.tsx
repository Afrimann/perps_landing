import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  bankDetails,
  contact,
  navLinks,
  offices,
  registration,
  site,
  whatsappHref,
} from "@/content/site";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[0.68rem] font-medium tracking-[0.28em] text-accent-500 uppercase">
      {children}
    </h2>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/8 bg-surface-950">
      <Container className="py-20">
        {/* Contact and Donations carry long strings (an email, an account
            name), so they get more of the row than the link columns. */}
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-[1fr_0.7fr_1.15fr_1.15fr]">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-accent-500/40 font-display text-[0.8rem] font-semibold text-accent-300">
                {site.shortName}
              </span>
            </div>
            <p className="mt-6 font-display text-lg leading-snug text-white">
              {site.name}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-500">
              {site.tagline}
            </p>
          </div>

          <div>
            <ColumnHeading>Foundation</ColumnHeading>
            <ul className="mt-6 space-y-3.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#team"
                  className="text-stone-400 transition-colors hover:text-white"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/activities"
                  className="text-stone-400 transition-colors hover:text-white"
                >
                  All Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/#give"
                  className="text-stone-400 transition-colors hover:text-white"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="font-mono text-stone-400 transition-colors hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-stone-400 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-3.5 shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-4.5 4.4c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.29 3.26c.16.21 2.19 3.34 5.3 4.55 2.59 1.02 3.12.82 3.68.77.56-.05 1.81-.74 2.07-1.46.25-.72.25-1.33.18-1.46-.08-.13-.29-.21-.6-.36-.31-.16-1.81-.9-2.09-1-.28-.1-.49-.16-.69.16-.21.31-.79 1-.97 1.2-.18.21-.36.24-.66.08-.31-.16-1.29-.48-2.46-1.52-.91-.81-1.52-1.81-1.7-2.12-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.15-.18.2-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.68-1.67-.95-2.28-.24-.56-.49-.53-.69-.54h-.58z" />
                  </svg>
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="text-[0.82rem] text-stone-400 transition-colors [overflow-wrap:anywhere] hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              {offices.map((office) => (
                <li key={office.city} className="text-stone-400">
                  <span className="text-stone-300">{office.city}:</span>{" "}
                  {office.address}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnHeading>Donations</ColumnHeading>
            <dl className="mt-6 space-y-3 text-sm">
              <div>
                <dt className="text-stone-500">Account name</dt>
                <dd className="mt-1 text-stone-300">
                  {bankDetails.accountName}
                </dd>
              </div>
              <div>
                <dt className="text-stone-500">Bank</dt>
                <dd className="mt-1 text-stone-300">{bankDetails.bank}</dd>
              </div>
              <div>
                <dt className="text-stone-500">Account number</dt>
                <dd className="mt-1 font-mono tracking-[0.14em] text-accent-300 tabular">
                  {bankDetails.accountNumber}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/8 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          {registration.cacNumber ? (
            <p className="font-mono tracking-wide">
              CAC: {registration.cacNumber}
            </p>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
