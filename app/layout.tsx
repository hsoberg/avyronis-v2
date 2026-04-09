import type { Metadata } from 'next'
import './globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: 'Avyronis — Få 2–5x flere kunder fra nettsiden din',
  description:
    'Avyronis hjelper norske bedrifter med å gjøre trafikk om til kunder gjennom datadrevet CRO og SEO. Ingen binding – vi leverer resultater, ikke løfter.',
  openGraph: {
    title: 'Avyronis — Få 2–5x flere kunder fra nettsiden din',
    description: 'Datadrevet konverteringsoptimalisering og SEO for norske bedrifter. Ingen binding – vi leverer resultater, ikke løfter.',
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
