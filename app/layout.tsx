import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: 'Avyronis — Vi bygger nettsiden din. Så gjør vi den bedre over tid.',
  description:
    'Avyronis bygger, drifter og videreutvikler nettsider for norske bedrifter. Én leverandør fra første samtale til løpende forbedring – uten bindingstid.',
  openGraph: {
    title: 'Avyronis — Vi bygger nettsiden din. Så gjør vi den bedre over tid.',
    description: 'Vi bygger, drifter og videreutvikler nettsiden din. Én leverandør hele veien – uten bindingstid.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no">
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
