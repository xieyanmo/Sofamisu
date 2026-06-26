export const siteContent = {
  announcementBar: {
    text: '',
  },
  navbar: {
    logoAlt: 'Sofamisu',
    homeLabel: 'Sofamisu home',
    links: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Collections',
        href: '/collections',
      },
      {
        label: 'FAQ',
        href: '/faq',
      },
    ],
    icons: {
      contact: 'Contact',
      account: 'Account',
      cart: 'Cart',
    },
  },
  hero: {
    imageAlt: 'Leather sofa',
    imageLabel: 'Leather sofa hero image',
    title: '',
    subtitle: '',
    buttonText: 'Explore Collections',
  },
  keyBenefits: [
    {
      iconName: 'custom_color',
      text: 'Custom Leather\n& Colour Options',
    },
    {
      iconName: 'free_delivery',
      text: 'Complimentary\nDelivery',
    },
    {
      iconName: 'secure_deposit',
      text: 'Secure with\nDeposit Only',
    },
    {
      iconName: 'made_to_order',
      text: 'Made to\nOrder',
    },
  ],
  featuredProducts: {
    sectionTitle: 'Featured Product',
  },
  collections: {
    breadcrumb: ['Home', 'Collections', 'All Sofas'],
    collectionsDescription:
      'sample, sample, sample, sample, Enjoy 15% off storewide using: MIDYEAR15 from 1 June to 30 June 2026.  Promo code cannot beExplore made-to-order sofas crafted with warm materials, refined proportions, and customizable details.',
    pageTitle: 'All Sofas',
    filterSortLabel: 'Filter & Sort',
  },
  footer: {
    logoAlt: 'Sofamisu',
    description:
      'Warm luxury furniture, made to order with refined proportions and quiet Scandinavian detail.',
    navigationTitle: 'Navigation',
    navigationLinks: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'Collections',
        href: '/collections',
      },
      {
        label: 'FAQ',
        href: '/faq',
      },
    ],
    contactTitle: 'Contact',
    contactLinks: [
      {
        label: 'WhatsApp placeholder',
        href: 'https://wa.me/',
      },
      {
        label: 'Email placeholder',
        href: 'mailto:hello@sofamisu.com',
      },
      {
        label: 'Instagram placeholder',
        href: 'https://instagram.com',
      },
    ],
    copyright: '© 2026 Sofamisu. All rights reserved.',
    legalLinks: [
      {
        label: 'Privacy Policy',
        href: '/privacy-policy',
      },
      {
        label: 'Terms of Service',
        href: '/terms-of-service',
      },
    ],
  },
  faq: {
    breadcrumb: ['Home', 'FAQ'],
    title: 'FAQ',
    categories: [
      {
        title: 'Ordering',
        items: [
          {
            question: 'How do I place an order?',
            answer:
              'Placeholder answer for ordering. This content can be edited later.',
          },
          {
            question: 'Can I customize my sofa?',
            answer:
              'Placeholder answer for customization. This content can be edited later.',
          },
          {
            question: 'Can I secure my order with a deposit?',
            answer:
              'Placeholder answer for deposit orders. This content can be edited later.',
          },
        ],
      },
      {
        title: 'Delivery',
        items: [
          {
            question: 'Is delivery included?',
            answer:
              'Placeholder answer for delivery. This content can be edited later.',
          },
          {
            question: 'How long does delivery take?',
            answer:
              'Placeholder answer for delivery timing. This content can be edited later.',
          },
          {
            question: 'Do you deliver to apartments?',
            answer:
              'Placeholder answer for apartment delivery. This content can be edited later.',
          },
        ],
      },
      {
        title: 'Care',
        items: [
          {
            question: 'How should I care for leather?',
            answer:
              'Placeholder answer for leather care. This content can be edited later.',
          },
          {
            question: 'Can I clean the sofa myself?',
            answer:
              'Placeholder answer for cleaning. This content can be edited later.',
          },
          {
            question: 'What if my sofa needs repair?',
            answer:
              'Placeholder answer for repairs. This content can be edited later.',
          },
        ],
      },
    ],
  },
} as const
