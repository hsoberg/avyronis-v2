import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Vilkår og forretningsbetingelser | Avyronis',
  description: 'Vilkår for oppdrag, utvikling, drift og bruk av Avyronis sine tjenester.',
}

export default function Vilkar() {
  return (
    <>
      <Nav />
      <main style={{ maxWidth: '840px', margin: '0 auto', padding: '140px 24px 80px', color: 'var(--color-off-white)' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 600, color: 'var(--color-white)', marginBottom: '24px' }}>
          Vilkår og forretningsbetingelser
        </h1>
        <p style={{ color: 'var(--color-muted-70)', marginBottom: '32px', fontSize: '16px', lineHeight: 1.6 }}>
          Sist oppdatert: {new Date().getFullYear()}. Disse vilkårene gjelder for utvikling av nettsider, månedlige driftsavtaler, rådgivning og bruk av avyronis.com.
        </p>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-white)', marginBottom: '16px' }}>
            1. Oppdrag og Utvikling (Basispakke)
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: 1.7, color: 'var(--color-muted-70)' }}>
            <li><strong>Leveranse:</strong> Basispakken omfatter inntil 4 standardsider, responsivt design, kontaktskjema, grunnleggende teknisk SEO, oppsett av Google Search Console/Analytics, SSL-sertifikat og én samlet korrekturrunde før lansering.</li>
            <li><strong>Ekstra sider:</strong> Sider utover de 4 inkluderte faktureres med 1 500 kr eks. mva per side med mindre annet er skriftlig avtalt.</li>
            <li><strong>Innholdslevering:</strong> Kunden er ansvarlig for å levere ferdig tekst, logoer og bilder i tide. Tekstforfatting eller innholdsproduksjon fra Avyronis prises som eget oppdrag.</li>
            <li><strong>Spesialfunksjoner:</strong> Avanserte integrasjoner, bookingsystemer og nettbutikkløsninger prises separat eller etter fast timepris på 990 kr eks. mva.</li>
            <li><strong>Betaling for oppstart:</strong> 50 % forhåndsfaktureres ved prosjektoppstart, og 50 % faktureres før offisiell publisering/overlevering.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-white)', marginBottom: '16px' }}>
            2. Månedlige Drifts- og Vekstavtaler
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: 1.7, color: 'var(--color-muted-70)' }}>
            <li><strong>Abonnementsnivåer:</strong> Avtaler inngås på nivåene <em>Trygghet</em> (990 kr/mnd), <em>Synlighet</em> (1 490 kr/mnd) eller <em>Vekst</em> (2 990 kr/mnd), alle priser eks. mva.</li>
            <li><strong>Fakturering:</strong> Avtalen faktureres månedlig forskuddsvis, eller årlig forskuddsvis med 2 måneder gratis (17 % rabatt).</li>
            <li><strong>Ingen bindingstid:</strong> Løpende avtaler kan sies opp skriftlig med virkning fra utløpet av inneværende fakturaperiode.</li>
          </ul>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-white)', marginBottom: '16px' }}>
            3. De 4 gylne forretningsreglene
          </h2>
          <ol style={{ listStyle: 'decimal', paddingLeft: '20px', lineHeight: 1.7, color: 'var(--color-muted-70)' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>«Use it or lose it» (Ingen overføring av timer/aktiviteter):</strong> Inkluderte månedlige oppdateringer (f.eks. inntil 30 min i Trygghet eller vekstaktiviteter i Vekst) må benyttes innenfor gjeldende kalendermåned. Ubrukte oppgaver nullstilles ved månedsslutt og kan ikke akkumuleres.
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Hybridmodellen for ekstraarbeid:</strong> Abonnementsprisen dekker spesifisert drift og vedlikehold. Nye store moduler, kampanjer eller større endringer faktureres separat som prosjekt eller til fast timepris på 990 kr eks. mva.
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Fullt eierskap:</strong> Kunden eier sitt eget domene, nettside og innhold etter at oppstartsfakturaen er betalt. Ved oppsigelse står kunden fritt til å flytte nettsiden.
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Automatisert og stabil drift:</strong> Driftsavtaler baseres på automatiserte sikkerhets- og backup-rutiner for å sikre maksimal oppetid, sikkerhet og stabilitet.
            </li>
          </ol>
        </section>

        <section style={{ marginBottom: '36px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-white)', marginBottom: '16px' }}>
            4. Generelle ansvarsbegrensninger
          </h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '20px', lineHeight: 1.7, color: 'var(--color-muted-70)' }}>
            <li>Avyronis tilstreber kontinuerlig drift, men er ikke erstatningsansvarlig for indirekte tap, tapt fortjeneste eller tredjeparts driftsavbrudd (f.eks. hos hosting- eller domeneleverandører).</li>
            <li>Lenker til eksterne tredjepartstjenester er kun til informasjon og er utenfor vår kontroll.</li>
          </ul>
        </section>

        <p style={{ marginTop: '40px', fontSize: '15px', color: 'var(--color-muted-70)' }}>
          Spørsmål om avtaler eller vilkår? Kontakt oss på{' '}
          <a href="mailto:henning@avyronis.com" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
            henning@avyronis.com
          </a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
