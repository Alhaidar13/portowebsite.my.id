import { MessageCircle } from 'lucide-react'
import { whatsappLink } from './Contact'

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp (opens in a new tab)"
      className="group fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40 transition hover:-translate-y-1 hover:scale-110"
    >
      <span className="absolute inset-0 animate-ping2 rounded-full bg-[#25D366]/60" aria-hidden="true" />
      <MessageCircle size={26} className="relative" aria-hidden="true" />
    </a>
  )
}
