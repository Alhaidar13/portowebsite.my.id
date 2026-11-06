import { useEffect, useState } from 'react'

/** Types and erases a rotating list of words. */
export default function Typewriter({ words }: { words: readonly string[] }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [del, setDel] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setText(words[0])
      return
    }
    const word = words[i]
    let t: number
    if (!del && text === word) t = window.setTimeout(() => setDel(true), 1600)
    else if (del && text === '') {
      setDel(false)
      setI((i + 1) % words.length)
      return
    } else t = window.setTimeout(() => setText(word.slice(0, text.length + (del ? -1 : 1))), del ? 40 : 85)
    return () => clearTimeout(t)
  }, [text, del, i, words])

  return (
    <span className="caret gradient-text" aria-label={words.join(', ')}>
      <span aria-hidden="true">{text || '\u00A0'}</span>
    </span>
  )
}
