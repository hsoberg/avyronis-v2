import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import OutcomesSection from '@/components/OutcomesSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import ProblemSolutionSection from '@/components/ProblemSolutionSection'
import OwnershipSection from '@/components/OwnershipSection'
import WhyAvyronisSection from '@/components/WhyAvyronisSection'
import PricingSection from '@/components/PricingSection'
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
  "description": "Avyronis bygger, drifter og videreutvikler nettsider for norske bedrifter. Én leverandør fra første samtale til løpende forbedring – vi bygger nettsiden, lanserer den og fortsetter å gjøre den bedre over tid. Ingen bindingstid.",
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
  "knowsAbout": ["Webdesign", "Webutvikling", "Nettsidedrift", "Vedlikehold av nettsider", "SEO", "AEO", "Konverteringsoptimalisering", "Next.js"],
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
  "name": "Nettside, drift og løpende forbedring for norske bedrifter",
  "provider": { "@type": "Organization", "name": "Avyronis" },
  "description": "Vi bygger nettsiden rundt bedriften og kundene dine, lanserer den med måling og søkemotoroppsett på plass, og følger den opp med drift, synlighet og konkrete forbedringer etterpå. For norske bedrifter som ønsker én leverandør til å bygge, drifte og videreutvikle nettsiden.",
  "areaServed": "NO",
  "serviceType": "Webdesign og nettsidedrift"
}

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Hva får jeg i en uforpliktende vurdering?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Du forteller oss litt om bedriften, dagens nettside og hva du ønsker å få til. Deretter får du en konkret anbefaling tilbake. Vi ser på hva nettsiden bør gjøre bedre, hva som er viktigst å ta først, og hva som er riktig neste steg for dere. Ingen ferdig salgspakke – vi anbefaler ikke noe før vi har forstått behovet."
      }
    },
    {
      "@type": "Question",
      "name": "Er dette binding eller lang kontrakt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nei. Det er ingen bindingstid på drift. Du kan stoppe når som helst, og du eier nettsiden, domenet og innholdet 100 %. Vi beholder kunder fordi vi følger dem opp – ikke fordi vi låser dem til en avtale."
      }
    },
    {
      "@type": "Question",
      "name": "Hvor lang tid tar det å få en ny nettside?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "En typisk nettside er klar på tre til fire uker fra vi starter. Tiden går med til å forstå bedriften og kundene, bygge struktur, innhold og design, og deretter lansere med måling og søkemotoroppsett på plass. Større prosjekter med mange sider eller integrasjoner tar lengre tid – det avklarer vi før vi starter."
      }
    },
    {
      "@type": "Question",
      "name": "Må jeg gjøre noe selv?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Du trenger ikke å bli webansvarlig. Vi trenger innspill om bedriften, tjenestene og kundene dine i starten. Etter lansering sender du behovet til oss, så håndterer vi det. Vil du gjøre endringer selv, legger vi til rette for det."
      }
    },
    {
      "@type": "Question",
      "name": "Passer dette for min bedrift?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dette passer for bedrifter som trenger en ny nettside, har en utdatert side, eller har en side som ikke gjør jobben den skal. Du trenger ikke å ha mye trafikk fra før, og du trenger ikke å kunne noe om SEO eller konvertering. Det er vår jobb."
      }
    },
    {
      "@type": "Question",
      "name": "Må jeg ha et abonnement?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nei. Du kan kjøpe kun nettsiden, og så drifte den selv. Abonnementet finnes for deg som ikke ønsker å administrere nettsiden selv – som vil at hosting, oppdateringer, synlighet og forbedringer blir tatt hånd om uten at du må følge med. De fleste velger oppfølging, men det er ikke et krav."
      }
    },
    {
      "@type": "Question",
      "name": "Hva skiller dere fra andre byråer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "De fleste byråer bygger nettsiden, sender en faktura og går videre. Et par år senere er siden utdatert, og du starter på nytt. Vi blir igjen etter lansering og følger opp nettsiden videre, du snakker direkte med den som gjør jobben, vi måler hvordan siden blir funnet og brukt og forbedrer den løpende, og det er ingen bindingstid, faste priser og fullt eierskap for deg. Kort sagt: andre bygger nettsiden og går videre. Vi bygger den – og blir igjen."
      }
    },
    {
      "@type": "Question",
      "name": "Hva koster det?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vi skiller mellom å bygge nettsiden og å følge den opp etterpå. Først bygger vi nettsiden: fra 9 900 kr eks. mva, som inkluderer inntil 4 sider, responsivt design, kontaktskjema, SEO og analyseoppsett. Omfang og pris avtales etter at vi har sett på behovet. Etter lansering velger du oppfølging: Trygghet 990 kr/mnd, Synlighet 1 490 kr/mnd eller Vekst 2 990 kr/mnd. Ved årlig fakturering får du 2 måneder gratis. Ingen bindingstid, 100 % eierskap til domene og innhold, og fast timepris på 990 kr eks. mva for eventuelt ekstraarbeid."
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
        {/* 1. Hero */}
        <Hero />

        {/* 2. Problemet kunden kjenner igjen */}
        <ProblemSolutionSection />

        {/* 3. Avyronis-modellen: Forstå → Bygge → Lansere → Forbedre */}
        <HowItWorksSection />

        {/* 4. Hva nettsiden skal gjøre */}
        <OutcomesSection />

        {/* 5. Du slipper å bli webansvarlig */}
        <OwnershipSection />

        {/* 6. Priser: bygg → drift */}
        <PricingSection />

        {/* 7. Hvorfor Avyronis */}
        <WhyAvyronisSection />

        {/* 8. FAQ */}
        <FAQSection />

        {/* 9. Avsluttende CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  )
}
