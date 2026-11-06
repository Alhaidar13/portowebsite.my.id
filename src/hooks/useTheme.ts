import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const read = (): Theme =>
  typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable (private mode) — theme still works for this session */
    }
  }, [theme])

  const toggle = useCallback(() => {
    const root = document.documentElement
    // Briefly enable colour transitions on everything for a smooth switch.
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 450)
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
