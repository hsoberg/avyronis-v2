import type { Metadata } from 'next'
import HenningPage from './HenningPage'

export const metadata: Metadata = {
  title: 'Henning Navrud-Søberg — AI Power User',
  description:
    'How Henning Navrud-Søberg uses AI day to day: agentic CLI tools, LLM integrations, prompt engineering, and multi-agent workflows.',
  alternates: {
    canonical: 'https://henning.avyronis.com/',
  },
  openGraph: {
    title: 'Henning Navrud-Søberg — AI Power User',
    description:
      'How Henning Navrud-Søberg uses AI day to day: agentic CLI tools, LLM integrations, prompt engineering, and multi-agent workflows.',
    type: 'profile',
  },
}

export default function Page() {
  return <HenningPage />
}
