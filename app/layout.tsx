import type { Metadata } from 'next';
import './globals.css';
import { MobileBottomNav } from '../src/components/primitives/MobileBottomNav';

export const metadata: Metadata = {
  title: {
    default: 'Zoe Elpis Global School | Purpose • Leadership • Business • Impact',
    template: '%s | Zoe Elpis Global School'
  },
  description: 'Zoe Elpis Global School equips individuals, entrepreneurs, leaders and changemakers with practical knowledge, skills and tools to discover purpose, develop leadership capacity, build value and create sustainable impact.',
  metadataBase: new URL('https://zegs.ac.ug'),
  openGraph: {
    title: 'Zoe Elpis Global School',
    description: 'Discover Purpose • Build Value • Create Impact. Institutional education, leadership and enterprise-development school in East Africa.',
    url: 'https://zegs.ac.ug',
    siteName: 'Zoe Elpis Global School',
    images: [
      {
        url: '/brand/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Zoe Elpis Global School'
      }
    ],
    locale: 'en_UG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zoe Elpis Global School',
    description: 'Discover Purpose • Build Value • Create Impact.',
    images: ['/brand/og-default.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Zoe Elpis Global School',
    alternateName: 'ZEGS',
    url: 'https://zegs.ac.ug',
    logo: 'https://zegs.ac.ug/brand/zegs-logo-primary.svg',
    description: 'Zoe Elpis Global School is a purpose-driven learning and development institution focused on Purpose, Leadership, Business and Impact.',
    slogan: 'Discover Purpose • Build Value • Create Impact',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kampala',
      addressRegion: 'Central',
      addressCountry: 'UG'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--color-paper-50)] text-[var(--color-ink-900)] font-sans antialiased pb-16 lg:pb-0" suppressHydrationWarning>
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
