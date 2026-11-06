import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface Props {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}

/** Fades content in once when it enters the viewport. */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ ['--d' as string]: `${delay}ms` }}>
      {children}
    </Tag>
  )
}
