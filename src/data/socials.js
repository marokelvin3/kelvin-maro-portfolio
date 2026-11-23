export const profileData = {
  name: 'Kelvin Maro U.',
  logo: 'KM.',
  title: 'AI Product Engineer',
  rotatingRoles: [
    'AI Product Engineer',
    'Healthcare Systems Builder',
    'Full-Stack Developer',
  ],
  location: 'Lagos, Nigeria (works with clients remotely worldwide)',
  tagline: 'I build intelligent, practical software that solves organizational and societal problems',
  valueSubline:
    'Combining AI-assisted product engineering with 4+ years of hands-on hospital & enterprise IT leadership.',
  bio: 'Kelvin is an AI Product Engineer with 1 year of experience building AI-assisted products, backed by 4 years as an IT Support Expert. He manages IT for a specialist cancer hospital in Lagos, supporting 100+ staff, and independently builds web platforms, internal tools and AI-assisted workflows through his consultancy, RUVIN IT Consulting. He turns real operational problems into simple, reliable products that non-technical teams can actually use.',
  images: {
    portrait: '/images/kelvin-portrait.jpeg',
    passport: '/images/kelvin-passport.png',
  },
  stats: [
    { id: 'ai-exp', value: 1, suffix: '', label: 'Year as an AI Product Engineer' },
    { id: 'it-exp', value: 4, suffix: '', label: 'Years as an IT Support Expert' },
    { id: 'staff', value: 100, suffix: '+', label: 'Staff Supported' },
    { id: 'wp-sites', value: 4, suffix: '', label: 'WordPress Websites Managed' },
    { id: 'projects', value: 9, suffix: '', label: 'Featured Projects' },
  ],
};

export const contactInfo = {
  email: 'kelvinumuowhero@gmail.com',
  emailHref: 'mailto:kelvinumuowhero@gmail.com',
  phoneDisplay: '+234 806 704 5728',
  phoneHref: 'tel:+2348067045728',
  whatsappHref: 'https://wa.me/2348067045728',
  linkedinHref: 'https://www.linkedin.com/in/kelvin-umuowhero-082688437/',
  xHref: 'https://x.com/Feedngdnation',
  xHandle: '@Feedngdnation',
  location: 'Lagos, Nigeria (Remote Worldwide)',
};

export const socialLinks = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: contactInfo.linkedinHref,
    handle: 'Kelvin Umuowhero',
    external: true,
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    href: contactInfo.xHref,
    handle: '@Feedngdnation',
    external: true,
  },
  {
    id: 'email',
    name: 'Email',
    href: contactInfo.emailHref,
    handle: contactInfo.email,
    external: false,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    href: contactInfo.whatsappHref,
    handle: contactInfo.phoneDisplay,
    external: true,
  },
];
