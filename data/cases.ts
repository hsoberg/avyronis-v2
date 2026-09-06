export interface CaseStudy {
  slug: string
  title: string
  industry: string
  type: string
  resultMetric: string
  resultLabel: string
  isNewSite?: boolean
  liveUrl?: string
  desktopImage?: string
  mobileImage?: string
  fullWidthImage?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'aktiv-helse',
    title: 'Aktiv Helse',
    industry: 'Fysioterapi',
    type: 'Lokal bedrift',
    resultMetric: 'Fra oppslagstavle',
    resultLabel: 'til booking i tre steg',
    liveUrl: 'https://aktivhelse.vercel.app/',
    fullWidthImage: '/hf_20260410_094220_669317af-37a3-455e-b975-8cfb9dda9d6f.png',
  },
  {
    slug: 'spyle-rorleggervakta',
    title: 'Spyle & Rørleggervakta',
    industry: 'Håndverker / rørlegger',
    type: 'Tjeneste',
    resultMetric: 'Bygget',
    resultLabel: 'for akutte behov',
    isNewSite: true,
  },
  {
    slug: 'kaffe1',
    title: 'Kaffe1 AS',
    industry: 'Kafé / servering',
    type: 'B2B / Bedrift',
    resultMetric: 'Fra produktkatalog',
    resultLabel: 'til B2B-partner',
    liveUrl: 'https://kaffe1.vercel.app/',
    desktopImage: '/cases/kaffe1-desktop.png',
    mobileImage: '/cases/kaffe1-mobile.png',
  },
]
