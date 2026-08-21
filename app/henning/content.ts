export type Lang = 'en' | 'no'

export const content: Record<Lang, {
  label: string
  heroTitle: string
  heroTagline: string
  intro: string
  toolbeltHeading: string
  toolbelt: { title: string; desc: string }[]
  proofHeading: string
  proof: { title: string; desc: string }[]
  ctaHeading: string
  ctaSub: string
  ctaButton: string
}> = {
  en: {
    label: 'AI Power User',
    heroTitle: 'Henning Navrud-Søberg',
    heroTagline: "I don't just use AI tools — I build workflows out of them.",
    intro:
      "I spend most of my working hours inside agentic AI systems: orchestrating coding agents, chaining tools, and designing the context that makes them reliable. This page is a look at how I actually use AI day to day — not a list of buzzwords.",
    toolbeltHeading: 'What I work with',
    toolbelt: [
      {
        title: 'Claude Code & agentic CLI tools',
        desc: 'Subagents, custom skills, MCP servers — automating real parts of the development workflow, not just autocomplete.',
      },
      {
        title: 'AI SDKs & LLM integrations',
        desc: 'Wiring LLM providers directly into production products, from lead-generation features to internal tooling.',
      },
      {
        title: 'Prompt & context engineering',
        desc: 'Designing prompts and managing context deliberately, and evaluating model output instead of guessing.',
      },
      {
        title: 'Multi-agent orchestration',
        desc: 'Building systems where several AI agents split up a task, hand off work, and check each other.',
      },
    ],
    proofHeading: 'Where it shows up',
    proof: [
      {
        title: 'Avyronis.com',
        desc: 'The company site you\'re one click away from — designed, built, and iterated on with an AI-assisted development workflow, end to end.',
      },
      {
        title: 'Geo-audit lead funnel',
        desc: 'An AI-driven lead-generation feature on the Avyronis site: an automated audit that turns visitor traffic into qualified leads.',
      },
      {
        title: 'Custom agentic workflows',
        desc: 'A personal library of Claude Code subagents and skills that automate research, review, and content work — built and refined through daily use.',
      },
    ],
    ctaHeading: "Let's talk AI",
    ctaSub: 'Open to conversations about AI workflows, tooling, or collaboration.',
    ctaButton: 'Send me an email',
  },
  no: {
    label: 'AI Power User',
    heroTitle: 'Henning Navrud-Søberg',
    heroTagline: 'Jeg bruker ikke bare AI-verktøy — jeg bygger arbeidsflyter av dem.',
    intro:
      'Jeg bruker mesteparten av arbeidstiden min inne i agentiske AI-systemer: orkestrerer kodeagenter, kjeder sammen verktøy, og designer konteksten som gjør dem pålitelige. Denne siden viser hvordan jeg faktisk bruker AI til daglig — ikke en liste med buzzwords.',
    toolbeltHeading: 'Det jeg jobber med',
    toolbelt: [
      {
        title: 'Claude Code og agentiske CLI-verktøy',
        desc: 'Subagenter, egendefinerte skills, MCP-servere — automatiserer reelle deler av utviklingsarbeidsflyten, ikke bare autofullføring.',
      },
      {
        title: 'AI SDK-er og LLM-integrasjoner',
        desc: 'Kobler LLM-leverandører direkte inn i produkter i produksjon, fra leadgen-funksjoner til interne verktøy.',
      },
      {
        title: 'Prompt- og context engineering',
        desc: 'Designer prompts og styrer kontekst bevisst, og evaluerer modellrespons i stedet for å gjette.',
      },
      {
        title: 'Multi-agent orkestrering',
        desc: 'Bygger systemer der flere AI-agenter deler opp en oppgave, gir hverandre stafettpinnen, og kvalitetssikrer hverandre.',
      },
    ],
    proofHeading: 'Hvor det viser igjen',
    proof: [
      {
        title: 'Avyronis.com',
        desc: 'Selskapssiden du er ett klikk unna — designet, bygget og videreutviklet med en AI-assistert utviklingsarbeidsflyt, fra start til slutt.',
      },
      {
        title: 'Geo-audit lead-funnel',
        desc: 'En AI-drevet leadgen-funksjon på Avyronis-siden: en automatisert audit som gjør besøkstrafikk om til kvalifiserte leads.',
      },
      {
        title: 'Egendefinerte agentiske arbeidsflyter',
        desc: 'Et personlig bibliotek av Claude Code-subagenter og skills som automatiserer research, review og innholdsarbeid — bygget og finpusset gjennom daglig bruk.',
      },
    ],
    ctaHeading: 'La oss snakke om AI',
    ctaSub: 'Åpen for samtaler om AI-arbeidsflyter, verktøy, eller samarbeid.',
    ctaButton: 'Send meg en e-post',
  },
}
