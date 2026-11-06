/**
 * POST /api/contact — stores contact-form inquiries in Cloudflare D1.
 * Binding: DB (see wrangler.jsonc). Table: migrations/0001_contact_messages.sql
 *
 * Optional: set the secrets RESEND_API_KEY + NOTIFY_EMAIL (+ FROM_EMAIL) to also get
 * an email notification for each inquiry. Without them, inquiries are only stored.
 */
interface Env {
  DB: D1Database
  RESEND_API_KEY?: string
  NOTIFY_EMAIL?: string
  FROM_EMAIL?: string
}

const TYPES = ['Business Website', 'Landing Page', 'Company Profile', 'E-Commerce Website', 'Personal Website', 'Other']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ ok: false, error: 'Inquiry storage is not configured yet. Please contact me via WhatsApp.' }, 503)

  let b: Record<string, unknown>
  try {
    b = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400)
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
  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'
  if (!TYPES.includes(projectType)) errors.projectType = 'Please choose a project type.'
  if (message.length < 10) errors.message = 'Please describe your project (at least 10 characters).'
  if (Object.keys(errors).length) return json({ ok: false, error: 'Please check the highlighted fields.', errors }, 422)

  // Basic rate limit: max 5 submissions / hour / IP (hashed, never stored raw).
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
  const ipHash = await sha256(ip)
  try {
    const recent = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM contact_messages WHERE ip_hash = ? AND created_at > datetime('now','-1 hour')",
    ).bind(ipHash).first<{ n: number }>()
    if ((recent?.n ?? 0) >= 5) return json({ ok: false, error: 'Too many submissions. Please try again later.' }, 429)

    await env.DB.prepare(
      'INSERT INTO contact_messages (name, email, business, project_type, message, ip_hash) VALUES (?, ?, ?, ?, ?, ?)',
    ).bind(name, email, business || null, projectType, message, ipHash).run()
  } catch (e) {
    console.error('D1 error', e)
    return json({ ok: false, error: 'Could not save your inquiry. Please try again or use WhatsApp.' }, 500)
  }

  // Optional email notification (never blocks or fails the request).
  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
          to: [env.NOTIFY_EMAIL],
          reply_to: email,
          subject: `New inquiry: ${projectType} — ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nBusiness: ${business || '-'}\nType: ${projectType}\n\n${message}`,
        }),
      })
    } catch (e) {
      console.error('notify failed', e)
    }
  }

  return json({ ok: true })
}

export const onRequest: PagesFunction<Env> = async () => json({ ok: false, error: 'Method not allowed.' }, 405)
