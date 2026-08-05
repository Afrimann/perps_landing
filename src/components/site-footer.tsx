import Link from "next/link";
import { Container } from "@/components/ui/container";
import { bankDetails, contact, navLinks, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-950 text-brand-100">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-800 font-display text-sm font-semibold text-gold-200">
                {site.shortName}
              </span>
              <span className="font-display text-lg leading-tight font-semibold text-white">
                {site.name}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-200">
              {site.description}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-200 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={contact.phoneHref}
                  className="text-brand-200 transition hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="text-brand-200 transition [overflow-wrap:anywhere] hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
            </ul>

            <h2 className="mt-8 text-xs font-semibold tracking-[0.18em] text-gold-300 uppercase">
              Donations
            </h2>
            <dl className="mt-5 space-y-1.5 text-sm text-brand-200">
              <div className="flex gap-2">
                <dt className="sr-only">Account name</dt>
                <dd>{bankDetails.accountName}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">Bank</dt>
                <dd>{bankDetails.bank}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="sr-only">Account number</dt>
                <dd className="font-mono tracking-wider text-white">
                  {bankDetails.accountNumber}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-14 border-t border-brand-900 pt-8 text-sm text-brand-300">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
