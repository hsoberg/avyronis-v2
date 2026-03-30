import React from "react";

export interface FAQItem {
  q: string;
  a: string;
}

export interface InsightArticle {
  id: number;
  slug: string;
  tag: string;
  title: string;
  description?: string;
  excerpt: string;
  lead: string;
  date: string;
  dateIso?: string;
  read: string;
  featured?: boolean;
  content: React.ReactNode;
  faqItems: FAQItem[];
  ctaTitle: string;
  ctaText: string;
}

export const insights: InsightArticle[] = [
  {
    id: 1,
    slug: "hvorfor-vises-ikke-bedriften-din-paa-google",
    tag: "SEO",
    title: "Hvorfor vises ikke bedriften din på Google — og hva du kan gjøre med det i dag",
    description: "De fleste lokale bedrifter er usynlige på Google uten å vite det. Denne guiden viser deg nøyaktig hva som holder deg tilbake — og hva du kan fikse selv.",
    excerpt: "De fleste lokale bedrifter er usynlige på Google uten å vite det. Denne guiden viser deg nøyaktig hva som holder deg tilbake — og hva du kan fikse selv.",
    lead: "De fleste lokale bedrifter er usynlige på Google — uten å vite det. Kunder søker, finner ikke deg, og velger en konkurrent. Denne guiden viser deg nøyaktig hva som skjer og hva du kan gjøre med det.",
    date: "12. mars 2025",
    dateIso: "2025-03-12",
    read: "8 min",
    featured: true,
    content: (
      <>
        <h2 className="insight-h2">Problemet de fleste ikke ser</h2>
        <p className="insight-p">Tenk deg at 50 personer i dag søker etter det du tilbyr i ditt område. Hvor mange av dem finner deg? Hvis svaret er &ldquo;veldig få&rdquo; eller &ldquo;vet ikke&rdquo; — er det et problem som koster deg kunder hver eneste dag.</p>
        <p className="insight-p">Google bruker over 200 faktorer for å bestemme hvem som vises i søkeresultatene. De fleste bedrifter oppfyller ikke de viktigste — ikke fordi de gjør noe galt, men fordi ingen har fortalt dem hva som faktisk teller.</p>

        <div className="insight-fact">
          <div className="insight-fact__label">Visste du?</div>
          <h3 className="insight-h3" style={{marginTop: 0}}>Slik bruker folk Google</h3>
          <ul className="insight-ul">
            <li>76 % av folk som søker lokalt på mobil besøker en bedrift innen 24 timer</li>
            <li>De 3 øverste resultatene på Google får over 75 % av alle klikk</li>
            <li>46 % av alle Google-søk har lokal intensjon — folk leter etter noe nær seg</li>
            <li>88 % stoler på Google-anmeldelser like mye som personlige anbefalinger</li>
          </ul>
        </div>

        <h2 className="insight-h2">De 5 vanligste grunnene til at du ikke vises</h2>

        <h3 className="insight-h3">1. Google vet ikke hvem du er eller hvor du holder til</h3>
        <p className="insight-p">Google Business Profile (GBP) er den gratis profilen som gjør at bedriften din vises på Google Maps og i lokale søk. Uten en oppdatert og bekreftet profil er du i praksis usynlig for lokale kunder. Dette er det første du bør sjekke.</p>

        <div className="insight-highlight">
          <p>NAP-konsistens betyr at navn, adresse og telefonnummer (Name, Address, Phone) er identiske overalt — på nettsiden, i GBP, i kataloger og på sosiale medier. Ulik informasjon forvirrer Google og svekker rangeringen din.</p>
        </div>

        <h3 className="insight-h3">2. Nettsiden din mangler grunnleggende SEO</h3>
        <p className="insight-p">Titler, metabeskrivelser, overskriftsstruktur (H1, H2, H3) og innhold som svarer på det folk faktisk søker etter — dette er det Google leser når den bestemmer hvem som fortjener å vises. Mange nettsider er bygget uten disse elementene på plass.</p>

        <h3 className="insight-h3">3. Nettsiden er treg eller fungerer dårlig på mobil</h3>
        <p className="insight-p">Google måler hastighet og mobilvennlighet gjennom Core Web Vitals. En side som tar mer enn 3 sekunder å laste mister over halvparten av mobilbrukerne — og Google straffer trege sider med lavere rangering.</p>

        <h3 className="insight-h3">4. Du har lite eller ingen innhold</h3>
        <p className="insight-p">Google vil gi brukerne sine de beste svarene. Hvis nettsiden din ikke inneholder informasjon om hva du gjør, hvem du gjør det for og hvor du holder til — har Google lite å jobbe med. Innhold er drivstoffet i SEO-motoren.</p>

        <h3 className="insight-h3">5. Du har få eller ingen anmeldelser</h3>
        <p className="insight-p">Anmeldelser på Google er et av de sterkeste signalene for lokal synlighet. Bedrifter med mange gode anmeldelser rangerer høyere og får flere klikk. Det er ikke tilfeldigheter — det er et system du kan jobbe aktivt med.</p>

        <div className="insight-fact">
          <div className="insight-fact__label">Sjekkliste</div>
          <h3 className="insight-h3" style={{marginTop: 0}}>Fem ting du kan gjøre denne uken</h3>
          <ul className="insight-ul">
            <li>Opprett eller oppdater Google Business Profile med riktig navn, adresse og telefonnummer</li>
            <li>Last opp bilder av bedriften, produkter eller tjenester i GBP</li>
            <li>Send tre tidligere kunder en lenke til Google-anmeldelsen din og be dem skrive noe</li>
            <li>Sjekk at nettsiden din laster under 3 sekunder på mobil (bruk Google PageSpeed Insights)</li>
            <li>Legg til en H1-tittel og metabeskrivelse på alle sider som mangler det</li>
          </ul>
        </div>

        <h2 className="insight-h2">Hva skjer når du fikser dette?</h2>
        <p className="insight-p">Bedrifter som tar tak i disse fem punktene ser som regel merkbar fremgang innen 30–90 dager. Det handler ikke om magi — det handler om å gi Google det den trenger for å forstå hvem du er og hvem du er relevant for.</p>
        <p className="insight-p">Den gode nyheten er at konkurrentene dine sannsynligvis har de samme manglene. Lokal SEO handler ikke alltid om å være perfekt — det handler om å være bedre enn de andre i ditt område.</p>

        <div className="insight-highlight">
          <p>SEO er ikke et engangstiltak — det er en investering du bygger over tid. Jo lenger du venter med å starte, jo lengre tid tar det å nå toppen.</p>
        </div>
      </>
    ),
    faqItems: [
      { q: "Hvor lang tid tar det å komme opp på Google?", a: "For lokal SEO — synlighet i Google Maps og lokale søk — ser de fleste resultater innen 30–90 dager. Organisk SEO på konkurranseutsatte søketermer tar ofte 3–6 måneder. Jo mer du investerer i innhold og teknisk optimalisering, jo raskere går det." },
      { q: "Trenger jeg å betale for Google Search Ads for å vises?", a: "Nei. Organisk synlighet er gratis — du betaler med tid og innsats, ikke per klikk. Google Search Ads kan gi rask synlighet mens du bygger organisk, men det er et supplement, ikke et krav. Organisk trafikk er mer bærekraftig på sikt fordi den ikke stopper når du slutter å betale." },
      { q: "Hva er Google Business Profile?", a: "Google Business Profile (tidligere Google My Business) er en gratis profil som lar bedriften din vises i Google Maps og i det lokale søkepanelet (de tre boksene som vises øverst i søkeresultatene). Det er et av de viktigste og raskeste tiltakene du kan gjøre for lokal synlighet." },
      { q: "Kan jeg gjøre SEO selv eller trenger jeg hjelp?", a: "De grunnleggende tiltakene — Google Business Profile, NAP-konsistens, anmeldelser og enkle tekniske fikser — kan du gjøre selv. Mer avansert SEO som innholdsstrategi, teknisk optimalisering og konkurranseanalyse krever mer kunnskap og tid, og de fleste bedriftseiere ser bedre resultater med profesjonell hjelp." },
    ],
    ctaTitle: "Vil du vite hva som holder nettsiden din tilbake?",
    ctaText: "Vi gjennomgår nettsiden din gratis — SEO, hastighet og synlighet — og gir deg konkrete tilbakemeldinger du kan bruke med en gang.",
  },

  {
    id: 2,
    slug: "5-grunner-besokende-forlater-nettsiden",
    tag: "Konvertering",
    title: "5 grunner til at besøkende forlater nettsiden din uten å ta kontakt",
    description: "Du har trafikken, men ingen ringer. Her er de 5 vanligste grunnene til at besøkende forlater nettsiden uten å ta kontakt — og hva du kan gjøre med det.",
    excerpt: "Du har trafikken. Men ingen ringer. Her er hva som skjer — og hvordan du stopper det.",
    lead: "Du har trafikken. Folk finner nettsiden din. Men telefonen ringer ikke. Kontaktskjemaet er tomt. Det er et av de mest frustrerende problemene en bedriftseier kan oppleve — og det er nesten alltid løsbart.",
    date: "5. mars 2025",
    dateIso: "2025-03-05",
    read: "6 min",
    content: (
      <>
        <h2 className="insight-h2">Trafikk er ikke det samme som kunder</h2>
        <p className="insight-p">Mange tror at problemet er mangel på besøkende. Men ofte er problemet at nettsiden ikke klarer å overbevise de besøkende som allerede er der. Konverteringsoptimalisering — å gjøre besøkende til kunder — er like viktig som å skaffe trafikk.</p>
        <p className="insight-p">Her er de fem vanligste grunnene vi ser når vi gjennomgår nettsider som ikke konverterer.</p>

        <div className="insight-step">
          <div className="insight-step__num">01</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Det er ikke tydelig hva du tilbyr og for hvem</h3>
            <p className="insight-p">En besøkende bruker 3–5 sekunder på å bestemme om de er på riktig sted. Hvis det ikke er krystallklart hva du gjør, hvem du hjelper og hvor du holder til — forsvinner de. Unngå vage slagord som &ldquo;din partner for fremtiden&rdquo;. Vær konkret: &ldquo;Rørlegger i Drammen — tilbud innen 2 timer.&rdquo;</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">02</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Det finnes ingen tydelig CTA — oppfordring til handling</h3>
            <p className="insight-p">CTA (Call to Action) er knappen eller lenken som forteller besøkende hva de skal gjøre videre. Mange nettsider har kontaktinformasjon gjemt i footer, men ingen synlig knapp øverst på siden. Regel: det skal alltid være én tydelig handling tilgjengelig — uansett hvor på siden besøkende befinner seg.</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">03</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Siden bygger ikke nok tillit</h3>
            <p className="insight-p">Folk kjøper av dem de stoler på. Uten anmeldelser, kundecaser, bilder av deg og teamet, eller tydelig kontaktinformasjon — er du en fremmed. Tillitssignaler som Google-anmeldelser, sertifiseringer og et ansikt bak bedriften reduserer frykten for å ta kontakt med en ukjent.</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">04</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Nettsiden er treg eller fungerer dårlig på mobil</h3>
            <p className="insight-p">Over 60 % av nettsidetrafikk kommer fra mobiltelefoner. En side som ikke er tilpasset mobil, er vanskelig å navigate, har for liten tekst eller tar lang tid å laste — mister disse besøkende umiddelbart. Google straffer det også i søkerangeringen.</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">05</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Kontaktprosessen er for komplisert</h3>
            <p className="insight-p">Lange skjemaer med mange obligatoriske felt, ingen synlig telefonnummer, eller kun e-post som kontaktalternativ — alt dette øker friksjonen. Jo enklere du gjør det å ta kontakt, jo flere gjør det. En enkel knapp med &ldquo;Ring oss nå&rdquo; kan gjøre stor forskjell.</p>
          </div>
        </div>

        <div className="insight-fact">
          <div className="insight-fact__label">Oppsummering</div>
          <h3 className="insight-h3" style={{marginTop: 0}}>Slik øker du konverteringen raskt</h3>
          <ul className="insight-ul">
            <li>Skriv en tydelig H1-overskrift som sier hva du gjør og for hvem</li>
            <li>Legg en synlig CTA-knapp øverst på siden — ikke bare i footer</li>
            <li>Vis 3–5 Google-anmeldelser direkte på forsiden</li>
            <li>Legg til bilde av deg selv eller teamet med navn og tittel</li>
            <li>Reduser kontaktskjemaet til maks 3 felt: navn, telefon, melding</li>
          </ul>
        </div>

        <h2 className="insight-h2">Hva er en god konverteringsrate?</h2>
        <p className="insight-p">For lokale servicebedrifter regnes 2–5 % som bra. Det betyr at 2–5 av 100 besøkende tar kontakt. Mange bedrifter vi gjennomgår ligger under 1 %. Å doble konverteringsraten fra 1 % til 2 % betyr dobbelt så mange henvendelser — uten å bruke mer på markedsføring.</p>

        <div className="insight-highlight">
          <p>De raskeste gevinstene innen konvertering koster ingenting — det handler om å fjerne hindringer, ikke legge til ting. Begynn med det du allerede har.</p>
        </div>
      </>
    ),
    faqItems: [
      { q: "Hva er en god konverteringsrate for en nettside?", a: "For lokale servicebedrifter regnes 2–5 % som bra. Det betyr at 2–5 av 100 besøkende tar kontakt. Mange bedrifter ligger under 1 %, noe som er et klart tegn på at nettsiden ikke gjør jobben sin." },
      { q: "Hva betyr CTA?", a: "CTA står for Call to Action — en tydelig oppfordring til handling. Eksempler er \"Ring oss\", \"Få et tilbud\" eller \"Book time\". En god CTA forteller besøkende nøyaktig hva de skal gjøre videre, og er synlig uten at man trenger å scrolle." },
      { q: "Hvor raskt kan jeg se resultater av konverteringsoptimalisering?", a: "Mange enkle tiltak — som å legge til en tydelig CTA-knapp eller vise anmeldelser — kan gi merkbar effekt innen dager. Mer systematiske forbedringer som A/B-testing tar lengre tid, men gir sikrere resultater." },
    ],
    ctaTitle: "Konverterer nettsiden din godt nok?",
    ctaText: "Vi gjennomgår nettsiden din gratis og forteller deg hva som holder besøkende tilbake fra å ta kontakt.",
  },

  {
    id: 3,
    slug: "hva-koster-en-nettside",
    tag: "Strategi",
    title: "Hva koster en nettside egentlig — og hva bør du forvente å få?",
    description: "En ærlig gjennomgang av hva en nettside koster i Norge, hva som påvirker prisen og når det lønner seg å investere mer enn minimumsløsningen.",
    excerpt: "En ærlig gjennomgang av priser, hva som påvirker kostnaden og når det lønner seg å investere mer.",
    lead: "Prisen på en nettside varierer fra nesten ingenting til hundretusener av kroner. Hva er egentlig forskjellen — og hva trenger en vanlig småbedrift? Her er en ærlig gjennomgang uten skjulte agendaer.",
    date: "28. feb 2025",
    dateIso: "2025-02-28",
    read: "5 min",
    content: (
       <>
        <h2 className="insight-h2">Hvorfor er prisene så forskjellige?</h2>
        <p className="insight-p">En nettside er ikke et standardprodukt. Det er mer som å spørre hva en bil koster — svaret avhenger fullstendig av hva du trenger, hvem som bygger den og hva som er inkludert. Det finnes fire hovedkategorier av nettsideløsninger for småbedrifter.</p>

        <table className="insight-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Pris (engang)</th>
              <th>Månedlig</th>
              <th>Passer for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gjør-det-selv (Wix, Squarespace)</td>
              <td>0–2 000 kr</td>
              <td>200–600 kr</td>
              <td>Hobbyprosjekter</td>
            </tr>
            <tr>
              <td>Billig leverandør / mal</td>
              <td>3 000–8 000 kr</td>
              <td>500–1 500 kr</td>
              <td>Veldig enkel tilstedeværelse</td>
            </tr>
            <tr className="insight-table-hi">
              <td>Profesjonell nettside</td>
              <td>8 000–25 000 kr</td>
              <td>1 500–4 000 kr</td>
              <td>Bedrifter som vil ha kunder fra nett</td>
            </tr>
            <tr>
              <td>Skreddersydd / enterprise</td>
              <td>50 000–300 000+ kr</td>
              <td>Varierer</td>
              <td>Store bedrifter, komplekse behov</td>
            </tr>
          </tbody>
        </table>

        <h2 className="insight-h2">Hva er egentlig forskjellen på billig og dyr?</h2>
        <p className="insight-p">En billig nettside ser ofte bra ut i skjermbildet leverandøren viser deg. Problemet er det du ikke ser: manglende SEO-struktur, treg lastetid, ingen strategi for konvertering og en plattform som begrenser deg hvis du vil vokse.</p>
        <p className="insight-p">En profesjonell nettside er bygget for å gjøre jobben sin — skaffe deg kunder. Det innebærer teknisk fundament, innholdsstrategi og løpende optimalisering. Det er den forskjellen som avgjør om nettsiden er en investering eller en utgift.</p>

        <div className="insight-highlight">
          <p>Spørsmålet er ikke hva nettsiden koster å bygge — det er hva den koster deg å ikke ha en som fungerer.</p>
        </div>

        <h2 className="insight-h2">Hva bør alltid være inkludert?</h2>

        <div className="insight-fact">
          <div className="insight-fact__label">Minimumsstandard</div>
          <h3 className="insight-h3" style={{marginTop: 0}}>Dette skal alltid være med</h3>
          <ul className="insight-ul">
            <li>Mobiloptimalisert design — over 60 % av trafikken er mobil</li>
            <li>SSL-sertifikat (https) — grunnleggende sikkerhet og Google-krav</li>
            <li>Grunnleggende on-page SEO — titler, metabeskrivelser, H-struktur</li>
            <li>Rask lastetid — under 3 sekunder på mobil</li>
            <li>Google Analytics oppsatt og fungerende</li>
            <li>Tydelige CTA-er på alle viktige sider</li>
          </ul>
        </div>

        <h2 className="insight-h2">Månedlig drift — hva betaler du egentlig for?</h2>
        <p className="insight-p">Mange lurer på hvorfor en nettside koster penger hver måned når den er &ldquo;ferdig bygget&rdquo;. Svaret er at en god nettside aldri er ferdig. Hosting, sikkerhet, oppdateringer, SEO-arbeid og innholdsproduksjon krever løpende innsats for at nettsiden skal fortsette å levere resultater.</p>
        <p className="insight-p">En månedlig avtale betyr at noen følger med, oppdaterer og forbedrer — slik at du slipper å tenke på det selv.</p>
      </>
    ),
    faqItems: [
      { q: "Hva koster en enkel nettside i Norge?", a: "En enkel nettside fra en profesjonell leverandør koster typisk mellom 8 000 og 25 000 kroner som engangsbeløp, pluss månedlig drift. Billigere løsninger finnes, men de mangler ofte SEO, hastighetsoptimalisering og profesjonelt design." },
      { q: "Er det billigere å bruke Wix eller WordPress selv?", a: "Selve verktøyet er billigere, men tiden du bruker og resultatene du oppnår er sjelden like gode. De fleste bedriftseiere undervurderer kompleksiteten og ender opp med en side som ikke rangerer på Google eller konverterer besøkende til kunder." },
      { q: "Hva bør alltid være inkludert i en nettside-pakke?", a: "Mobiloptimalisert design, SSL-sertifikat, grunnleggende SEO, hosting og en form for løpende support. Uten disse er nettsiden ufullstendig fra dag én." },
    ],
    ctaTitle: "Lurer du på hva som passer for din bedrift?",
    ctaText: "Vi hjelper deg å finne riktig løsning — uten å selge deg mer enn du trenger.",
  },

  {
    id: 4,
    slug: "ai-sokoptimalisering-2025",
    tag: "SEO",
    title: "Slik optimaliserer du nettsiden din for ChatGPT og AI-søk i 2025",
    description: "Google er ikke lenger alene. Lær hvordan du optimaliserer nettsiden din for AI-søk som ChatGPT, Perplexity og Google AI Overviews.",
    excerpt: "Google er ikke lenger alene. Slik sørger du for at bedriften din også vises når folk søker i AI.",
    lead: "Millioner av nordmenn bruker nå ChatGPT, Perplexity og Google AI Overviews for å finne svar og leverandører. Er bedriften din synlig der? Denne guiden forklarer hva AEO er — og hva du kan gjøre for å bli funnet av AI.",
    date: "20. feb 2025",
    dateIso: "2025-02-20",
    read: "7 min",
    content: (
       <>
        <h2 className="insight-h2">Søkeatferden er i endring</h2>
        <p className="insight-p">I 2025 søker folk ikke bare på Google. Mange stiller spørsmål direkte til AI-verktøy og forventer et direkte svar — ikke ti lenker de må klikke gjennom. &ldquo;Hvilken rørlegger er best i Drammen?&rdquo; kan nå stilles til ChatGPT, som svarer med et konkret navn og begrunnelse.</p>
        <p className="insight-p">Bedrifter som ikke er synlige i disse systemene mister kunder uten å vite det.</p>

        <div className="insight-highlight">
          <p>AEO (Answer Engine Optimization) er praksisen med å optimalisere innhold slik at AI-systemer velger å sitere eller anbefale nettopp deg — ikke konkurrenten.</p>
        </div>

        <h2 className="insight-h2">Hva AI-systemer ser etter</h2>
        <p className="insight-p">AI-verktøy som ChatGPT og Perplexity henter informasjon fra to kilder: innhold de er trent på, og innhold de kan søke opp i sanntid. For at de skal velge deg, må nettsiden din oppfylle noen kriterier.</p>

        <div className="insight-step">
          <div className="insight-step__num">01</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Klart og autoritativt innhold</h3>
            <p className="insight-p">AI foretrekker sider som svarer direkte på spørsmål uten å pakke det inn i markedsføringsspråk. Skriv slik at en AI kan sitere deg direkte.</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">02</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Strukturerte data (schema markup)</h3>
            <p className="insight-p">Kode som forteller AI nøyaktig hvem du er, hva du gjør og hvor du holder til. LocalBusiness-schema er det viktigste for lokale bedrifter.</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">03</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>FAQ-innhold på nettsiden</h3>
            <p className="insight-p">AI elsker å svare på spørsmål ved å sitere eksisterende FAQ-sider. Jo mer du svarer på spørsmål folk faktisk stiller, jo mer sannsynlig er det at AI velger deg.</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">04</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Autoritet og tillitssignaler</h3>
            <p className="insight-p">Anmeldelser, omtale fra andre nettsider og konsistent informasjon på tvers av plattformer øker sannsynligheten for at AI stoler på — og anbefaler — deg.</p>
          </div>
        </div>

        <div className="insight-step">
          <div className="insight-step__num">05</div>
          <div className="insight-step__content">
            <h3 className="insight-h3" style={{marginTop: 0}}>Rask og tilgjengelig nettside</h3>
            <p className="insight-p">AI-crawlere, akkurat som Google, favoriserer sider som laster raskt og er teknisk velimplementert.</p>
          </div>
        </div>

        <div className="insight-fact">
          <div className="insight-fact__label">Konkrete tiltak</div>
          <h3 className="insight-h3" style={{marginTop: 0}}>Kom i gang med AEO i dag</h3>
          <ul className="insight-ul">
            <li>Legg til LocalBusiness schema-markup på nettsiden din</li>
            <li>Opprett en FAQ-side som svarer på de 10 vanligste spørsmålene i din bransje</li>
            <li>Skriv om-oss-teksten slik at den beskriver tydelig hva, hvem og hvor</li>
            <li>Sørg for at bedriften er listet konsistent på Google, Facebook og Yelp</li>
            <li>Publiser jevnlig innhold som svarer på reelle kundespørsmål</li>
          </ul>
        </div>

        <h2 className="insight-h2">SEO og AEO — to sider av samme sak</h2>
        <p className="insight-p">Det gode er at godt SEO-arbeid og AEO-arbeid overlapper betydelig. Innhold som svarer klart på spørsmål, er godt strukturert og er skrevet med autoritet — rangerer både i Google og blir sitert av AI. Du trenger ikke velge mellom dem.</p>
        <p className="insight-p">De som starter nå, bygger et forsprang som vil være svært vanskelig å ta igjen om 2–3 år.</p>
      </>
    ),
    faqItems: [
      { q: "Hva er AEO?", a: "AEO står for Answer Engine Optimization — optimalisering for søkemotorer som svarer direkte med svar i stedet for lister med lenker. Det gjelder AI-verktøy som ChatGPT, Perplexity og Google AI Overviews." },
      { q: "Er SEO og AEO det samme?", a: "Nei, men de overlapper. SEO handler om å rangere i tradisjonelle søkeresultater. AEO handler om å bli sitert eller nevnt av AI-systemer. Godt SEO-innhold er et godt utgangspunkt for AEO, men det kreves noen tilleggstiltak." },
      { q: "Hva er structured data og trenger jeg det?", a: "Structured data (schema markup) er kode du legger til på nettsiden for å hjelpe søkemotorer og AI-systemer å forstå innholdet. For lokale bedrifter er LocalBusiness-schema det viktigste. Det øker sjansen for å bli nevnt i AI-søk og vises i Googles rich results." },
    ],
    ctaTitle: "Er nettsiden din klar for AI-søk?",
    ctaText: "Vi sjekker schema-markup, innholdsstruktur og AEO-beredskap i en gratis gjennomgang.",
  },

  {
    id: 5,
    slug: "lokal-seo-guide-smabedrifter",
    tag: "SEO",
    title: "Lokal SEO: Den komplette guiden for småbedrifter i Norge",
    description: "Alt du trenger å vite om lokal SEO i Norge — Google Maps, anmeldelser, landingssider og NAP-konsistens. Praktisk guide for småbedrifter som vil dominere lokale søk.",
    excerpt: "Alt du trenger å vite for å dominere lokale søk — Google Maps, anmeldelser og landingssider.",
    lead: "Lokal SEO er det viktigste markedsføringsverktøyet for småbedrifter som betjener kunder i et bestemt område. Denne guiden tar deg gjennom alt du trenger å vite — fra Google Business Profile til landingssider og anmeldelsesstrategier.",
    date: "14. feb 2025",
    dateIso: "2025-02-14",
    read: "10 min",
    content: (
       <>
        <h2 className="insight-h2">Hva er lokal SEO og hvorfor er det viktig?</h2>
        <p className="insight-p">Lokal SEO handler om å optimalisere din nettilstedeværelse slik at bedriften din vises når folk søker etter produkter eller tjenester nær dem. &ldquo;Rørlegger Drammen&rdquo;, &ldquo;tannlege åpen nå&rdquo; eller &ldquo;pizzeria i nærheten&rdquo; er alle lokale søk — og det er millioner av dem hver dag i Norge.</p>
        <p className="insight-p">Det som gjør lokal SEO spesielt verdifullt er intensjonen bak søkene. Folk som søker lokalt er klare til å handle. De vil ha hjelp nå, i nærheten, og de er i kjøpsmodus.</p>

        <div className="insight-highlight">
          <p>Google Local Pack — de tre bedriftene som vises i kartet øverst i søkeresultatene — er gull verdt. Å komme inn her er det primære målet for enhver lokal SEO-strategi.</p>
        </div>

        <h2 className="insight-h2">De fire pilarene i lokal SEO</h2>

        <h3 className="insight-h3">1. Google Business Profile</h3>
        <p className="insight-p">GBP er fundamentet. Uten en oppdatert og bekreftet profil er du ikke med i kampen om Local Pack. Fyll ut absolutt alle felt: åpningstider, bilder, tjenestebeskrivelser, kategorier og spørsmål-og-svar. Oppdater profilen minst én gang i måneden.</p>

        <h3 className="insight-h3">2. NAP-konsistens</h3>
        <p className="insight-p">NAP står for Name, Address, Phone — navn, adresse og telefonnummer. Dette må være identisk overalt: på nettsiden, i GBP, i nettkataloger (Gule Sider, Finn.no) og på sosiale medier. Ulik informasjon forvirrer Google og svekker rangeringen.</p>

        <h3 className="insight-h3">3. Anmeldelser og omdømme</h3>
        <p className="insight-p">Google bruker antall anmeldelser, gjennomsnittsscore og regelmessighet som rangeringsfaktorer. Ha et system for å be tilfredse kunder om anmeldelser — for eksempel en SMS med lenke rett etter at jobben er fullført. Svar alltid på anmeldelser, både positive og negative.</p>

        <h3 className="insight-h3">4. Lokalt innhold og landingssider</h3>
        <p className="insight-p">Hvis du betjener flere områder, bør du ha en dedikert side per by eller område. En side som heter &ldquo;Rørlegger Drammen&rdquo; med innhold spesifikt for Drammen rangerer langt bedre enn en generisk &ldquo;Om oss&rdquo;-side.</p>

        <div className="insight-fact">
          <div className="insight-fact__label">30-dagers plan</div>
          <h3 className="insight-h3" style={{marginTop: 0}}>Kom i gang med lokal SEO</h3>
          <ul className="insight-ul">
            <li>Uke 1: Opprett eller oppdater GBP fullstendig med bilder og all informasjon</li>
            <li>Uke 2: Sjekk NAP-konsistens og rett opp feil i nettkataloger</li>
            <li>Uke 3: Send anmeldelsesforespørsel til 10 tidligere kunder</li>
            <li>Uke 4: Skriv én landingsside per område du betjener</li>
          </ul>
        </div>

        <h2 className="insight-h2">Vanlige feil som koster deg rangeringer</h2>
        <p className="insight-p">Vi ser de samme feilene igjen og igjen: GBP som ikke er bekreftet, feil telefonnummer på nettsiden, ingen anmeldelser på over seks måneder, og generisk innhold uten stedsnavn. Disse er alle enkle å fikse — men de koster deg synlighet hver eneste dag de ikke er rettet opp.</p>
      </>
    ),
    faqItems: [
      { q: "Hva er lokal SEO?", a: "Lokal SEO handler om å optimalisere nettsiden og nettilstedeværelsen din slik at du vises høyt i søkeresultater når folk søker etter bedrifter i ditt geografiske område. Det inkluderer Google Maps, lokale søkeresultater og Google Business Profile." },
      { q: "Hva er Google Local Pack?", a: "Google Local Pack er de tre bedriftene som vises i et kart øverst i Google-søkeresultatene ved lokale søk. Disse tre posisjonene får en uforholdsmessig stor andel av klikkene og er det primære målet for lokal SEO." },
      { q: "Hvor mange anmeldelser trenger jeg på Google?", a: "Det finnes ingen magisk grense, men bedrifter med 20+ anmeldelser rangerer generelt bedre. Viktigere enn antall er regelmessighet — jevnlige nye anmeldelser signaliserer til Google at bedriften er aktiv og relevant." },
    ],
    ctaTitle: "Vil du se hvor sterk din lokale SEO er i dag?",
    ctaText: "Vi gjennomgår GBP, NAP-konsistens og lokal synlighet gratis — og gir deg en konkret prioriteringsliste.",
  },

  {
    id: 6,
    slug: "google-search-ads-vs-seo",
    tag: "Markedsføring",
    title: "Google Search Ads vs SEO — hva bør du velge når du vil ha flere kunder?",
    description: "En ærlig sammenligning av Google Ads og SEO. Hva gir best avkastning for småbedrifter i Norge — og når bør du bruke begge?",
    excerpt: "En ærlig sammenligning av hva som gir best avkastning på ulike stadier av bedriften.",
    lead: "Skal du betale for Google-annonser eller investere i SEO? Det er et av de vanligste spørsmålene vi får. Svaret er ikke det ene eller det andre — det avhenger av hvor du er, hva du trenger og hva du har råd til. Her er den ærlige gjennomgangen.",
    date: "7. feb 2025",
    dateIso: "2025-02-07",
    read: "6 min",
    content: (
       <>
        <h2 className="insight-h2">Hva er egentlig forskjellen?</h2>
        <p className="insight-p">Google Search Ads og SEO handler begge om å vises på Google — men på fundamentalt forskjellige måter. Google Search Ads er betalt synlighet: du betaler for hvert klikk og vises øverst umiddelbart. SEO er organisk synlighet: du bygger troverdighet over tid og vises gratis i søkeresultatene.</p>
        <p className="insight-p">Tenk på det slik: Google Ads er som å leie en butikkfront på den travleste gata i byen. SEO er som å eie butikkfronten. Leie gir deg tilgang med en gang — men stopper du å betale, forsvinner du. Eierskap tar tid å bygge, men gir deg varig verdi.</p>

        <h2 className="insight-h2">Valget</h2>
        <p className="insight-p">Du bør alltid velge SEO som en grunnplanke. Google Ads brukes strategisk til kampanjer, sesonger, og for å få umiddelbar effekt mens byrået bygger SEO-musklene dine. Å la de to spille på lag er den ultimate vekstriggen.</p>
       </>
    ),
    faqItems: [
      { q: "Hva er forskjellen på Google Search Ads og SEO?", a: "Google Search Ads er betalt annonsering — du betaler per klikk og vises øverst i søkeresultatene umiddelbart. SEO er organisk synlighet som bygges over tid uten at du betaler per besøkende. Ads gir rask effekt, SEO gir bærekraftige resultater på sikt." },
      { q: "Hva koster Google Search Ads for småbedrifter i Norge?", a: "For lokale servicebedrifter ligger et realistisk startbudsjett på 3 000–8 000 kroner per måned i annonsebudsjett, pluss administrasjonskostnad. Prisen varierer enormt etter bransje og konkurranse — noen bransjer som advokater og forsikring har svært høye klikk-priser." }
    ],
    ctaTitle: "Usikker på hva som passer best for din bedrift?",
    ctaText: "Vi ser på situasjonen din og anbefaler riktig strategi — uten å selge deg mer enn du trenger.",
  },

  {
    id: 7,
    slug: "sjekkliste-nettside-2025",
    tag: "Konvertering",
    title: "Sjekkliste: 12 ting en god nettside må ha for å skaffe kunder i 2025",
    description: "Gå gjennom denne sjekklisten og finn ut hva nettsiden din mangler. 12 konkrete elementer som skiller en nettside som skaffer kunder fra en som ikke gjør det.",
    excerpt: "Gå gjennom denne listen og finn ut hva nettsiden din mangler — og hva du bør prioritere først.",
    lead: "En nettside som skaffer kunder er ikke tilfeldig — den er bygget med bestemte elementer på plass. Gå gjennom denne listen og tell opp hvor mange av de 12 punktene din nettside faktisk har i dag.",
    date: "1. feb 2025",
    dateIso: "2025-02-01",
    read: "4 min",
    content: (
       <>
        <h2 className="insight-h2">12 kritiske elementer</h2>
        <ul className="insight-ul">
            <li>Tydelig verdiposisjon i hero - Du har 5 sekunder på å selge inn hva du gjør.</li>
            <li>Synlig CTA-knapp øverst - En knapp som "Ring nå" eller "Få tilbud" må være synlig.</li>
            <li>Mobiloptimalisert design - Over 60% av all trafikk er mobil.</li>
            <li>Lastetid under 3 sekunder - Hvis ikke mister du folk fort.</li>
            <li>SSL-sertifikat (https) - Google straffer manglende sikkerhet.</li>
            <li>Google-anmeldelser - Synlig sosial tillit.</li>
        </ul>
       </>
    ),
    faqItems: [
        { q: "Hva er det viktigste elementet på en nettside?", a: "En tydelig verdiposisjon — det vil si en overskrift som umiddelbart forteller hvem du hjelper, hva du gjør og hvorfor de skal velge deg. Uten dette mister du besøkende i løpet av de første 5 sekundene." }
    ],
    ctaTitle: "Vil du vite hvor mange av punktene du har?",
    ctaText: "Vi tar en titt for deg helt gratis og gir en statusrapport på hva du presterer best på idag."
  }
];
