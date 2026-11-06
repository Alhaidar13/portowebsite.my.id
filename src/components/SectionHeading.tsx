import Reveal from './Reveal'

interface Props {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
}

/** Large, centred heading shared by every section. */
export default function SectionHeading({ id, eyebrow, title, subtitle }: Props) {
  return (
    <Reveal className="mx-auto max-w-4xl text-center">
      <p className="eyebrow inline-flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent/60" aria-hidden="true" />
        {eyebrow}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent/60" aria-hidden="true" />
      </p>
      <h2 id={id} className="section-title mt-5">
        {title}
      </h2>
      {subtitle && <p className="lead mx-auto mt-5 max-w-2xl">{subtitle}</p>}
    </Reveal>
  )
}
