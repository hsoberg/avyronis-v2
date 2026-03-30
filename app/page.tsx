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

export default function Home() {
  return (
    <>
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
