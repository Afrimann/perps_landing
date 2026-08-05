import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  bankDetails,
  contact,
  navLinks,
  offices,
  registration,
  site,
} from "@/content/site";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-[0.68rem] font-medium tracking-[0.28em] text-brass-500 uppercase">
      {children}
    </h2>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/8 bg-ink-950">
      <Container className="py-20">
        {/* Contact and Donations carry long strings (an email, an account
            name), so they get more of the row than the link columns. */}
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-[1fr_0.7fr_1.15fr_1.15fr]">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-brass-500/40 font-display text-[0.8rem] font-semibold text-brass-300">
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
                  href="/activities"
                  className="text-stone-400 transition-colors hover:text-white"
                >
                  All Activities
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
                <dd className="mt-1 font-mono tracking-[0.14em] text-brass-300 tabular">
                  {bankDetails.accountNumber}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/8 pt-8 text-xs text-stone-600 sm:flex-row sm:items-center sm:justify-between">
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
