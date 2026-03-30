import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: 'Avyronis — Vi bygger nettsider som gjør besøkende til kunder',
  description:
    'Vi bygger nettsider som gjør besøkende til kunder – ikke bare pent design. Branding, strategi og webutvikling for ambisiøse grunnleggere.',
  openGraph: {
    title: 'Avyronis',
    description: 'Vi bygger nettsider som gjør besøkende til kunder – ikke bare pent design.',
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
