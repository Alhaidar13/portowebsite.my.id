import { ArrowDownRight, ArrowUpRight, Code2, Gauge, Smartphone } from 'lucide-react'
import { SITE } from '../data/site'
import Typewriter from './Typewriter'

const ROLES = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Problem Solver'] as const

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="blob -left-32 top-10 h-96 w-96 bg-indigo-500/25" aria-hidden="true" />
      <div className="blob -right-24 top-40 h-96 w-96 bg-sky-400/25 [animation-delay:-5s]" aria-hidden="true" />
      <div className="blob bottom-0 left-1/3 h-72 w-72 bg-pink-400/20 [animation-delay:-10s]" aria-hidden="true" />
      <div className="container-x relative grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pb-28 lg:pt-24">
        <div>
          <div className="animate-fade-up">
            <p className="eyebrow">
              Hi, I&apos;m {SITE.fullName}
            </p>
            <p className="mt-3 font-display text-2xl font-bold sm:text-3xl">
              <Typewriter words={ROLES} />
            </p>
          </div>
          <h1
            id="hero-title"
            className="mt-5 animate-fade-up font-display text-[2.6rem] font-extrabold leading-[1.03] tracking-tight [animation-delay:80ms] sm:text-6xl lg:text-[3.6rem] xl:text-[4.2rem]"
          >
            Building Digital Experiences That Help{' '}
            <span className="gradient-text">Businesses Grow.</span>
          </h1>
          <p className="lead mt-6 max-w-xl animate-fade-up [animation-delay:160ms]">
            I help businesses, startups, and personal brands build modern, responsive, and functional websites that turn
            ideas into meaningful digital experiences.
          </p>

          <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:240ms]">
            <a href="#projects" className="btn btn-primary">
              Explore My Work <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn-outline">
              Let&apos;s Work Together <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          <p className="mt-9 inline-flex animate-fade-up items-center gap-3 rounded-full border border-fg/12 px-4 py-2 text-sm text-fg/75 [animation-delay:320ms]">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-fg/60 dark:bg-accent" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fg dark:bg-accent" />
            </span>
            Available for Freelance Projects
          </p>
        </div>

        {/* Composition: abstract browser preview with floating UI chips */}
        <div className="relative mx-auto w-full max-w-xl animate-fade-up px-3 pb-6 pt-5 [animation-delay:200ms] sm:px-6 lg:max-w-none" aria-hidden="true">
                    <div className="relative overflow-hidden rounded-3xl border border-fg/12 bg-base shadow-2xl shadow-fg/10 dark:shadow-accent/10">
            <div className="flex items-center gap-1.5 border-b border-fg/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="ml-4 flex h-5 flex-1 items-center rounded-full bg-fg/[0.06] px-3 font-mono text-[10px] text-fg/40">
                myportofolio.com
              </span>
            </div>
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between">
                <span className="h-3 w-16 rounded-full bg-fg dark:bg-accent" />
                <span className="flex gap-2">
                  <span className="h-2 w-8 rounded-full bg-fg/15" />
                  <span className="h-2 w-8 rounded-full bg-fg/15" />
                  <span className="h-2 w-8 rounded-full bg-fg/15" />
                </span>
              </div>
              <div className="space-y-2.5 pt-3">
                <div className="h-6 w-4/5 rounded-lg bg-fg" />
                <div className="h-6 w-3/5 rounded-lg bg-fg/25 dark:bg-accent/70" />
                <div className="h-2 w-full rounded-full bg-fg/10" />
                <div className="h-2 w-5/6 rounded-full bg-fg/10" />
              </div>
              <div className="flex gap-2.5">
                <span className="h-8 w-24 rounded-full bg-fg dark:bg-accent" />
                <span className="h-8 w-20 rounded-full border border-fg/25" />
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-2 rounded-2xl border border-fg/10 p-3">
                    <div className={`h-6 w-6 rounded-lg ${i === 1 ? 'bg-fg dark:bg-accent' : 'bg-fg/15'}`} />
                    <div className="h-1.5 w-3/4 rounded-full bg-fg/20" />
                    <div className="h-1.5 w-full rounded-full bg-fg/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -top-1 right-4 flex animate-float items-center gap-2 rounded-2xl border border-fg/12 bg-base/95 px-3 py-2 sm:right-8 sm:gap-2.5 sm:px-4 sm:py-2.5 shadow-xl shadow-fg/10 backdrop-blur">
            <Smartphone size={16} className="text-fg dark:text-accent" />
            <span className="text-xs font-medium">Responsive</span>
          </div>
          <div className="absolute -bottom-1 right-2 flex animate-float-slow items-center gap-2 rounded-2xl border border-fg/12 bg-base/95 px-3 py-2 sm:right-8 sm:gap-2.5 sm:px-4 sm:py-2.5 shadow-xl shadow-fg/10 backdrop-blur">
            <Gauge size={16} className="text-fg dark:text-accent" />
            <span className="text-xs font-medium">Fast &amp; Optimized</span>
          </div>
          <div className="absolute -bottom-1 left-2 flex animate-float items-center gap-2 rounded-2xl border border-fg/12 bg-base/95 px-3 py-2 sm:left-8 sm:gap-2.5 sm:px-4 sm:py-2.5 shadow-xl shadow-fg/10 backdrop-blur [animation-delay:1.2s]">
            <Code2 size={16} className="text-fg dark:text-accent" />
            <span className="text-xs font-medium">Clean Code</span>
          </div>
        </div>
      </div>
    </section>
  )
}
