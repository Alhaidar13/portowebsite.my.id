import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Handshake, Loader2, Mail, MessageCircle, Send } from 'lucide-react'
import { PROJECT_TYPES, SITE } from '../data/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'projectType' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const whatsappLink = (text: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

type FormData2 = { name: string; email: string; business: string; projectType: string; message: string }
const mailtoLink = (d: FormData2 | null) => {
  const subject = d ? `Inquiry dari ${d.name} — ${d.projectType}` : 'Inquiry website'
  const body = d
    ? `Nama: ${d.name}\nEmail: ${d.email}\nBisnis: ${d.business || '-'}\nJenis project: ${d.projectType}\n\n${d.message}`
    : ''
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const [lastData, setLastData] = useState<FormData2 | null>(null)
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
    if (data.name.length < 2) next.name = 'Mohon isi nama kamu.'
    if (!EMAIL_RE.test(data.email)) next.email = 'Mohon isi alamat email yang valid.'
    if (!data.projectType) next.projectType = 'Mohon pilih jenis project.'
    if (data.message.length < 10) next.message = 'Mohon jelaskan project kamu (minimal 10 karakter).'
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('sending')
    setServerMsg('')
    setLastData(data)
    try {
      if (data.website) {
        // honeypot filled -> pretend success
        setStatus('success')
        form.reset()
        return
      }
      // Same-origin server endpoint (no CORS / adblock issues). The server delivers the email.
      let res: Response
      try {
        res = await fetch(SITE.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      } catch {
        throw new Error('Koneksi ke server gagal. Periksa internet kamu, atau kirim lewat email / WhatsApp di bawah.')
      }
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors }
      if (res.status === 422 && json.errors) {
        setErrors(json.errors)
        throw new Error(json.error || 'Periksa kembali kolom yang ditandai.')
      }
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Pesan belum terkirim. Silakan coba lagi, atau kirim lewat email / WhatsApp di bawah.')
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
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t hairline py-24 lg:py-32">
      <div className="blob -right-32 top-10 h-80 w-80 bg-indigo-500/15" aria-hidden="true" />
      <div className="container-x relative">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Have a Project in Mind?"
          subtitle="Let's create something meaningful for your business. Tell me about your idea, and let's make it happen."
        />

        <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <Reveal className="h-full">
          <div className="card spotlight flex h-full flex-col items-center justify-center gap-6 p-8 text-center sm:p-10">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 animate-float">
              <MessageCircle size={30} aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-2xl font-bold">Ngobrol langsung</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg/65">
                Klik tombol di bawah, pesan template sudah terisi otomatis. Tinggal kirim ke WhatsApp saya.
              </p>
            </div>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full !bg-[#25D366] !py-3.5 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#25D366]/40"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chat on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex max-w-full items-center gap-2.5 break-all text-sm font-medium text-fg/75 transition hover:text-accent"
            >
              <Mail size={16} className="shrink-0" aria-hidden="true" />
              <span className="link-u">{SITE.email}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="card p-6 sm:p-9">
            {status === 'success' ? (
              <div role="status" className="py-10 text-center">
                <CheckCircle2 size={44} className="mx-auto text-fg dark:text-accent" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-5 text-2xl font-bold tracking-tight">Pesan terkirim!</h3>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-fg/65">
                  Terima kasih — pesan kamu sudah masuk ke email saya dan akan segera saya balas.
                </p>
                <button type="button" onClick={() => setStatus('idle')} className="btn btn-outline mt-7">
                  Kirim pesan lagi
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
                      Nama <span aria-hidden="true">*</span>
                    </label>
                    <input id="name" name="name" type="text" autoComplete="name" required maxLength={100} placeholder="Nama lengkap kamu" className="field" {...a11y('name')} />
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
                      Nama bisnis <span className="text-fg/45">(opsional)</span>
                    </label>
                    <input id="business" name="business" type="text" autoComplete="organization" maxLength={120} placeholder="Nama bisnis kamu" className="field" />
                  </div>
                  <div>
                    <label htmlFor="projectType" className={label}>
                      Jenis project <span aria-hidden="true">*</span>
                    </label>
                    <select id="projectType" name="projectType" required defaultValue="" className="field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10" {...a11y('projectType')}>
                      <option value="" disabled>
                        Pilih jenis project
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

                <button
                  type="button"
                  onClick={() => {
                    const sel = document.getElementById('projectType') as HTMLSelectElement | null
                    if (sel) sel.value = PROJECT_TYPES[PROJECT_TYPES.length - 2]
                    setErrors((e) => ({ ...e, projectType: undefined }))
                  }}
                  className="group inline-flex items-center gap-2 rounded-full border border-dashed border-accent/60 bg-accent/5 px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 hover:bg-accent/10"
                >
                  <Handshake size={15} className="text-accent transition group-hover:rotate-12" aria-hidden="true" />
                  Let&apos;s Collabs — ajak saya kolaborasi!
                </button>

                <div>
                  <label htmlFor="message" className={label}>
                    Deskripsi project <span aria-hidden="true">*</span>
                  </label>
                  <textarea id="message" name="message" rows={5} required maxLength={3000} placeholder="Ceritakan bisnis, tujuan, dan kebutuhan website kamu…" className="field resize-y" {...a11y('message')} />
                  <Err k="message" />
                </div>

                <div id="form-status" aria-live="polite">
                  {status === 'error' && (
                    <p className="flex items-start gap-2.5 rounded-2xl border border-fg/20 bg-fg/[0.04] p-4 text-sm" role="alert">
                      <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                      <span>
                        {serverMsg}{' '}
                        <a href={mailtoLink(lastData)} className="link-u font-semibold">
                          Kirim lewat aplikasi email
                        </a>{' '}
                        atau{' '}
                        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="link-u font-semibold">
                          WhatsApp
                        </a>
                        .
                      </span>
                    </p>
                  )}
                </div>

                <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60">
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" aria-hidden="true" /> Mengirim…
                    </>
                  ) : (
                    <>
                      Kirim Pesan <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  )
}
