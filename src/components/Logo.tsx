import { SITE } from '../data/site'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#home" aria-label={`${SITE.name} — home`} className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-fg text-base transition-transform duration-300 group-hover:animate-wiggle dark:bg-accent dark:text-onaccent">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </span>
      <span className="font-display text-lg font-extrabold tracking-tight">{SITE.name}</span>
    </a>
  )
}
