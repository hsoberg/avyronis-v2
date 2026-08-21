import type { Metadata } from 'next'
import HenningPage from './HenningPage'

const title = 'Henning Navrud-Søberg — AI, produkt, markedsføring og teknologi'
const description = 'Henning Navrud-Søberg bygger AI-workflows, digitale produkter, prototyper og kundereiser i skjæringspunktet mellom AI, produktutvikling, markedsføring, UX/CRO og teknologi.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'Henning Navrud-Søberg',
    'AI Norge',
    'AI workflows',
    'AI automation',
    'AI product development',
    'produktutvikling',
    'digital markedsføring',
    'UX',
    'CRO',
    'rapid prototyping',
  ],
  alternates: {
    canonical: 'https://henning.avyronis.com/',
  },
  openGraph: {
    title,
    description,
    url: 'https://henning.avyronis.com/',
    siteName: 'Henning Navrud-Søberg',
    type: 'profile',
    locale: 'nb_NO',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Henning Navrud-Søberg',
  url: 'https://henning.avyronis.com/',
  sameAs: ['https://github.com/hsoberg', 'https://avyronis.com/'],
  knowsAbout: [
    'Artificial intelligence',
    'AI workflows',
    'AI automation',
    'Product development',
    'Digital marketing',
    'User experience',
    'Conversion rate optimization',
    'Rapid prototyping',
    'Next.js',
  ],
  description,
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HenningPage />
    </>
  )
}
