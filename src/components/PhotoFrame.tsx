import { useRef, type MouseEvent } from 'react'
import { Code2, Palette, Sparkles } from 'lucide-react'
import { SITE } from '../data/site'

/** Creative photo frame: spinning gradient ring, dotted grid, viewfinder corners, floating badges, 3D tilt on hover. */
export default function PhotoFrame() {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  const corner = 'absolute h-9 w-9 border-accent'

  return (
    <div className="photo-frame relative mx-auto w-full max-w-[22rem] px-6 py-6">
      {/* dotted pattern + orbit rings */}
      <div className="photo-dots absolute -right-2 top-0 h-32 w-32" aria-hidden="true" />
      <div className="photo-dots absolute -left-2 bottom-0 h-32 w-32" aria-hidden="true" />
      <div className="absolute inset-0 m-auto h-[108%] w-[108%] animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-fg/15" aria-hidden="true" />

      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative transition-transform duration-300 ease-out will-change-transform"
      >
        {/* spinning conic gradient border */}
        <div className="photo-ring absolute -inset-[5px] rounded-[2.2rem]" aria-hidden="true" />
        <div className="absolute -inset-4 rounded-[2.6rem] bg-gradient-to-br from-indigo-500 via-sky-400 to-pink-400 opacity-40 blur-2xl animate-pulse-glow" aria-hidden="true" />

        <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border-2 border-base bg-base shadow-2xl shadow-fg/20">
          <img
            src={SITE.photo}
            alt={`Foto ${SITE.fullName}`}
            width={900}
            height={1200}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
          <div className="photo-scan pointer-events-none absolute inset-x-0 h-24" aria-hidden="true" />
        </div>

        {/* viewfinder corners */}
        <span className={`${corner} -left-3 -top-3 rounded-tl-2xl border-l-4 border-t-4`} aria-hidden="true" />
        <span className={`${corner} -right-3 -top-3 rounded-tr-2xl border-r-4 border-t-4`} aria-hidden="true" />
        <span className={`${corner} -bottom-3 -left-3 rounded-bl-2xl border-b-4 border-l-4`} aria-hidden="true" />
        <span className={`${corner} -bottom-3 -right-3 rounded-br-2xl border-b-4 border-r-4`} aria-hidden="true" />

        {/* floating badges */}
        <span className="absolute -left-5 top-10 flex animate-float items-center gap-2 rounded-2xl border border-fg/12 bg-base/90 px-3 py-2 text-xs font-semibold shadow-xl backdrop-blur sm:-left-9">
          <Code2 size={16} className="text-accent" aria-hidden="true" /> Developer
        </span>
        <span className="absolute -right-5 top-1/2 flex animate-float-slow items-center gap-2 rounded-2xl border border-fg/12 bg-base/90 px-3 py-2 text-xs font-semibold shadow-xl backdrop-blur sm:-right-9">
          <Palette size={16} className="text-pink-400" aria-hidden="true" /> UI/UX
        </span>
        <span className="absolute -bottom-4 left-6 flex animate-float items-center gap-2 rounded-full border border-fg/12 bg-base/90 px-3.5 py-2 text-xs font-semibold shadow-xl backdrop-blur [animation-delay:-3s]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Open for projects
        </span>
        <Sparkles size={22} className="absolute -right-2 -top-8 animate-wiggle text-accent" aria-hidden="true" />
      </div>
    </div>
  )
}
