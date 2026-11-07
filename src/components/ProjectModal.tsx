import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, Check, ExternalLink, X } from 'lucide-react'
import { PROJECTS, type Project } from '../data/site'
import { ProjectVisual } from './ProjectCard'
import Gallery from './Gallery'

interface Props {
  project: Project | null
  onClose: () => void
  onNavigate: (p: Project) => void
}

const FOCUSABLE = 'a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'

export default function ProjectModal({ project, onClose, onNavigate }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  // Body scroll lock + focus restore.
  useEffect(() => {
    if (!project) return
    lastFocus.current = document.activeElement as HTMLElement
    document.body.classList.add('modal-open')
    dialogRef.current?.focus()
    return () => {
      document.body.classList.remove('modal-open')
      lastFocus.current?.focus?.()
    }
  }, [project !== null]) // eslint-disable-line react-hooks/exhaustive-deps

  // Keyboard: Esc to close, Tab focus trap.
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [project, onClose])

  if (!project) return null

  const i = PROJECTS.findIndex((p) => p.slug === project.slug)
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(i + 1) % PROJECTS.length]

  const goToContact = () => {
    onClose()
    window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6" role="presentation">
      <div className="absolute inset-0 bg-fg/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="relative z-10 flex max-h-[94vh] w-full max-w-5xl animate-pop flex-col overflow-hidden rounded-t-3xl border border-fg/10 bg-base shadow-2xl outline-none sm:rounded-3xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-fg/10 px-5 py-3 sm:px-7">
          <span className="eyebrow">
            Project {String(i + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="grid h-9 w-9 place-items-center rounded-full border border-fg/15 transition hover:border-accent hover:text-accent"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          <div className="p-5 sm:p-7">
            {project.gallery && project.gallery.length > 1 ? (
              <Gallery slides={project.gallery} label={project.name} />
            ) : (
              <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-fg/10">
                <ProjectVisual project={project} eager />
              </div>
            )}

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="eyebrow">{project.category}</span>
                  {project.isPlaceholder && (
                    <span className="rounded-full border border-fg/15 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-fg/60">
                      Placeholder project
                    </span>
                  )}
                </div>
                <h3 id="project-modal-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  {project.name}
                  <span className="block text-lg font-medium text-fg/55">{project.type}</span>
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-fg/75 sm:text-base">{project.description}</p>
                <p className="mt-4 text-sm leading-relaxed text-fg/60 sm:text-base">{project.overview}</p>

                {project.isPlaceholder && (
                  <p className="mt-5 rounded-2xl border border-fg/10 bg-fg/[0.03] p-4 text-xs leading-relaxed text-fg/60">
                    This is an editable placeholder, not a completed client project. Replace it with real work in{' '}
                    <code className="font-mono text-fg/80">src/data/site.ts</code>.
                  </p>
                )}
              </div>

              <aside className="space-y-6 lg:border-l lg:border-fg/10 lg:pl-8">
                <div>
                  <h4 className="eyebrow">Scope</h4>
                  <ul className="mt-3 space-y-2">
                    {project.scope.map((s) => (
                      <li key={s} className="flex gap-2.5 text-sm text-fg/75">
                        <Check size={16} className="mt-0.5 shrink-0 text-fg dark:text-accent" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="eyebrow">Highlights</h4>
                  <ul className="mt-3 space-y-2">
                    {project.highlights.map((s) => (
                      <li key={s} className="flex gap-2.5 text-sm text-fg/75">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg dark:bg-accent" aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="eyebrow">Technologies</h4>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <li key={t} className="rounded-full border border-fg/12 px-3 py-1 text-xs text-fg/75">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-fg/10 pt-6">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Live Preview <ExternalLink size={14} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              <button type="button" onClick={goToContact} className={`btn ${project.liveUrl ? 'btn-outline' : 'btn-primary'}`}>
                Start a similar project
              </button>
              <div className="ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(prev)}
                  aria-label={`Previous project: ${prev.name}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition hover:border-accent hover:text-accent"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(next)}
                  aria-label={`Next project: ${next.name}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-fg/15 transition hover:border-accent hover:text-accent"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
