/**
 * POST /api/contact — delivers contact-form inquiries to the owner's inbox.
 *
 * The browser only talks to this same-origin endpoint (no CORS / adblock / "Failed to fetch" issues).
 * Delivery channels (success = at least one works):
 *   1. Resend      — if secrets RESEND_API_KEY (+ optional FROM_EMAIL) are set. NOTIFY_EMAIL defaults to the owner.
 *   2. FormSubmit  — server-to-server call to formsubmit.co (no key needed; mailbox must be activated once).
 *   3. D1 backup   — stored if the DB binding exists (never required).
 */
interface Env {
  DB?: D1Database
  RESEND_API_KEY?: string
  NOTIFY_EMAIL?: string
  FROM_EMAIL?: string
}

const OWNER_EMAIL = 'fikrialhaidar17@gmail.com'
const TYPES = ['Business Website', 'Landing Page', 'Company Profile', 'E-Commerce Website', 'Personal Website', "Let's Collabs (kerja sama)", 'Other']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const timeout = (ms: number) => AbortSignal.timeout(ms)

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let b: Record<string, unknown>
  try {
    b = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'Permintaan tidak valid.' }, 400)
  }
  const s = (k: string, max: number) => String(b[k] ?? '').trim().slice(0, max)

  // Honeypot — pretend success so bots move on.
  if (s('website', 200)) return json({ ok: true })

  const name = s('name', 100)
  const email = s('email', 150)
  const business = s('business', 120)
  const projectType = s('projectType', 60)
  const message = s('message', 3000)

  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Mohon isi nama kamu.'
  if (!EMAIL_RE.test(email)) errors.email = 'Mohon isi alamat email yang valid.'
  if (!TYPES.includes(projectType)) errors.projectType = 'Mohon pilih jenis project.'
  if (message.length < 10) errors.message = 'Mohon jelaskan project kamu (minimal 10 karakter).'
  if (Object.keys(errors).length) return json({ ok: false, error: 'Periksa kembali kolom yang ditandai.', errors }, 422)

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const ipHash = await sha256(ip)

  // Rate limit (only when D1 is available).
  if (env.DB) {
    try {
      const recent = await env.DB.prepare(
        "SELECT COUNT(*) AS n FROM contact_messages WHERE ip_hash = ? AND created_at > datetime('now','-1 hour')",
      ).bind(ipHash).first<{ n: number }>()
      if ((recent?.n ?? 0) >= 8) return json({ ok: false, error: 'Terlalu banyak pesan. Coba lagi nanti.' }, 429)
    } catch (e) {
      console.error('rate-limit check failed', e)
    }
  }

  const subject = `Inquiry baru dari ${name} — ${projectType}`
  const text = `Nama: ${name}\nEmail: ${email}\nBisnis: ${business || '-'}\nJenis Project: ${projectType}\n\n${message}`
  const to = env.NOTIFY_EMAIL || OWNER_EMAIL
  let emailed = false

  // 1) Resend
  if (env.RESEND_API_KEY) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: env.FROM_EMAIL || 'Portfolio <onboarding@resend.dev>', to: [to], reply_to: email, subject, text }),
        signal: timeout(8000),
      })
      emailed = r.ok
      if (!r.ok) console.error('resend failed', r.status, await r.text())
    } catch (e) {
      console.error('resend error', e)
    }
  }

  // 2) FormSubmit (server-to-server)
  if (!emailed) {
    try {
      const origin = new URL(request.url).origin
      const r = await fetch(`https://formsubmit.co/ajax/${to}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: origin, Referer: origin + '/' },
        body: JSON.stringify({
          Nama: name,
          Email: email,
          Bisnis: business || '-',
          'Jenis Project': projectType,
          Pesan: message,
          _subject: subject,
          _replyto: email,
          _template: 'table',
          _captcha: 'false',
        }),
        signal: timeout(10000),
      })
      const j = (await r.json().catch(() => ({}))) as { success?: boolean | string }
      emailed = r.ok && (j.success === true || j.success === 'true')
      if (!emailed) console.error('formsubmit failed', r.status, JSON.stringify(j))
    } catch (e) {
      console.error('formsubmit error', e)
    }
  }

  // 3) D1 backup
  let saved = false
  if (env.DB) {
    try {
      await env.DB.prepare(
        'INSERT INTO contact_messages (name, email, business, project_type, message, ip_hash) VALUES (?, ?, ?, ?, ?, ?)',
      ).bind(name, email, business || null, projectType, message, ipHash).run()
      saved = true
    } catch (e) {
      console.error('D1 error', e)
    }
  }

  if (emailed || saved) return json({ ok: true, emailed, saved })
  return json({ ok: false, error: 'Server belum bisa mengirim email saat ini.' }, 502)
}

export const onRequest: PagesFunction<Env> = async () => json({ ok: false, error: 'Method not allowed.' }, 405)
