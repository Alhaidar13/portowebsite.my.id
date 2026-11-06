import { MessageCircle } from 'lucide-react'
import { whatsappLink } from './Contact'

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-accent text-onaccent shadow-xl shadow-fg/20 transition hover:-translate-y-1 hover:scale-105"
    >
      <MessageCircle size={24} aria-hidden="true" />
    </a>
  )
}
