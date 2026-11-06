import { Briefcase, Building2, Rocket, ShoppingCart, UserRound, type LucideIcon } from 'lucide-react'
import { SERVICES, type ServiceIcon } from '../data/site'
import Reveal from './Reveal'

const ICONS: Record<ServiceIcon, LucideIcon> = {
  briefcase: Briefcase,
  rocket: Rocket,
  building: Building2,
  cart: ShoppingCart,
  user: UserRound,
}

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t hairline py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Services</p>
          <h2 id="services-title" className="section-title mt-4">
            What I Can Do For Your Business.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon]
            // 3 on top row, 2 wider on bottom row (desktop)
            const span = i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'
            return (
              <li key={s.title} className={span}>
                <Reveal delay={i * 70} className="h-full">
                  <article className="card group relative h-full overflow-hidden p-7 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-xl hover:shadow-fg/5 dark:hover:shadow-accent/10">
                    <span className="font-display absolute right-6 top-5 text-5xl font-bold text-fg/[0.05] transition-colors duration-300 group-hover:text-accent/20">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-fg/12 text-fg transition-all duration-300 group-hover:border-transparent group-hover:bg-accent group-hover:text-onaccent">
                      <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-xl font-bold tracking-tight">{s.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-fg/65">{s.description}</p>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
