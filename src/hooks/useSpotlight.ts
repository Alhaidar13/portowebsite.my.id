import { useEffect } from 'react'

/** Feeds cursor position to every `.spotlight` element as CSS variables. */
export function useSpotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('.spotlight')
      if (!t) return
      const r = t.getBoundingClientRect()
      t.style.setProperty('--mx', `${e.clientX - r.left}px`)
      t.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}
