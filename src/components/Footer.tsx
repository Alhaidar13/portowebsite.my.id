import { Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { NAV_LINKS, SITE } from '../data/site'
import Logo from './Logo'

const SOCIALS = [
  { label: 'GitHub', href: SITE.socials.github, Icon: Github },
  { label: 'LinkedIn', href: SITE.socials.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: SITE.socials.instagram, Icon: Instagram },
]

export default function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs font-display text-2xl font-semibold leading-snug tracking-tight">
              Building the web, one idea at a time.
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="eyebrow">Navigate</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-u text-sm text-fg/70 hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow">Connect</h2>
            <ul className="mt-4 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <a href={`mailto:${SITE.email}`} className="link-u mt-5 inline-flex items-center gap-2.5 text-sm text-fg/70 hover:text-fg">
              <Mail size={16} aria-hidden="true" />
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t hairline pt-6 text-xs text-fg/55 sm:flex-row sm:items-center">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <a href="#home" className="link-u hover:text-fg">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
