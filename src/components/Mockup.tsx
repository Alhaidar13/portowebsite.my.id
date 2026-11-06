import type { MockupVariant } from '../data/site'

/**
 * Lightweight placeholder "website screenshot" drawn with divs.
 * Uses only theme colours (base / fg / accent) with opacity variations.
 * Replace by setting `image` on a project in src/data/site.ts.
 */
const bar = 'rounded-full bg-fg/15'
const block = 'rounded-md bg-fg/[0.08]'
const solid = 'rounded-full bg-fg dark:bg-accent'

function Chrome({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-base" role="img" aria-label={label}>
      <div className="flex shrink-0 items-center gap-1.5 border-b border-fg/10 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="h-2 w-2 rounded-full bg-fg/20" />
        <span className="ml-3 h-3.5 flex-1 rounded-full bg-fg/[0.07]" />
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </div>
  )
}

function Nav() {
  return (
    <div className="flex items-center justify-between px-5 py-3">
      <span className={`${solid} h-2.5 w-10`} />
      <div className="flex gap-2">
        <span className={`${bar} h-1.5 w-6`} />
        <span className={`${bar} h-1.5 w-6`} />
        <span className={`${bar} h-1.5 w-6`} />
      </div>
    </div>
  )
}

export default function Mockup({ variant, label }: { variant: MockupVariant; label: string }) {
  switch (variant) {
    case 'shop':
      return (
        <Chrome label={label}>
          <Nav />
          <div className="grid grid-cols-4 gap-3 px-5 pt-1">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className={`aspect-square ${i === 1 ? 'bg-fg/90 dark:bg-accent/80' : 'bg-fg/[0.08]'} rounded-lg`} />
                <div className={`${bar} h-1.5 w-4/5`} />
                <div className={`${i % 3 === 0 ? 'bg-fg/50 dark:bg-accent/60' : 'bg-fg/15'} h-1.5 w-2/5 rounded-full`} />
              </div>
            ))}
          </div>
          <div className="absolute right-4 top-3 grid h-5 w-5 place-items-center rounded-full bg-fg text-[8px] font-semibold text-base dark:bg-accent dark:text-onaccent">3</div>
        </Chrome>
      )
    case 'coffee':
      return (
        <Chrome label={label}>
          <Nav />
          <div className="grid grid-cols-5 items-center gap-5 px-5 pt-3">
            <div className="col-span-3 space-y-2.5">
              <div className="h-4 w-4/5 rounded bg-fg" />
              <div className="h-4 w-3/5 rounded bg-fg" />
              <div className={`${bar} h-1.5 w-full`} />
              <div className={`${bar} h-1.5 w-5/6`} />
              <div className={`${solid} mt-3 h-6 w-20`} />
            </div>
            <div className="col-span-2 grid place-items-center">
              <div className="relative grid h-24 w-24 place-items-center rounded-full bg-fg/[0.08]">
                <div className="h-16 w-16 rounded-full bg-fg/90 dark:bg-accent/80" />
                <div className="absolute h-8 w-8 rounded-full border-4 border-base" />
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 px-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-2 rounded-xl border border-fg/10 p-2">
                <div className="h-7 w-7 rounded-lg bg-fg/15" />
                <div className="flex-1 space-y-1">
                  <div className={`${bar} h-1.5 w-full`} />
                  <div className="h-1.5 w-1/2 rounded-full bg-fg/10" />
                </div>
              </div>
            ))}
          </div>
        </Chrome>
      )
    case 'landing':
      return (
        <Chrome label={label}>
          <Nav />
          <div className="mx-auto mt-3 flex max-w-[70%] flex-col items-center gap-2.5 text-center">
            <div className="h-1.5 w-16 rounded-full bg-fg/20 dark:bg-accent/60" />
            <div className="h-4 w-full rounded bg-fg" />
            <div className="h-4 w-3/4 rounded bg-fg" />
            <div className={`${bar} h-1.5 w-4/5`} />
            <div className="mt-1 flex gap-2">
              <div className={`${solid} h-6 w-20`} />
              <div className="h-6 w-16 rounded-full border border-fg/25" />
            </div>
          </div>
          <div className="mx-5 mt-5 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1.5 rounded-xl border border-fg/10 p-2.5">
                <div className="h-4 w-4 rounded-md bg-fg/80 dark:bg-accent/80" />
                <div className={`${bar} h-1.5 w-3/4`} />
                <div className="h-1.5 w-full rounded-full bg-fg/10" />
              </div>
            ))}
          </div>
        </Chrome>
      )
    case 'corporate':
      return (
        <Chrome label={label}>
          <Nav />
          <div className="mx-5 mt-1 flex h-24 items-end rounded-2xl bg-fg p-4 dark:bg-accent/15">
            <div className="space-y-2">
              <div className="h-3.5 w-32 rounded bg-base dark:bg-fg" />
              <div className="h-1.5 w-44 rounded-full bg-base/50 dark:bg-fg/40" />
            </div>
          </div>
          <div className="mx-5 mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-1.5 text-center">
                <div className="mx-auto h-5 w-10 rounded bg-fg/80 dark:bg-accent/80" />
                <div className={`${bar} mx-auto h-1.5 w-3/4`} />
              </div>
            ))}
          </div>
          <div className="mx-5 mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`${block} h-12`} />
            ))}
          </div>
        </Chrome>
      )
    case 'creative':
      return (
        <Chrome label={label}>
          <Nav />
          <div className="px-5 pt-1">
            <div className="h-6 w-3/4 rounded bg-fg" />
            <div className="mt-2 h-6 w-1/2 rounded bg-fg/20 dark:bg-accent/70" />
          </div>
          <div className="mt-4 grid grid-cols-6 grid-rows-2 gap-2.5 px-5">
            <div className="col-span-3 row-span-2 h-28 rounded-xl bg-fg/90 dark:bg-accent/80" />
            <div className="col-span-3 h-[52px] rounded-xl bg-fg/[0.08]" />
            <div className="col-span-2 h-[52px] rounded-xl bg-fg/[0.14]" />
            <div className="col-span-1 h-[52px] rounded-xl border border-fg/15" />
          </div>
        </Chrome>
      )
  }
}
