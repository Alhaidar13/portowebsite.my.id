import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { NAV_LINKS } from '../data/site'
import { useActiveSection } from '../hooks/useActiveSection'
import type { Theme } from '../hooks/useTheme'
import Logo from './Logo'

interface Props {
  theme: Theme
  onToggleTheme: () => void
}

const IDS = NAV_LINKS.map((l) => l.href.slice(1))

export default function Navbar({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const isDark = theme === 'dark'
  const ThemeBtn = (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="grid h-10 w-10 place-items-center rounded-full border border-fg/15 text-fg transition hover:border-accent hover:text-accent"
    >
      {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled || open ? 'border-b border-fg/10 bg-base/80 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const current = active === l.href.slice(1)
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={current ? 'true' : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  current ? 'bg-fg/[0.07] text-fg dark:text-accent' : 'text-fg/65 hover:text-fg'
                }`}
              >
                {l.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {ThemeBtn}
          <a href="#contact" className="btn btn-primary hidden !py-2.5 sm:inline-flex">
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-fg/15 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 lg:hidden ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
        {...(!open ? { inert: '' as unknown as boolean } : {})}
      >
        <nav aria-label="Mobile" className="min-h-0 overflow-hidden">
          <ul className="container-x flex flex-col gap-1 pb-6 pt-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 font-display text-2xl font-semibold tracking-tight hover:bg-fg/[0.05]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                Let&apos;s Talk
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
