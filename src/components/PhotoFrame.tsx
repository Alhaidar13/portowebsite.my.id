import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import { Code2, Palette, Sparkles } from 'lucide-react'
import { SITE } from '../data/site'

/** One floating element: outer = mouse parallax, inner = idle float. */
function Float({ className, depth, delay = '0s', children }: { className: string; depth: number; delay?: string; children: ReactNode }) {
  const style: CSSProperties = { transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))` }
  return (
    <div className={`absolute transition-transform duration-300 ease-out ${className}`} style={style} aria-hidden="true">
      <div className="animate-float" style={{ animationDelay: delay }}>
        {children}
      </div>
    </div>
  )
}

const chip =
  'flex items-center gap-2 rounded-2xl border border-fg/12 bg-base/90 px-3 py-2 text-xs font-semibold shadow-xl shadow-fg/10 backdrop-blur'

/**
 * Frameless, background-free portrait: the cut-out photo stands on its own,
 * fading softly into the page, surrounded by floating tech chips that react to the cursor.
 */
export default function PhotoFrame() {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--px', String((e.clientX - r.left) / r.width - 0.5))
    el.style.setProperty('--py', String((e.clientY - r.top) / r.height - 0.5))
  }
  const onLeave = () => {
    ref.current?.style.setProperty('--px', '0')
    ref.current?.style.setProperty('--py', '0')
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="photo-cutout relative mx-auto w-full max-w-[24rem] px-3 pt-8 sm:px-0"
    >
      {/* the portrait itself — no frame, no backdrop */}
      <div className="relative mx-auto w-[88%]">
        <img
          src={SITE.photo}
          alt={`Foto ${SITE.fullName}`}
          width={878}
          height={1162}
          loading="lazy"
          className="photo-fade relative z-10 h-auto w-full select-none drop-shadow-[0_28px_40px_rgb(15_23_42/0.28)]"
        />
        {/* soft ground shadow so the cut-out feels grounded */}
        <div className="absolute inset-x-[8%] -bottom-1 z-0 h-8 rounded-[50%] bg-fg/25 blur-2xl" aria-hidden="true" />
      </div>

      {/* floating chips — kept around the edges so they never cover the face */}
      <Float className="left-0 top-[20%] z-20 sm:-left-8" depth={-18}>
        <span className={chip}>
          <Code2 size={16} className="text-accent" /> Developer
        </span>
      </Float>
      <Float className="right-0 top-[38%] z-20 sm:-right-8" depth={22} delay="-3s">
        <span className={chip}>
          <Palette size={16} className="text-pink-400" /> UI/UX
        </span>
      </Float>
      <Float className="left-2 top-[62%] z-20 sm:-left-6" depth={14} delay="-5s">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-fg/12 bg-base/90 shadow-xl shadow-fg/10 backdrop-blur">
          <img src="/tech/react.svg" alt="" width={26} height={26} className="h-[26px] w-[26px]" />
        </span>
      </Float>
      <Float className="right-2 top-[64%] z-20 sm:-right-5" depth={-14} delay="-2s">
        <span className="grid h-12 w-12 place-items-center rounded-2xl border border-fg/12 bg-base/90 shadow-xl shadow-fg/10 backdrop-blur">
          <img src="/tech/figma.svg" alt="" width={24} height={24} className="h-6 w-6" />
        </span>
      </Float>
      <Float className="left-1/2 top-[6%] z-0 -translate-x-1/2" depth={-10} delay="-1s">
        <Sparkles size={26} className="animate-wiggle text-accent" />
      </Float>
      <Float className="bottom-3 left-1/2 z-20 -translate-x-1/2" depth={8} delay="-4s">
        <span className={`${chip} rounded-full`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping2 rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          Open for projects
        </span>
      </Float>
    </div>
  )
}
