export type Lang = 'en' | 'no'

export type Project = {
  status: string
  title: string
  summary: string
  problem: string
  role: string
  ai: string
  result: string
  shows: string[]
  href?: string
  hrefLabel?: string
}

export type WorkflowStep = {
  number: string
  title: string
  desc: string
  output: string
}

export type Capability = {
  title: string
  desc: string
}

export type HenningContent = {
  nav: { work: string; process: string; capabilities: string; about: string; contact: string }
  availability: string
  eyebrow: string
  heroLine1: string
  heroLine2: string
  heroBody: string
  heroPrimary: string
  heroSecondary: string
  heroTertiary: string
  proofKicker: string
  proofHeading: string
  proofIntro: string
  projects: Project[]
  processKicker: string
  processHeading: string
  processIntro: string
  workflow: WorkflowStep[]
  orchestrationKicker: string
  orchestrationHeading: string
  orchestrationIntro: string
  orchestrationProblem: string
  orchestrationNodes: string[]
  orchestrationOutput: string
  labKicker: string
  labHeading: string
  labIntro: string
  labSimple: string
  labSystem: string
  labSimpleSteps: string[]
  labSystemSteps: string[]
  capabilitiesKicker: string
  capabilitiesHeading: string
  capabilitiesIntro: string
  capabilities: Capability[]
  aboutKicker: string
  aboutHeading: string
  aboutBody1: string
  aboutBody2: string
  toolsKicker: string
  toolsHeading: string
  tools: { group: string; items: string[] }[]
  employerHeading: string
  employerBody: string
  employerCta: string
  businessHeading: string
  businessBody: string
  businessCta: string
  contactKicker: string
  contactHeading: string
  contactBody: string
  emailCta: string
  footer: string
}

