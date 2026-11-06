import { GraduationCap, Layers, Palette, Code2 } from 'lucide-react'
import { ABOUT_PARAGRAPHS, SITE, TECH_STACK } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import CountUp from './CountUp'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-t hairline py-24 lg:py-32">
      <div className="blob -left-24 top-20 h-72 w-72 bg-indigo-500/20" aria-hidden="true" />
      <div className="blob -right-24 bottom-10 h-72 w-72 bg-sky-400/20 [animation-delay:-6s]" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading id="about-title" eyebrow="About Me" title="A Little About Me." />

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <figure className="relative mx-auto max-w-sm">
              <div className="absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-indigo-500 via-sky-400 to-pink-400 opacity-60 blur-2xl animate-pulse-glow" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-fg/15 bg-base shadow-2xl shadow-fg/10">
                <img
                  src={SITE.photo}
                  alt={`Foto ${SITE.fullName}`}
                  width={400}
                  height={500}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <figcaption className="absolute -bottom-6 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-fg/12 bg-base/90 px-5 py-4 text-center shadow-xl shadow-fg/10 backdrop-blur">
                <p className="font-display text-xl font-bold leading-tight">{SITE.fullName}</p>
                <p className="mt-1 text-xs text-fg/60">Mahasiswa · Freelance Web Developer · UI/UX Designer</p>
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal delay={60}>
              <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                Hai, saya <span className="gradient-text">{SITE.fullName}</span>
              </h3>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                {[
                  [GraduationCap, 'Mahasiswa'],
                  [Code2, 'Web Developer'],
                  [Palette, 'UI/UX Designer'],
                ].map(([I, t]) => {
                  const Icon = I as typeof Code2
                  return (
                    <span key={t as string} className="inline-flex items-center gap-1.5 rounded-full border border-fg/15 px-3 py-1.5">
                      <Icon size={14} aria-hidden="true" /> {t as string}
                    </span>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-6 space-y-4">
                {ABOUT_PARAGRAPHS.map((p, i) => (
                  <p key={i} className={i === 0 ? 'lead' : 'text-base leading-relaxed text-fg/65 sm:text-lg'}>
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180}>
              <dl className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                {[
                  [5, '+', 'Jenis website'],
                  [4, '', 'Langkah kerja'],
                  [100, '%', 'Responsif'],
                ].map(([n, suffix, l]) => (
                  <div key={l as string} className="card p-4 text-center hover:-translate-y-1 hover:border-accent/50 sm:p-5">
                    <dt className="sr-only">{l as string}</dt>
                    <dd>
                      <span className="gradient-text font-display text-3xl font-extrabold sm:text-4xl">
                        <CountUp to={n as number} suffix={suffix as string} />
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-fg/60">{l as string}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <Reveal className="text-center">
            <div className="inline-flex items-center gap-3">
              <Layers size={26} className="text-fg dark:text-accent" aria-hidden="true" />
              <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Skills &amp; Technologies</h3>
            </div>
            <p className="lead mx-auto mt-3 max-w-xl">Teknologi dan tools yang saya gunakan setiap hari.</p>
          </Reveal>
          <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {TECH_STACK.map((t, i) => (
              <li key={t.name}>
                <Reveal delay={i * 50} className="h-full">
                  <div className="card group flex h-full flex-col items-center gap-3 p-5 hover:-translate-y-2 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10">
                    <img
                      src={t.logo}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                      className={`h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6 ${
                        'invertInDark' in t && t.invertInDark ? 'dark:invert' : ''
                      }`}
                    />
                    <span className="text-center text-sm font-medium text-fg/80">{t.name}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
