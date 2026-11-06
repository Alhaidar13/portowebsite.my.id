/**
 * ============================================================
 *  CONTENT & CONFIG — edit this file to personalise the site.
 * ============================================================
 */

export const SITE = {
  /** Developer name shown in navbar, footer, and page metadata. */
  name: 'Your Name',
  /** WhatsApp number in international format, digits only (e.g. Indonesia: 62812xxxxxxx). */
  whatsapp: '6281234567890',
  whatsappMessage: "Hi, I found your portfolio and I'd like to discuss a website project.",
  email: 'hello@example.com',
  socials: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/',
    instagram: 'https://www.instagram.com/',
  },
  /** Endpoint that receives contact form submissions (see functions/api/contact.ts). */
  contactEndpoint: '/api/contact',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

export const TECH_STACK = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Tailwind CSS',
  'Vite',
  'Git & GitHub',
  'Responsive Design',
  'REST APIs',
] as const

export type ServiceIcon = 'briefcase' | 'rocket' | 'building' | 'cart' | 'user'

export const SERVICES: { title: string; description: string; icon: ServiceIcon }[] = [
  { title: 'Business Website', description: 'Professional websites to introduce your business and build customer trust.', icon: 'briefcase' },
  { title: 'Landing Page', description: 'High-converting landing pages for products, promotions, and campaigns.', icon: 'rocket' },
  { title: 'Company Profile', description: 'A professional online identity for companies and organizations.', icon: 'building' },
  { title: 'E-Commerce Website', description: 'Modern online stores that help businesses showcase and sell their products.', icon: 'cart' },
  { title: 'Personal Website', description: 'Personal portfolios and websites for creators, professionals, and freelancers.', icon: 'user' },
]

export const PROCESS = [
  { step: '01', title: 'Discovery', description: 'Understanding your business, goals, and target audience.' },
  { step: '02', title: 'Planning & Design', description: 'Creating the website structure and visual direction.' },
  { step: '03', title: 'Development', description: 'Turning the design into a responsive and functional website.' },
  { step: '04', title: 'Launch', description: 'Testing, optimizing, and preparing the website for launch.' },
] as const

export const PROJECT_TYPES = [
  'Business Website',
  'Landing Page',
  'Company Profile',
  'E-Commerce Website',
  'Personal Website',
  'Other',
] as const

/* ------------------------------------------------------------
 *  PROJECTS — exactly five. Replace each field with real info.
 *
 *  image:      path to a real screenshot, e.g. '/projects/project-one.webp'
 *              (put files in /public/projects). When empty, a built-in
 *              placeholder mockup (see `mockup`) is displayed instead.
 *  liveUrl:    optional. When set, a "Live Preview" link is shown.
 *  isPlaceholder: set to false once the project is a real, finished one
 *              to remove the "Placeholder" badge.
 * ------------------------------------------------------------ */
export type MockupVariant = 'shop' | 'coffee' | 'landing' | 'corporate' | 'creative'

export interface Project {
  slug: string
  name: string
  type: string
  category: string
  description: string
  overview: string
  scope: string[]
  highlights: string[]
  tech: string[]
  mockup: MockupVariant
  image?: string
  imageAlt?: string
  liveUrl?: string
  isPlaceholder: boolean
}

export const PROJECTS: Project[] = [
  {
    slug: 'project-one',
    name: 'Project One',
    type: 'E-Commerce Website',
    category: 'Online Store',
    description: 'A modern e-commerce experience designed to showcase products and simplify online shopping.',
    overview:
      'Replace this text with the real project story: the client or brief, the problem to solve, and what the final website achieves. This placeholder describes the kind of e-commerce work offered.',
    scope: ['Product catalog & detail pages', 'Cart and checkout flow', 'Responsive design', 'Performance optimization'],
    highlights: ['Clear product browsing', 'Simple, low-friction checkout', 'Mobile-first layout'],
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    mockup: 'shop',
    isPlaceholder: true,
  },
  {
    slug: 'project-two',
    name: 'Project Two',
    type: 'Coffee Shop Website',
    category: 'Food & Beverage',
    description: 'A professional website for a coffee business, featuring product showcases and business information.',
    overview:
      'Replace this text with the real project story. This placeholder represents a café or food & beverage website with a menu, location details, and brand storytelling.',
    scope: ['Menu & product showcase', 'Location and opening hours', 'Brand storytelling', 'Responsive design'],
    highlights: ['Appetizing visual presentation', 'Easy-to-find business info', 'Fast loading on mobile'],
    tech: ['React', 'Tailwind CSS', 'Vite'],
    mockup: 'coffee',
    isPlaceholder: true,
  },
  {
    slug: 'project-three',
    name: 'Project Three',
    type: 'Business Landing Page',
    category: 'Business',
    description: "A clean landing page designed to communicate a business's value and encourage customer inquiries.",
    overview:
      'Replace this text with the real project story. This placeholder represents a conversion-focused landing page with a clear value proposition and inquiry flow.',
    scope: ['Value proposition & copy structure', 'Inquiry / contact form', 'Responsive design', 'SEO fundamentals'],
    highlights: ['Focused single-page story', 'Clear calls to action', 'Lightweight and fast'],
    tech: ['HTML', 'CSS', 'JavaScript'],
    mockup: 'landing',
    isPlaceholder: true,
  },
  {
    slug: 'project-four',
    name: 'Project Four',
    type: 'Company Profile',
    category: 'Corporate',
    description: 'A professional digital identity that introduces a company, its services, and its brand.',
    overview:
      'Replace this text with the real project story. This placeholder represents a corporate website presenting a company, its services, team, and brand.',
    scope: ['Company & services pages', 'Team and values sections', 'Contact & location', 'Responsive design'],
    highlights: ['Trustworthy, professional look', 'Structured information', 'Easy to maintain'],
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    mockup: 'corporate',
    isPlaceholder: true,
  },
  {
    slug: 'project-five',
    name: 'Project Five',
    type: 'Personal / Creative Website',
    category: 'Personal Branding',
    description: 'A modern website designed to showcase identity, services, and creative work.',
    overview:
      'Replace this text with the real project story. This placeholder represents a personal brand or creative portfolio website with a gallery and about section.',
    scope: ['Portfolio gallery', 'About & services', 'Contact integration', 'Responsive design'],
    highlights: ['Expressive but clean layout', 'Work-first presentation', 'Smooth micro-interactions'],
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
    mockup: 'creative',
    isPlaceholder: true,
  },
]
