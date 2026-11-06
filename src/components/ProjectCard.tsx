import { ArrowUpRight, ExternalLink } from 'lucide-react'
import type { Project } from '../data/site'
import Mockup from './Mockup'

export function ProjectVisual({ project, eager = false }: { project: Project; eager?: boolean }) {
  const alt = project.imageAlt ?? `${project.name} website preview`
  return project.image ? (
    <img
      src={project.image}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      width={1280}
      height={800}
      className="h-full w-full object-cover object-top"
    />
  ) : (
    <Mockup variant={project.mockup} label={alt} />
  )
}

interface Props {
  project: Project
  index: number
  featured?: boolean
  onOpen: (p: Project) => void
}

export default function ProjectCard({ project, index, featured = false, onOpen }: Props) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <article
      className={`card group flex h-full flex-col overflow-hidden p-3 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-2xl hover:shadow-fg/5 dark:hover:shadow-accent/10 ${
        featured ? 'lg:flex-row lg:gap-8 lg:p-4' : ''
      }`}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.name}`}
        className={`relative block overflow-hidden rounded-2xl border border-fg/10 text-left ${
          featured ? 'aspect-[16/10] lg:w-[58%] lg:shrink-0' : 'aspect-[16/10] w-full'
        }`}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
          <ProjectVisual project={project} eager={index === 0} />
        </div>
        {project.isPlaceholder && (
          <span className="absolute left-3 top-3 rounded-full border border-fg/15 bg-base/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-fg/70 backdrop-blur">
            Placeholder
          </span>
        )}
      </button>

      <div className={`flex flex-1 flex-col px-3 pb-3 pt-5 ${featured ? 'lg:justify-center lg:py-6 lg:pr-4' : ''}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow">{project.category}</span>
          <span className="font-display text-sm font-semibold text-fg/35">{num}</span>
        </div>
        <h3 className={`mt-3 font-bold tracking-tight ${featured ? 'text-3xl lg:text-4xl' : 'text-2xl'}`}>
          {project.name}
          <span className="block text-base font-medium text-fg/55">{project.type}</span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg/70">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies used">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-fg/12 px-3 py-1 text-xs text-fg/70">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          <button type="button" onClick={() => onOpen(project)} className="btn btn-primary !px-5 !py-2.5">
            View Project
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline !px-5 !py-2.5"
            >
              Live Preview
              <ExternalLink size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
