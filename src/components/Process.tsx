import { PROCESS } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-t hairline py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading id="process-title" eyebrow="Work Process" title="How I Bring Ideas to Life." />

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-8">
          {/* horizontal rail (desktop) */}
          <span className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-fg/15 lg:block" aria-hidden="true" />
          {/* vertical rail (mobile / tablet) */}
          <span className="pointer-events-none absolute bottom-2 left-5 top-2 w-px bg-fg/15 lg:hidden" aria-hidden="true" />

          {PROCESS.map((p, i) => (
            <li key={p.step} className="relative pl-16 lg:pl-0 lg:pt-16">
              <Reveal delay={i * 100}>
                <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-fg/20 bg-base font-display text-sm font-bold lg:left-0">
                  <span className="grid h-full w-full place-items-center rounded-full transition-colors hover:bg-accent hover:text-onaccent">{p.step}</span>
                </span>
                <h3 className="text-xl font-bold tracking-tight">{p.title}</h3>
                <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-fg/65">{p.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
