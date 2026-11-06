import { Layers, UserRound } from 'lucide-react'
import { TECH_STACK } from '../data/site'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t hairline py-24 lg:py-32">
      <div className="container-x grid items-start gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          {/* Replace the placeholder block with <img src="/profile.webp" alt="Portrait of …" /> */}
          <figure className="relative mx-auto max-w-sm lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-fg/12 bg-fg/[0.04]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex flex-col items-center gap-3 text-fg/35">
                  <UserRound size={72} strokeWidth={1.1} aria-hidden="true" />
                  <span className="text-xs uppercase tracking-[0.2em]">Profile photo</span>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-fg/[0.07] to-transparent" aria-hidden="true" />
            </div>
            <figcaption className="absolute -bottom-5 -right-3 rounded-2xl border border-fg/12 bg-base px-5 py-4 shadow-xl shadow-fg/5 sm:-right-6">
              <p className="font-display text-3xl font-bold leading-none">100%</p>
              <p className="mt-1.5 max-w-[10rem] text-xs leading-snug text-fg/60">Hand-coded, responsive, and built around your goals.</p>
            </figcaption>
          </figure>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">About</p>
            <h2 id="about-title" className="section-title mt-4">
              A Little About Me.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lead mt-6 max-w-2xl">
              I&apos;m an independent web developer passionate about creating clean, functional, and user-friendly
              websites. I focus on helping businesses build their online presence through thoughtful design and modern web
              technologies.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg/60">
              Working directly with me means a single point of contact, clear communication, and a website shaped around
              your business — from the first conversation to launch day.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 flex items-center gap-2.5">
              <Layers size={16} className="text-fg dark:text-accent" aria-hidden="true" />
              <h3 className="font-sans text-sm font-semibold">Skills &amp; Technologies</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {TECH_STACK.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-fg/15 px-4 py-2 text-sm text-fg/80 transition hover:-translate-y-0.5 hover:border-accent hover:text-fg dark:hover:text-accent"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ['5', 'Website types offered'],
                ['4', 'Clear steps, start to launch'],
                ['1', 'Developer, direct communication'],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-fg/10 p-5">
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="font-display text-4xl font-bold">{n}</span>
                    <span className="mt-1 block text-xs leading-snug text-fg/60">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
