export interface CaseStudy {
  slug: string
  title: string
  industry: string
  type: string
  resultMetric: string
  resultLabel: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'aktiv-helse',
    title: 'Aktiv Helse',
    industry: 'Fysioterapi',
    type: 'Lokal bedrift',
    resultMetric: '+68%',
    resultLabel: 'Flere henvendelser',
  },
  {
    slug: 'spyle-rorleggervakta',
    title: 'Spyle & Rørleggervakta',
    industry: 'Håndverker / rørlegger',
    type: 'Tjeneste',
    resultMetric: '2.1x',
    resultLabel: 'Flere kundehenvendelser',
  },
  {
    slug: 'kaffe1',
    title: 'Kaffe1 AS',
    industry: 'Kafé / servering',
    type: 'Lokal bedrift',
    resultMetric: '+40–60%',
    resultLabel: 'Flere henvendelser',
  },
]
