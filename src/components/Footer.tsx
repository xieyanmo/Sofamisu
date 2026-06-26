import logo from '../assets/logo.svg'
import { siteContent } from '../content/siteContent'

function EmailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[20px] w-[20px] shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25v7.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15.75v-7.5m18 0A2.25 2.25 0 0 0 18.75 6H5.25A2.25 2.25 0 0 0 3 8.25m18 0-9 5.25-9-5.25"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[24px] w-[24px] shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1"
    >
      <rect
        width="15"
        height="15"
        x="4.5"
        y="4.5"
        rx="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.25" />
      <path strokeLinecap="round" d="M16.75 7.75h.01" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-[25px] w-[25px] shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.2 19.2 6.4 16A7.25 7.25 0 1 1 9 18.1l-3.8 1.1Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.4 8.7c.15-.35.32-.4.56-.4h.42c.16 0 .36.04.5.38l.62 1.47c.08.2.08.38-.04.55l-.32.42c-.13.17-.13.32.02.52.46.7 1.02 1.27 1.72 1.72.2.15.35.15.52.02l.42-.32c.17-.12.35-.12.55-.04l1.47.62c.34.14.38.34.38.5v.42c0 .24-.05.41-.4.56-.55.24-1.6.36-2.92-.26-1.56-.73-3.28-2.45-4.01-4.01-.62-1.32-.5-2.37-.26-2.92Z"
      />
    </svg>
  )
}

function ContactIcon({ label }: { label: string }) {
  const normalizedLabel = label.toLowerCase()

  if (normalizedLabel.includes('instagram')) {
    return <InstagramIcon />
  }

  if (normalizedLabel.includes('whatsapp')) {
    return <WhatsAppIcon />
  }

  return <EmailIcon />
}

export function Footer() {
  return (
    <footer className="bg-[#EAE4DB] px-6 py-16 text-[#3A1C0F] lg:px-20">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="/" aria-label={siteContent.navbar.homeLabel}>
              <img
                src={logo}
                alt={siteContent.footer.logoAlt}
                className="h-20 w-auto object-contain"
              />
            </a>
            <p className="mt-6 max-w-md font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-7 text-[#744026]">
              {siteContent.footer.description}
            </p>
          </div>

          <div>
            <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#005A4F]">
              {siteContent.footer.navigationTitle}
            </h2>
            <nav aria-label={siteContent.footer.navigationTitle}>
              <ul className="mt-6 space-y-4">
                {siteContent.footer.navigationLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#005A4F]">
              {siteContent.footer.contactTitle}
            </h2>
            <ul className="mt-6 space-y-4">
              {siteContent.footer.contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-2.5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light text-[#944E25] transition-colors duration-200 hover:text-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48] ${
                      link.label.toLowerCase().includes('email') ? 'ml-[3px]' : ''
                    }`}
                  >
                    <ContactIcon label={link.label} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-[#BE8B48]/30 pt-8 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-xs font-light text-[#744026] md:flex-row md:items-center md:justify-between">
          <p>{siteContent.footer.copyright}</p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {siteContent.footer.legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#944E25] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
