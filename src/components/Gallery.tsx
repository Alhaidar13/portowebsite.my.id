import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { GalleryImage } from '../data/site'

/** Swipeable gallery: native scroll-snap (touch swipe), mouse drag, arrows, dots, keyboard. */
export default function Gallery({ slides, label }: { slides: GalleryImage[]; label: string }) {
  const track = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false })
  const [index, setIndex] = useState(0)

  const goTo = useCallback((i: number) => {
    const el = track.current
    if (!el) return
    const n = Math.max(0, Math.min(slides.length - 1, i))
    el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' })
  }, [slides.length])

  // Keep the active dot in sync with the scroll position.
  useEffect(() => {
    const el = track.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setIndex(Math.round(el.scrollLeft / el.clientWidth)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Reset to first slide when the slides change (different project).
  useEffect(() => {
    track.current?.scrollTo({ left: 0 })
    setIndex(0)
  }, [slides])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !track.current) return
    drag.current = { active: true, startX: e.clientX, startLeft: track.current.scrollLeft, moved: false }
    track.current.style.scrollSnapType = 'none'
    track.current.style.scrollBehavior = 'auto'
    track.current.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active || !track.current) return
    const dx = e.clientX - d.startX
    if (Math.abs(dx) > 3) d.moved = true
    track.current.scrollLeft = d.startLeft - dx
  }
  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active || !track.current) return
    d.active = false
    const el = track.current
    const dx = e.clientX - d.startX
    el.style.scrollSnapType = ''
    el.style.scrollBehavior = ''
    // Snap to next / previous when dragged more than 15% of the width.
    const base = Math.round(d.startLeft / el.clientWidth)
    const threshold = el.clientWidth * 0.15
    goTo(dx < -threshold ? base + 1 : dx > threshold ? base - 1 : base)
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1) }
  }

  const arrow =
    'absolute top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-fg/15 bg-base/90 text-fg shadow-lg backdrop-blur transition hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-0 sm:h-11 sm:w-11'

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} — galeri tampilan`}
    >
      <div className="relative overflow-hidden rounded-2xl border border-fg/10 bg-fg/[0.03]">
        <div
          ref={track}
          tabIndex={0}
          onKeyDown={onKey}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="gallery-track flex cursor-grab snap-x snap-mandatory overflow-x-auto scroll-smooth active:cursor-grabbing"
        >
          {slides.map((s, i) => (
            <figure
              key={s.src}
              className="relative aspect-[1024/465] w-full shrink-0 snap-center"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${slides.length}`}
            >
              <img
                src={s.src}
                alt={s.alt}
                draggable={false}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full select-none object-cover object-top"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-3 pt-10 text-xs font-medium text-white sm:px-5 sm:text-sm">
                {s.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <button type="button" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Gambar sebelumnya" className={`${arrow} left-3`}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => goTo(index + 1)} disabled={index === slides.length - 1} aria-label="Gambar berikutnya" className={`${arrow} right-3`}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>

        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium tabular-nums text-white backdrop-blur">
          {index + 1} / {slides.length}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-2" role="tablist" aria-label="Pilih gambar">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Lihat gambar ${i + 1}: ${s.caption}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-7 bg-accent' : 'w-2 bg-fg/25 hover:bg-fg/50'}`}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-[11px] text-fg/45">Geser untuk melihat tampilan lainnya</p>
    </div>
  )
}