export const content: Record<Lang, HenningContent> = {
  no: {
    nav: { work: 'Prosjekter', process: 'Arbeidsmåte', capabilities: 'Dette kan jeg hjelpe med', about: 'Om', contact: 'Kontakt' },
    availability: 'Åpen for relevante roller og samarbeid',
    eyebrow: 'AI × produkt × markedsføring × teknologi',
    heroLine1: 'Jeg bruker ikke AI bare til å jobbe raskere.',
    heroLine2: 'Jeg bruker det til å bygge ting.',
    heroBody: 'Jeg går fra problem og research til strategi, prototype, produkt og forbedring — og bruker AI som et system for å komme raskere frem uten å hoppe over tenkingen.',
    heroPrimary: 'Se hva jeg har bygget',
    heroSecondary: 'Ta kontakt',
    heroTertiary: 'Se hvordan jeg jobber med AI',
    proofKicker: 'Proof of work',
    proofHeading: 'Dette har jeg faktisk bygget',
    proofIntro: 'Ikke en verktøyliste. Reelle produkter, prototyper og arbeidsflyter som viser hvordan jeg kombinerer forretning, brukerbehov, AI og gjennomføring.',
    projects: [
      {
        status: 'Live',
        title: 'Avyronis + Geo Audit',
        summary: 'Nettside, posisjonering og en automatisert analysefunksjon bygget for å gjøre fagkompetanse om til konkrete leads.',
        problem: 'Små og mellomstore bedrifter trenger å forstå hvorfor nettsiden ikke skaper nok synlighet eller henvendelser — uten å kjøpe en full analyse først.',
        role: 'Konsept, posisjonering, UX/CRO, innhold, frontend, AI-workflow og iterasjon.',
        ai: 'AI brukes i research, strukturering, copy, kodearbeid, review og som del av selve audit-flyten.',
        result: 'En live digital tjeneste med en konkret analyseinngang i stedet for bare en tradisjonell byråside.',
        shows: ['Commercial thinking', 'UX/CRO', 'AI integration', 'Product building'],
        href: 'https://avyronis.com/geo-audit',
        hrefLabel: 'Åpne Geo Audit',
      },
      {
        status: 'MVP under utvikling',
        title: 'Rekrutteringsmatch',
        summary: 'En norsk rekrutteringsplattform for kandidatforvaltning, CV-parsing, forklarbar matching, shortlists og personvernflyt.',
        problem: 'Rekruttering blir fort fragmentert mellom CV-er, vurderinger, samtykke, matching og oppfølging — samtidig som beslutningene må kunne forklares.',
        role: 'Produktstrategi, informasjonsarkitektur, matchinglogikk, UX, teknisk arkitektur, kvalitetssikring og produktutvikling.',
        ai: 'AI inngår i parsing, matching, forklaringer, produktresearch, coding workflows og kritisk review av løsningen.',
        result: 'En fungerende MVP-arkitektur med tenant-isolasjon, samtykke, matching, shortlists, abonnement og tydelig sikkerhetsmodell.',
        shows: ['Product strategy', 'AI orchestration', 'SaaS architecture', 'Responsible AI'],
      },
      {
        status: 'Prototype',
        title: 'Aktiv Helse — digital pasientreise',
        summary: 'Redesign av en tverrfaglig klinikks nettside med tydeligere tjenester, tillit, lokal relevans og konverteringsløp.',
        problem: 'En klinikkside må hjelpe brukeren raskt fra symptom eller behov til riktig behandling — samtidig som den bygger trygghet.',
        role: 'Research, UX-struktur, visuell retning, copy, frontend og konverteringslogikk.',
        ai: 'AI brukes som researchpartner, designkritiker, tekstpartner og utviklingsassistent gjennom iterasjonene.',
        result: 'En mobilvennlig prototype som flytter fokus fra generell bedriftsinformasjon til brukerens behov og neste handling.',
        shows: ['Service design', 'Conversion UX', 'Rapid prototyping', 'Frontend'],
        href: 'https://aktivhelse.vercel.app',
        hrefLabel: 'Se prototypen',
      },
    ],
    processKicker: 'Arbeidsmetode',
    processHeading: 'AI er ikke snarveien. Det er arbeidslaget.',
    processIntro: 'Jeg bruker AI til å forsterke en strukturert prosess — ikke til å erstatte vurderingsevne. Output blir utfordret, testet og forbedret før det får bli en løsning.',
    workflow: [
      { number: '01', title: 'Forstå', desc: 'Definer problemet, brukeren og forretningsmålet før verktøy velges.', output: 'Et tydelig problem å løse' },
      { number: '02', title: 'Research', desc: 'Kombiner kilder, eksisterende data, konkurrenter og AI-assistert analyse.', output: 'Bedre beslutningsgrunnlag' },
      { number: '03', title: 'Strukturer', desc: 'Bryt arbeidet ned i beslutninger, kontekst, prompts, oppgaver og kvalitetssjekker.', output: 'Et system — ikke én stor prompt' },
      { number: '04', title: 'Bygg', desc: 'Design, kode, automatisering, analyse eller innhold blir gjort testbart tidlig.', output: 'Noe konkret å reagere på' },
      { number: '05', title: 'Utfordre', desc: 'Bruk andre modeller, agenter, tester og manuell vurdering til å finne svakheter.', output: 'Færre blinde flekker' },
      { number: '06', title: 'Mål', desc: 'Se om løsningen faktisk hjelper brukeren eller forretningen.', output: 'Signal fremfor antakelser' },
      { number: '07', title: 'Forbedre', desc: 'Iterer på det som virker — og fjern det som ikke gjør det.', output: 'Bedre løsning over tid' },
    ],
    orchestrationKicker: 'AI-orkestrering',
    orchestrationHeading: 'Ett problem. Flere spesialiserte perspektiver.',
    orchestrationIntro: 'I stedet for å spørre én modell om alt, deler jeg komplekse oppgaver i roller med tydelig kontekst og ansvar. Menneskelig vurdering ligger mellom stegene.',
    orchestrationProblem: 'Forretningsproblem',
    orchestrationNodes: ['Research', 'Produkt', 'Kode', 'Kritikk', 'Testing'],
    orchestrationOutput: 'Fungerende løsning',
    labKicker: 'AI Lab',
    labHeading: 'Forskjellen på «spør AI» og å bygge en AI-workflow',
    labIntro: 'Den viktigste ferdigheten er sjelden selve prompten. Det er hvordan problemet brytes ned, hvilken kontekst som gis, hvordan output kontrolleres og hvem som tar beslutningen.',
    labSimple: 'Én prompt',
    labSystem: 'Systematisk workflow',
    labSimpleSteps: ['Still et stort spørsmål', 'Få ett svar', 'Håp at antakelsene stemmer'],
    labSystemSteps: ['Definer mål og begrensninger', 'Hent og kryssjekk kilder', 'Del opp i spesialiserte oppgaver', 'Bygg en testbar løsning', 'Kjør kritikk og verifikasjon', 'Ta beslutningen selv'],
    capabilitiesKicker: 'For bedrifter og team',
    capabilitiesHeading: 'Problemer jeg kan hjelpe med',
    capabilitiesIntro: 'Jeg organiserer ikke tilbudet rundt AI-verktøy. Jeg starter med flaskehalsen, kundereisen eller muligheten — og velger teknologi etterpå.',
    capabilities: [
      { title: 'AI-workflows & automatisering', desc: 'Finn repetitivt kunnskapsarbeid der AI kan spare tid, øke kvalitet eller gjøre en prosess mer skalerbar — og bygg systemet rundt det.' },
      { title: 'AI-produkter & prototyper', desc: 'Gå fra idé og research til en testbar digital løsning med tydelig bruker- og forretningslogikk.' },
      { title: 'Rapid prototyping', desc: 'Bygg tidlig nok til å lære av noe ekte, i stedet for å bruke uker på presentasjoner om hva man kanskje skal bygge.' },
      { title: 'UX, CRO & digital vekst', desc: 'Forbedre digitale kundereiser med en kombinasjon av brukerforståelse, analyse, budskap, struktur og eksperimentering.' },
      { title: 'AI-adopsjon', desc: 'Kartlegg hvor AI faktisk gir verdi i arbeidshverdagen — og hvor man bør la være å automatisere.' },
      { title: 'Nettsider & digitale opplevelser', desc: 'Design og bygg moderne nettsider som kommuniserer raskt, bygger tillit og gjør neste steg enkelt.' },
    ],
    aboutKicker: 'Om Henning',
    aboutHeading: 'Ikke klassisk utvikler. Ikke bare markedsfører. Det er poenget.',
    aboutBody1: 'Bakgrunnen min er kommersiell: markedsføring, kundereiser, innhold, synlighet og hva som faktisk får mennesker til å handle. AI gjorde det mulig å koble den forståelsen mye tettere til produktutvikling og teknologi.',
    aboutBody2: 'I dag beveger jeg meg mellom forretning → bruker → idé → research → AI → teknologi → gjennomføring. Jeg er mest interessert i det som kan testes, bygges og forbedres — ikke i å fremstå som en person som «kan alt om AI».',
    toolsKicker: 'Under panseret',
    toolsHeading: 'Verktøy jeg bruker når de passer problemet',
    tools: [
      { group: 'AI', items: ['ChatGPT', 'Claude', 'Claude Code', 'Codex', 'agentic workflows', 'MCP', 'prompt & context engineering'] },
      { group: 'Produkt & teknologi', items: ['Next.js', 'TypeScript', 'Vercel', 'Supabase', 'APIs', 'automation', 'GitHub'] },
      { group: 'Growth', items: ['UX', 'CRO', 'SEO/AEO', 'analytics', 'Google Ads', 'Meta', 'positioning', 'customer journeys'] },
    ],
    employerHeading: 'Vurderer du meg til en rolle?',
    employerBody: 'Jeg er spesielt relevant der AI, produkt, markedsføring, growth, innovasjon og praktisk gjennomføring møtes.',
    employerCta: 'La oss ta en prat',
    businessHeading: 'Vil du bruke dette i bedriften din?',
    businessBody: 'Jeg kan hjelpe med å finne et konkret AI- eller digitalt forbedringsområde, prototype løsningen og gjøre den testbar.',
    businessCta: 'Se hva vi kan forbedre',
    contactKicker: 'Kontakt',
    contactHeading: 'Har du et problem som burde vært løst bedre?',
    contactBody: 'Send meg noen linjer om rollen, prosjektet eller arbeidsprosessen. Jeg svarer heller konkret enn med en generisk salgspitch.',
    emailCta: 'henning@avyronis.com',
    footer: 'Bygget som et levende proof-of-work — ikke en tradisjonell CV.',
  },
  en: {
    nav: { work: 'Work', process: 'Process', capabilities: 'What I can help with', about: 'About', contact: 'Contact' },
    availability: 'Open to relevant roles and collaborations',
    eyebrow: 'AI × product × marketing × technology',
    heroLine1: "I don't use AI just to work faster.",
    heroLine2: 'I use it to build things.',
    heroBody: 'I move from problem and research to strategy, prototype, product and iteration — using AI as a system for getting further, faster, without skipping the thinking.',
    heroPrimary: 'See what I have built',
    heroSecondary: 'Get in touch',
    heroTertiary: 'See how I work with AI',
    proofKicker: 'Proof of work',
    proofHeading: 'Things I have actually built',
    proofIntro: 'Not a tool list. Real products, prototypes and workflows that show how I combine business thinking, user needs, AI and execution.',
    projects: [
      {
        status: 'Live',
        title: 'Avyronis + Geo Audit',
        summary: 'A company site, positioning system and automated audit designed to turn expertise into concrete leads.',
        problem: 'Small and medium businesses need to understand why their website is not generating enough visibility or enquiries — before buying a full engagement.',
        role: 'Concept, positioning, UX/CRO, content, frontend, AI workflow and iteration.',
        ai: 'AI supports research, structuring, copy, coding, review and parts of the audit workflow itself.',
        result: 'A live digital service with a useful analysis entry point instead of a conventional agency brochure site.',
        shows: ['Commercial thinking', 'UX/CRO', 'AI integration', 'Product building'],
        href: 'https://avyronis.com/geo-audit',
        hrefLabel: 'Open Geo Audit',
      },
      {
        status: 'MVP in development',
        title: 'Rekrutteringsmatch',
        summary: 'A Norwegian recruitment platform for candidate management, CV parsing, explainable matching, shortlists and privacy workflows.',
        problem: 'Recruitment becomes fragmented across CVs, assessments, consent, matching and follow-up — while decisions still need to be explainable.',
        role: 'Product strategy, information architecture, matching logic, UX, technical architecture, QA and product development.',
        ai: 'AI is used for parsing, matching, explanations, product research, coding workflows and critical review.',
        result: 'A working MVP architecture with tenant isolation, consent, matching, shortlists, subscriptions and an explicit security model.',
        shows: ['Product strategy', 'AI orchestration', 'SaaS architecture', 'Responsible AI'],
      },
      {
        status: 'Prototype',
        title: 'Aktiv Helse — digital patient journey',
        summary: 'A redesign of a multidisciplinary clinic website focused on clearer services, trust, local relevance and conversion paths.',
        problem: 'A clinic website should move a visitor quickly from symptom or need to the right treatment while creating confidence.',
        role: 'Research, UX structure, visual direction, copy, frontend and conversion logic.',
        ai: 'AI is used as a research partner, design critic, writing partner and development assistant through the iterations.',
        result: 'A mobile-friendly prototype that shifts the focus from generic company information to the visitor’s need and next action.',
        shows: ['Service design', 'Conversion UX', 'Rapid prototyping', 'Frontend'],
        href: 'https://aktivhelse.vercel.app',
        hrefLabel: 'View prototype',
      },
    ],
    processKicker: 'Process',
    processHeading: 'AI is not the shortcut. It is the working layer.',
    processIntro: 'I use AI to strengthen a structured process — not replace judgement. Output is challenged, tested and improved before it becomes a solution.',
    workflow: [
      { number: '01', title: 'Understand', desc: 'Define the problem, user and business goal before choosing tools.', output: 'A clear problem to solve' },
      { number: '02', title: 'Research', desc: 'Combine sources, existing data, competitors and AI-assisted analysis.', output: 'Better decision input' },
      { number: '03', title: 'Structure', desc: 'Break the work into decisions, context, prompts, tasks and quality checks.', output: 'A system — not one giant prompt' },
      { number: '04', title: 'Build', desc: 'Make the design, code, automation, analysis or content testable early.', output: 'Something concrete to react to' },
      { number: '05', title: 'Challenge', desc: 'Use other models, agents, tests and manual review to find weaknesses.', output: 'Fewer blind spots' },
      { number: '06', title: 'Measure', desc: 'Check whether the solution actually helps the user or the business.', output: 'Signal over assumption' },
      { number: '07', title: 'Improve', desc: 'Iterate on what works — and remove what does not.', output: 'A better solution over time' },
    ],
    orchestrationKicker: 'AI orchestration',
    orchestrationHeading: 'One problem. Multiple specialised perspectives.',
    orchestrationIntro: 'Instead of asking one model to do everything, I split complex work into roles with explicit context and responsibility. Human judgement sits between the steps.',
    orchestrationProblem: 'Business problem',
    orchestrationNodes: ['Research', 'Product', 'Code', 'Critique', 'Testing'],
    orchestrationOutput: 'Working solution',
    labKicker: 'AI Lab',
    labHeading: 'The difference between “ask AI” and building an AI workflow',
    labIntro: 'The important skill is rarely the prompt itself. It is how the problem is decomposed, what context is provided, how output is checked and who owns the decision.',
    labSimple: 'One prompt',
    labSystem: 'Systematic workflow',
    labSimpleSteps: ['Ask one large question', 'Get one answer', 'Hope the assumptions are right'],
    labSystemSteps: ['Define goals and constraints', 'Collect and cross-check sources', 'Split into specialised tasks', 'Build a testable solution', 'Run critique and verification', 'Make the decision yourself'],
    capabilitiesKicker: 'For companies and teams',
    capabilitiesHeading: 'Problems I can help solve',
    capabilitiesIntro: 'I do not organise the work around AI tools. I start with the bottleneck, customer journey or opportunity — then choose the technology.',
    capabilities: [
      { title: 'AI workflows & automation', desc: 'Find repetitive knowledge work where AI can save time, improve quality or make a process more scalable — then build the system around it.' },
      { title: 'AI products & prototypes', desc: 'Move from idea and research to a testable digital product with clear user and business logic.' },
      { title: 'Rapid prototyping', desc: 'Build early enough to learn from something real instead of spending weeks presenting what might eventually be built.' },
      { title: 'UX, CRO & digital growth', desc: 'Improve digital journeys through user understanding, analytics, messaging, structure and experimentation.' },
      { title: 'AI adoption', desc: 'Map where AI can genuinely create value in day-to-day work — and where automation is the wrong choice.' },
      { title: 'Websites & digital experiences', desc: 'Design and build modern sites that communicate quickly, create trust and make the next step obvious.' },
    ],
    aboutKicker: 'About Henning',
    aboutHeading: 'Not a classic developer. Not just a marketer. That is the point.',
    aboutBody1: 'My background is commercial: marketing, customer journeys, content, visibility and what actually makes people act. AI made it possible to connect that understanding much more closely to product development and technology.',
    aboutBody2: 'Today I move between business → user → idea → research → AI → technology → execution. I care most about what can be tested, built and improved — not about presenting myself as someone who “knows everything about AI”.',
    toolsKicker: 'Under the hood',
    toolsHeading: 'Tools I use when they fit the problem',
    tools: [
      { group: 'AI', items: ['ChatGPT', 'Claude', 'Claude Code', 'Codex', 'agentic workflows', 'MCP', 'prompt & context engineering'] },
      { group: 'Product & technology', items: ['Next.js', 'TypeScript', 'Vercel', 'Supabase', 'APIs', 'automation', 'GitHub'] },
      { group: 'Growth', items: ['UX', 'CRO', 'SEO/AEO', 'analytics', 'Google Ads', 'Meta', 'positioning', 'customer journeys'] },
    ],
    employerHeading: 'Considering me for a role?',
    employerBody: 'I am especially relevant where AI, product, marketing, growth, innovation and hands-on execution meet.',
    employerCta: 'Let’s talk',
    businessHeading: 'Want to use this in your company?',
    businessBody: 'I can help identify a concrete AI or digital improvement area, prototype the solution and make it testable.',
    businessCta: 'Find an opportunity',
    contactKicker: 'Contact',
    contactHeading: 'Have a problem that should be solved better?',
    contactBody: 'Send me a few lines about the role, project or workflow. I would rather reply concretely than with a generic sales pitch.',
    emailCta: 'henning@avyronis.com',
    footer: 'Built as living proof-of-work — not a traditional CV.',
  },
}
