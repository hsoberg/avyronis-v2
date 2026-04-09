import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import TextSection from '@/components/TextSection'
import ProofSection from '@/components/ProofSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import ProblemSolutionSection from '@/components/ProblemSolutionSection'
import PricingSection from '@/components/PricingSection'
import LogoTicker from '@/components/LogoTicker'
import WorkGrid from '@/components/WorkGrid'
import ServicesSection from '@/components/ServicesSection'
import Testimonial from '@/components/Testimonial'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import ScrollAnimations from '@/components/ScrollAnimations'
import CTASection from '@/components/CTASection'

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://avyronis.com/#organization",
  "name": "Avyronis",
  "url": "https://avyronis.com",
  "logo": "https://avyronis.com/favicon.ico",
  "description": "Avyronis hjelper norske tjenestebaserte bedrifter med å gjøre trafikk om til kunder gjennom datadrevet konverteringsoptimalisering (CRO), SEO og webutvikling. Ingen binding – vi beholder kunder fordi vi leverer resultater.",
  "foundingDate": "2024",
  "areaServed": {
    "@type": "Country",
    "name": "Norway",
    "identifier": "NO"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NO"
  },
  "knowsAbout": ["Konverteringsoptimalisering", "CRO", "SEO", "A/B-testing", "Nettside-analyse", "Webutvikling", "Next.js"],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "henning@avyronis.com",
    "contactType": "customer service",
    "availableLanguage": "Norwegian"
  }
}

const jsonLdService = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Konverteringsoptimalisering og SEO for norske bedrifter",
  "provider": { "@type": "Organization", "name": "Avyronis" },
  "description": "Vi analyserer nettsiden din og implementerer kontinuerlige forbedringer basert på data og brukeradferd for å øke antall leads og salg. For norske tjenestebaserte bedrifter som ønsker mer ut av trafikken de allerede har.",
  "areaServed": "NO",
  "serviceType": "Konverteringsoptimalisering"
}

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hva får jeg egentlig i en gratis gjennomgang?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Du får en konkret gjennomgang av nettsiden din med tydelige forslag til hva som bør forbedres for å få flere kunder. Vi viser deg nøyaktig hva som ikke fungerer, hva som kan forbedres og hva du bør gjøre videre. Ingen generelle råd – kun det som faktisk gir effekt."
      }
    },
    {
      "@type": "Question",
      "name": "Er dette binding eller lang kontrakt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nei. Det er ingen binding. Du kan stoppe når som helst. Vi beholder kunder fordi vi leverer resultater – ikke fordi vi låser deg til en avtale."
      }
    },
    {
      "@type": "Question",
      "name": "Hvor raskt kan jeg forvente resultater?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mange ser forbedringer raskt – spesielt når vi retter opp tydelige problemer på siden. Samtidig jobber vi kontinuerlig for å skape stabil vekst over tid, ikke bare kortsiktige løft."
      }
    },
    {
      "@type": "Question",
      "name": "Må jeg gjøre noe selv?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Det er helt opp til deg. Du får konkrete tiltak du kan implementere selv, eller vi kan håndtere alt for deg. De fleste velger at vi gjør jobben – men du har full fleksibilitet."
      }
    },
    {
      "@type": "Question",
      "name": "Passer dette for min bedrift?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dette fungerer best for norske bedrifter som allerede har trafikk, men som ønsker flere kunder ut av den. Er du usikker, finner vi raskt ut av det i gjennomgangen."
      }
    },
    {
      "@type": "Question",
      "name": "Hva skiller dere fra andre byråer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De fleste byråer leverer et design og sender en faktura. Vi jobber annerledes: alt vi gjør er basert på data og faktisk brukeradferd, vi måler konverteringer ikke bare besøk, og vi jobber kontinuerlig med forbedringer. Ingen binding – vi beholder kunder fordi vi leverer resultater."
      }
    },
    {
      "@type": "Question",
      "name": "Hva koster konverteringsoptimalisering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vi har faste pakker tilpasset ulike behov – fra enkeltanalyser til løpende månedlig samarbeid. Prisen avhenger av hva du trenger og hvilket ambisjonsnivå du har. Vi gir deg et konkret tilbud etter gjennomgangen."
      }
    }
  ]
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <ScrollAnimations />
      <Nav />

      <main>
        <Hero />


        <ProblemSolutionSection />

        <ProofSection />
        <HowItWorksSection />

        <PricingSection />

        <FAQSection />

        <Testimonial />

        <CTASection />

      </main>

      <Footer />
    </>
  )
}
