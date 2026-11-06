import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle, Send } from 'lucide-react'
import { PROJECT_TYPES, SITE } from '../data/site'
import Reveal from './Reveal'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'projectType' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const whatsappLink = (text: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [serverMsg, setServerMsg] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const data = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      business: String(fd.get('business') ?? '').trim(),
      projectType: String(fd.get('projectType') ?? ''),
      message: String(fd.get('message') ?? '').trim(),
      website: String(fd.get('website') ?? ''), // honeypot
    }

    const next: Errors = {}
    if (data.name.length < 2) next.name = 'Please enter your name.'
    if (!EMAIL_RE.test(data.email)) next.email = 'Please enter a valid email address.'
    if (!data.projectType) next.projectType = 'Please choose a project type.'
    if (data.message.length < 10) next.message = 'Please describe your project (at least 10 characters).'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    setServerMsg('')
    try {
      const res = await fetch(SITE.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors }
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors)
        throw new Error(json.error || 'Something went wrong. Please try again or contact me via WhatsApp.')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setServerMsg(err instanceof Error ? err.message : 'Network error. Please try again.')
    }
  }

  const err = (k: keyof Errors) => errors[k]
  const a11y = (k: keyof Errors) => ({
    'aria-invalid': err(k) ? true : undefined,
    'aria-describedby': err(k) ? `${k}-error` : undefined,
  })
  const Err = ({ k }: { k: keyof Errors }) =>
    err(k) ? (
      <p id={`${k}-error`} className="mt-1.5 text-xs font-medium text-fg">
        {err(k)}
      </p>
    ) : null

  const label = 'mb-2 block text-sm font-medium'

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t hairline py-24 lg:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title mt-4">
            Have a Project in Mind?
          </h2>
          <p className="lead mt-6 max-w-md">
            Let&apos;s create something meaningful for your business. Tell me about your idea, and let&apos;s make it
            happen.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full sm:w-auto"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="flex items-center gap-3 text-sm text-fg/70">
              <Mail size={16} className="text-fg dark:text-accent" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="link-u">
                {SITE.email}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card p-6 sm:p-9">
            {status === 'success' ? (
              <div role="status" className="py-10 text-center">
                <CheckCircle2 size={44} className="mx-auto text-fg dark:text-accent" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-bold tracking-tight">Inquiry received.</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-fg/65">
                  Thank you — your message has been saved and I&apos;ll get back to you by email soon.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline mt-7">
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate aria-describedby="form-status" className="space-y-5">
                {/* Honeypot: hidden from users, bots fill it */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label>
                    Website
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Your full name" className="field" {...a11y('name')} />
                    <Err k="name" />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input id="email" name="email" type="email" autoComplete="email" required maxLength={150} placeholder="you@company.com" className="field" {...a11y('email')} />
                    <Err k="email" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="business" className={label}>
                      Business name <span className="text-fg/45">(optional)</span>
                    </label>
                    <input id="business" name="business" type="text" autoComplete="organization" maxLength={120} placeholder="Your business" className="field" />
                  </div>
                  <div>
                    <label htmlFor="projectType" className={label}>
                      Project type <span aria-hidden="true">*</span>
                    </label>
                    <select id="projectType" name="projectType" required defaultValue="" className="field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10" {...a11y('projectType')}>
                      <option value="" disabled>
                        Select a project type
                      </option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <Err k="projectType" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={label}>
                    Project description <span aria-hidden="true">*</span>
                  </label>
                  <textarea id="message" name="message" rows={5} required maxLength={3000} placeholder="Tell me about your business, goals, and what you need…" className="field resize-y" {...a11y('message')} />
                  <Err k="message" />
                </div>

                <div id="form-status" aria-live="polite">
                  {status === 'error' && (
                    <p className="flex items-start gap-2.5 rounded-2xl border border-fg/20 bg-fg/[0.04] p-4 text-sm" role="alert">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                      {serverMsg}
                    </p>
                  )}
                </div>

                <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      Send Inquiry <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
