import { useCallback, useState } from 'react'
import { PROJECTS, type Project } from '../data/site'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const close = useCallback(() => setSelected(null), [])

  const [featured, ...rest] = PROJECTS

  return (
    <section id="projects" aria-labelledby="projects-title" className="relative border-t hairline bg-fg/[0.025] py-24 lg:py-36">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Projects</p>
            <h2 id="projects-title" className="section-title mt-4 lg:text-7xl">
              Selected Works.
            </h2>
          </div>
          <p className="lead max-w-md">A collection of digital experiences I&apos;ve designed and developed.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal className="lg:col-span-2">
            <ProjectCard project={featured} index={0} featured onOpen={setSelected} />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 90}>
              <ProjectCard project={p} index={i + 1} onOpen={setSelected} />
            </Reveal>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={close} onNavigate={setSelected} />
    </section>
  )
}
