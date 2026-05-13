"use client"

import { useState } from "react"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import ScrollAnimations from "@/components/ScrollAnimations"

type ScoreItem = {
  label: string
  score: number
  weight: number
  evidence?: string[]
}

type Finding = {
  category: string
  title: string
  severity: "critical" | "high" | "medium" | "low"
  url?: string
  evidence: string
  recommendation: string
  confidence: "confirmed" | "likely" | "not_verified"
}

type AuditData = {
  siteCategoryLabel?: string
  finalUrl?: string
  overallScore?: number
  confidence?: "confirmed" | "likely" | "not_verified"
  aiNarrativeStatus?: string
  auditScope?: {
    analyzedAt: string
    pagesAnalyzed: number
    pagesSkipped: number
    sitemapUrlsFound: number
    crawlSource: string
    robotsTxtFound: boolean
    llmsTxtFound: boolean
  }
  executiveSummary?: {
    diagnosis?: string
    biggestLeak?: string
    fastestWin?: string
  }
  scoreBreakdown?: ScoreItem[]
  findings?: Finding[]
  top3Updates?: Array<{
    title: string
    impact: "high" | "medium" | "low"
    whyItMatters: string
    recommendedFix: string
  }>
  leadQualification?: {
    score: number
    temperature: "hot" | "warm" | "nurture"
    reasons: string[]
    recommendedPitch: string
    urgency: string
  }
  recommendedService?: {
    id: string
    title: string
    summary: string
    estimatedScope: string
    primaryCta: string
    nextStep: string
    bookingHref: string
    reasons: string[]
  }
  missingSignals?: string[]
  crawlPages?: Array<{
    url: string
    status: number
    title: string
    h1: string
    wordCount: number
    schemaTypes: string[]
    issues: number
  }>
}

const severityLabels: Record<Finding["severity"], string> = {
  critical: "Kritisk",
  high: "Høy",
  medium: "Middels",
  low: "Lav",
}

const confidenceLabels: Record<NonNullable<AuditData["confidence"]>, string> = {
  confirmed: "Høy sikkerhet",
  likely: "Moderat sikkerhet",
  not_verified: "Ikke verifisert",
}

const leadIntentOptions = [
  "Fikse SEO / AI-synlighet",
  "Få flere henvendelser",
  "Forbedre mobil / hastighet",
  "Vurdere ny nettside",
]

function UrlAnalyzer() {
  const [url, setUrl] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "analyzed" | "error" | "submitted">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [auditData, setAuditData] = useState<AuditData | null>(null)
  const [leadEmail, setLeadEmail] = useState("")
  const [leadIntent, setLeadIntent] = useState(leadIntentOptions[0])
  const [leadSending, setLeadSending] = useState(false)

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadEmail || !auditData) return
    setLeadSending(true)

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: leadEmail, url: auditData.finalUrl || url, auditData, leadIntent }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || "Kunne ikke sende rapporten.")
      }

      setStatus("submitted")
    } catch (error: any) {
      setErrorMessage(error.message || "Kunne ikke sende rapporten.")
      setStatus("error")
    } finally {
      setLeadSending(false)
    }
  }

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    setStatus("loading")
    setErrorMessage("")
    setAuditData(null)

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Noe gikk galt på serveren.")

      setAuditData(data.data)
      setStatus("analyzed")
    } catch (err: any) {
      console.error(err)
      setStatus("error")
      setErrorMessage(err.message)
    }
  }

  if (status === "submitted") {
    return (
      <div className="url-analyzer-report fade-up" style={panelStyle}>
        <div style={{ fontSize: "44px", marginBottom: "20px" }}>✓</div>
        <h3 className="insight-h3" style={{ marginTop: 0, fontSize: "28px" }}>Rapporten er sendt</h3>
        <p className="url-analyzer__lead-text" style={{ maxWidth: "520px", margin: "0 auto 32px", fontSize: "18px", lineHeight: 1.6, textAlign: "center" }}>
          Vi har sendt audit-rapporten for <strong>{auditData?.finalUrl || url}</strong> til <strong>{leadEmail}</strong>.
        </p>
        {auditData?.recommendedService && (
          <div style={{ maxWidth: "620px", margin: "0 auto 28px", padding: "22px", border: "1px solid rgba(var(--color-accent-rgb),0.24)", borderRadius: "16px", background: "rgba(var(--color-accent-rgb),0.06)", textAlign: "left" }}>
            <div style={{ color: "var(--color-accent)", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Anbefalt neste steg</div>
            <h4 style={{ color: "var(--color-white)", margin: "0 0 8px", fontSize: "20px" }}>{auditData.recommendedService.title}</h4>
            <p style={{ color: "var(--color-muted)", margin: "0 0 18px", lineHeight: 1.55 }}>{auditData.recommendedService.nextStep}</p>
            <a className="btn btn--primary" href={auditData.recommendedService.bookingHref}>
              Book gratis gjennomgang
            </a>
          </div>
        )}
        <button className="btn btn--secondary" onClick={() => { setStatus("idle"); setUrl(""); setLeadEmail(""); setLeadIntent(leadIntentOptions[0]); setAuditData(null) }}>
          Analyser en ny nettside
        </button>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="url-analyzer__loading fade-up" style={{ ...panelStyle, textAlign: "center" }}>
        <div className="url-analyzer__loader" style={{ margin: "0 auto 32px" }}></div>
        <h3 className="insight-h3" style={{ fontSize: "24px" }}>Crawler og verifiserer signaler...</h3>
        <p className="url-analyzer__lead-text" style={{ fontSize: "17px", lineHeight: 1.6 }}>
          Henter HTML, sitemap, robots.txt, llms.txt, schema og prioriterte undersider for <strong>{url}</strong>.
          <span style={{ opacity: 0.65, fontSize: "14px", marginTop: "12px", display: "block" }}>Dette tar vanligvis 20-45 sekunder.</span>
        </p>
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="url-analyzer__lead-form fade-up" style={{ ...panelStyle, border: "1px solid rgba(255,68,68,0.28)", textAlign: "center" }}>
        <div style={{ fontSize: "44px", marginBottom: "20px" }}>!</div>
        <h3 className="insight-h3" style={{ color: "#ff6666", marginTop: 0 }}>Analyse feilet</h3>
        <p className="url-analyzer__lead-text" style={{ maxWidth: "520px", margin: "0 auto 32px" }}>{errorMessage}</p>
        <button className="btn btn--secondary" onClick={() => setStatus("idle")}>
          Prøv en annen URL
        </button>
      </div>
    )
  }

  if (status === "analyzed" && auditData) {
    return (
      <AuditReport
        auditData={auditData}
        url={url}
        leadEmail={leadEmail}
        setLeadEmail={setLeadEmail}
        leadIntent={leadIntent}
        setLeadIntent={setLeadIntent}
        leadSending={leadSending}
        onLeadSubmit={handleLeadSubmit}
      />
    )
  }

  return (
    <div className="geo-audit-tool" style={{ maxWidth: "520px", margin: "40px auto 0", width: "100%" }}>
      <form
        className="url-analyzer-dedicated"
        onSubmit={handleAnalyze}
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          gap: "8px",
          background: "rgba(255,255,255,0.05)",
          padding: "8px",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
          width: "100%",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <input
          type="text"
          className="url-analyzer__input"
          placeholder="f.eks. avyronis.com"
          style={{
            minWidth: 0,
            border: "none",
            background: "transparent",
            padding: "12px 14px",
            fontSize: "15px",
            color: "var(--color-white)",
            outline: "none",
          }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="btn btn--primary" style={{ borderRadius: "16px", padding: "0 14px", height: "44px", minWidth: "92px", width: "auto", fontSize: "13px", fontWeight: 800, whiteSpace: "nowrap" }}>
          Analyser
        </button>
      </form>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "16px", marginTop: "24px", opacity: 0.72 }}>
        <MiniCheck label="Fakta først" />
        <MiniCheck label="Sitemap crawl" />
        <MiniCheck label="Robots + llms.txt" />
      </div>
    </div>
  )
}

function AuditReport({
  auditData,
  url,
  leadEmail,
  setLeadEmail,
  leadIntent,
  setLeadIntent,
  leadSending,
  onLeadSubmit,
}: {
  auditData: AuditData
  url: string
  leadEmail: string
  setLeadEmail: (value: string) => void
  leadIntent: string
  setLeadIntent: (value: string) => void
  leadSending: boolean
  onLeadSubmit: (e: React.FormEvent) => void
}) {
  const summary = auditData.executiveSummary ?? {}
  const scope = auditData.auditScope
  const topFindings = (auditData.findings ?? []).slice(0, 6)

  return (
    <div className="url-analyzer-report fade-up" style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "24px", alignItems: "flex-start", marginBottom: "36px", borderBottom: "1px solid var(--color-border-light)", paddingBottom: "28px", flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <h2 className="insight-h2" style={{ margin: "0 0 12px", fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1.08 }}>Reell GEO-audit</h2>
          <p style={{ color: "var(--color-muted)", margin: "0 0 16px", lineHeight: 1.5, wordBreak: "break-word" }}>{auditData.finalUrl || url}</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {auditData.siteCategoryLabel && <Pill label={auditData.siteCategoryLabel} />}
            {auditData.confidence && <Pill label={confidenceLabels[auditData.confidence]} tone="accent" />}
            {auditData.aiNarrativeStatus === "fallback_deterministic" && <Pill label="AI-tekst fallback" tone="muted" />}
          </div>
        </div>
        <div style={{ background: scoreBackground(auditData.overallScore), color: "var(--color-black)", padding: "16px 24px", borderRadius: "18px", fontWeight: 900, minWidth: "132px", textAlign: "center" }}>
          <div style={{ fontSize: "13px", textTransform: "uppercase", opacity: 0.72 }}>GEO-score</div>
          <div style={{ fontSize: "34px", lineHeight: 1 }}>{auditData.overallScore ?? "–"}</div>
          <div style={{ fontSize: "13px" }}>/ 100</div>
        </div>
      </div>

      {scope && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "34px" }}>
          <Metric label="Sider analysert" value={String(scope.pagesAnalyzed)} />
          <Metric label="Sitemap URL-er" value={String(scope.sitemapUrlsFound)} />
          <Metric label="robots.txt" value={scope.robotsTxtFound ? "Funnet" : "Mangler"} />
          <Metric label="llms.txt" value={scope.llmsTxtFound ? "Funnet" : "Mangler"} />
        </div>
      )}

      {auditData.recommendedService && (
        <section style={{ marginBottom: "38px", padding: "28px", borderRadius: "18px", border: "1px solid rgba(var(--color-accent-rgb),0.26)", background: "linear-gradient(135deg, rgba(var(--color-accent-rgb),0.11), rgba(255,255,255,0.035))" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "18px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "18px" }}>
            <div>
              <div style={{ color: "var(--color-accent)", fontSize: "12px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Anbefalt vei videre</div>
              <h3 className="insight-h3" style={{ margin: 0, fontSize: "26px" }}>{auditData.recommendedService.title}</h3>
            </div>
            {auditData.leadQualification && (
              <Pill label={`Match: ${auditData.leadQualification.score}/100`} tone={auditData.leadQualification.temperature === "hot" ? "danger" : "accent"} />
            )}
          </div>
          <p style={{ color: "var(--color-white)", margin: "0 0 14px", fontSize: "17px", lineHeight: 1.6 }}>{auditData.recommendedService.summary}</p>
          <p style={{ color: "var(--color-muted)", margin: "0 0 22px", lineHeight: 1.55 }}>{auditData.recommendedService.estimatedScope}</p>
          <a className="btn btn--primary" href={auditData.recommendedService.bookingHref}>
            {auditData.recommendedService.primaryCta}
          </a>
        </section>
      )}

      <section style={{ marginBottom: "38px" }}>
        <SectionTitle title="Overordnet diagnose" />
        <p className="insight-p" style={{ fontSize: "18px", lineHeight: 1.65, color: "var(--color-white)", marginBottom: "22px" }}>{summary.diagnosis}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          <Callout title="Største lekkasje" text={summary.biggestLeak || "Ingen hovedlekkasje funnet."} tone="danger" />
          <Callout title="Raskeste gevinst" text={summary.fastestWin || "Ingen hurtiggevinst funnet."} tone="accent" />
        </div>
      </section>

      <section style={{ marginBottom: "38px" }}>
        <SectionTitle title="Scoregrunnlag" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
          {(auditData.scoreBreakdown ?? []).map((score) => (
            <ScoreCard key={score.label} score={score} />
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "38px" }}>
        <SectionTitle title="Prioriterte funn" />
        <div style={{ display: "grid", gap: "12px" }}>
          {topFindings.map((finding) => <FindingCard key={`${finding.title}-${finding.url}`} finding={finding} />)}
        </div>
      </section>

      <section style={{ marginBottom: "38px" }}>
        <SectionTitle title="Analyserte sider" />
        <div style={{ display: "grid", gap: "10px" }}>
          {(auditData.crawlPages ?? []).slice(0, 8).map((page) => (
            <div key={page.url} style={{ padding: "14px 16px", borderRadius: "12px", border: "1px solid var(--color-border-light)", background: "rgba(255,255,255,0.035)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                <strong style={{ color: "var(--color-white)", fontSize: "14px", wordBreak: "break-word" }}>{page.title}</strong>
                <span style={{ color: "var(--color-muted)", fontSize: "12px" }}>{page.wordCount} ord · {page.schemaTypes.length ? page.schemaTypes.slice(0, 3).join(", ") : "Ingen schema"}</span>
              </div>
              <div style={{ color: "var(--color-muted)", fontSize: "12px", marginTop: "8px", wordBreak: "break-word" }}>{page.url}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: "42px" }}>
        <SectionTitle title="Ikke verifisert" />
        <ul style={{ margin: 0, paddingLeft: "20px", color: "var(--color-muted)", lineHeight: 1.65 }}>
          {(auditData.missingSignals ?? []).slice(0, 5).map((signal) => <li key={signal}>{signal}</li>)}
        </ul>
      </section>

      <div style={{ textAlign: "center", padding: "34px", background: "var(--color-surface)", border: "1px solid var(--color-border-light)", borderRadius: "18px" }}>
        <h3 className="insight-h3" style={{ marginTop: 0, marginBottom: "14px", fontSize: "26px" }}>Få rapporten og vår vurdering</h3>
        <p className="insight-p" style={{ fontSize: "16px", maxWidth: "560px", margin: "0 auto 28px", lineHeight: 1.6 }}>
          Rapporten inkluderer funnene og scoregrunnlaget. I tillegg ser vi hva som bør fikses først hvis målet er flere kunder, bedre synlighet eller en raskere nettside.
        </p>
        <form onSubmit={onLeadSubmit} style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px", justifyContent: "center", maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "8px", marginBottom: "4px" }}>
            {leadIntentOptions.map((option) => (
              <label key={option} style={{ cursor: "pointer", border: leadIntent === option ? "1px solid rgba(var(--color-accent-rgb),0.65)" : "1px solid var(--color-border-light)", background: leadIntent === option ? "rgba(var(--color-accent-rgb),0.1)" : "rgba(255,255,255,0.035)", color: leadIntent === option ? "var(--color-white)" : "var(--color-muted)", borderRadius: "12px", padding: "11px 12px", fontSize: "13px", fontWeight: 700, textAlign: "left" }}>
                <input
                  type="radio"
                  name="lead-intent"
                  value={option}
                  checked={leadIntent === option}
                  onChange={(event) => setLeadIntent(event.target.value)}
                  style={{ marginRight: "8px" }}
                />
                {option}
              </label>
            ))}
          </div>
          <input
            type="email"
            placeholder="din@epost.no"
            className="url-analyzer__input"
            style={{ width: "100%", boxSizing: "border-box", border: "1px solid var(--color-border-light)", borderRadius: "14px", padding: "16px 18px", fontSize: "16px" }}
            value={leadEmail}
            onChange={(e) => setLeadEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn--accent" style={{ width: "100%", minHeight: "54px", height: "auto", padding: "16px 26px", borderRadius: "16px", fontSize: "15px", fontWeight: 900, boxShadow: "0 14px 34px rgba(var(--color-accent-rgb), 0.28)" }} disabled={leadSending}>
            {leadSending ? "Sender..." : "Send rapport + vurdering"}
          </button>
        </form>
        <p style={{ margin: "18px 0 0", color: "var(--color-muted)", fontSize: "12px", lineHeight: 1.5 }}>
          Ingen spam. Hvis vi ser en tydelig mulighet, sender vi deg hva vi ville fikset først.
        </p>
      </div>
    </div>
  )
}

function ScoreCard({ score }: { score: ScoreItem }) {
  return (
    <div style={{ padding: "18px", borderRadius: "14px", border: "1px solid var(--color-border-light)", background: "rgba(255,255,255,0.035)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
        <strong style={{ color: "var(--color-white)", fontSize: "15px" }}>{score.label}</strong>
        <span style={{ color: scoreTextColor(score.score), fontWeight: 900 }}>{score.score}/100</span>
      </div>
      <div style={{ height: "7px", borderRadius: "999px", background: "rgba(255,255,255,0.08)", overflow: "hidden", marginBottom: "12px" }}>
        <div style={{ width: `${Math.max(0, Math.min(100, score.score))}%`, height: "100%", background: scoreBackground(score.score) }} />
      </div>
      <p style={{ margin: 0, color: "var(--color-muted)", fontSize: "13px", lineHeight: 1.45 }}>{score.evidence?.[0] || `Vekt: ${Math.round(score.weight * 100)}%`}</p>
    </div>
  )
}

function FindingCard({ finding }: { finding: Finding }) {
  return (
    <div style={{ padding: "18px", borderRadius: "14px", border: "1px solid var(--color-border-light)", background: "rgba(255,255,255,0.035)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "10px" }}>
        <div>
          <div style={{ color: "var(--color-muted)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>{finding.category}</div>
          <strong style={{ color: "var(--color-white)", fontSize: "17px" }}>{finding.title}</strong>
        </div>
        <Pill label={severityLabels[finding.severity]} tone={finding.severity === "critical" || finding.severity === "high" ? "danger" : "muted"} />
      </div>
      <p style={{ margin: "0 0 10px", color: "var(--color-muted)", lineHeight: 1.55 }}>{finding.evidence}</p>
      <p style={{ margin: 0, color: "var(--color-white)", lineHeight: 1.55 }}>{finding.recommendation}</p>
    </div>
  )
}

function MiniCheck({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px" }}>
      <span style={{ color: "var(--color-accent)" }}>✓</span> {label}
    </div>
  )
}

function Pill({ label, tone = "muted" }: { label: string; tone?: "muted" | "accent" | "danger" }) {
  const colors = {
    muted: { color: "var(--color-muted)", border: "var(--color-border-light)", bg: "rgba(255,255,255,0.035)" },
    accent: { color: "var(--color-accent)", border: "rgba(var(--color-accent-rgb),0.35)", bg: "rgba(var(--color-accent-rgb),0.08)" },
    danger: { color: "#ff7777", border: "rgba(255,68,68,0.28)", bg: "rgba(255,68,68,0.08)" },
  }[tone]

  return <span style={{ display: "inline-flex", alignItems: "center", border: `1px solid ${colors.border}`, color: colors.color, background: colors.bg, padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>{label}</span>
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ padding: "16px", borderRadius: "14px", border: "1px solid var(--color-border-light)", background: "rgba(255,255,255,0.035)" }}>
      <div style={{ color: "var(--color-muted)", fontSize: "12px", marginBottom: "8px" }}>{label}</div>
      <div style={{ color: "var(--color-white)", fontSize: "18px", fontWeight: 800 }}>{value}</div>
    </div>
  )
}

function Callout({ title, text, tone }: { title: string; text: string; tone: "danger" | "accent" }) {
  return (
    <div style={{ padding: "22px", background: tone === "danger" ? "rgba(255,68,68,0.06)" : "rgba(var(--color-accent-rgb), 0.06)", border: tone === "danger" ? "1px solid rgba(255,68,68,0.22)" : "1px solid rgba(var(--color-accent-rgb), 0.22)", borderRadius: "16px" }}>
      <div style={{ fontSize: "12px", fontWeight: 800, color: tone === "danger" ? "#ff7777" : "var(--color-accent)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</div>
      <p style={{ margin: 0, color: "var(--color-white)", fontSize: "15px", lineHeight: 1.55 }}>{text}</p>
    </div>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
      <span style={{ width: "7px", height: "22px", background: "var(--color-accent)", borderRadius: "4px" }}></span>
      <h3 className="insight-h3" style={{ margin: 0, fontSize: "22px" }}>{title}</h3>
    </div>
  )
}

function scoreBackground(score?: number) {
  if (typeof score !== "number") return "var(--color-accent)"
  if (score >= 75) return "#7ddc9a"
  if (score >= 55) return "var(--color-accent)"
  if (score >= 35) return "#ffb86b"
  return "#ff7777"
}

function scoreTextColor(score?: number) {
  if (typeof score !== "number") return "var(--color-accent)"
  if (score >= 75) return "#7ddc9a"
  if (score >= 55) return "var(--color-accent)"
  if (score >= 35) return "#ffb86b"
  return "#ff7777"
}

const panelStyle: React.CSSProperties = {
  textAlign: "left",
  background: "var(--color-bg-card)",
  padding: "clamp(24px, 5vw, 48px)",
  borderRadius: "24px",
  border: "1px solid var(--color-border-light)",
  boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
}

export default function GeoAuditPage() {
  return (
    <>
      <ScrollAnimations />
      <Nav />
      <main className="geo-audit-page" style={{ minHeight: "100vh", paddingTop: "150px", paddingBottom: "100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "58vh", background: "radial-gradient(circle, rgba(var(--color-accent-rgb), 0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }}></div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "72px" }}>
            <span className="badge fade-up" style={{ marginBottom: "24px" }}>Gratis AI-readiness audit</span>
            <h1 className="insight-h1 fade-up" style={{ fontSize: "clamp(40px, 8vw, 76px)", lineHeight: 0.94, marginBottom: "24px", letterSpacing: "-0.03em" }}>
              Mål hvor lett AI kan <span className="text-accent">forstå og sitere</span> nettsiden din
            </h1>
            <p className="insight-p fade-up" style={{ fontSize: "clamp(18px, 2vw, 22px)", maxWidth: "740px", margin: "0 auto", opacity: 0.84, lineHeight: 1.55 }}>
              Auditen crawler faktiske sider, sjekker robots.txt, llms.txt, schema, innholdsstruktur og konverteringssignaler. Resultatet skiller mellom bekreftede funn og ting som krever ekstern verifisering.
            </p>
          </div>

          <UrlAnalyzer />

          <div className="fade-up" style={{ marginTop: "110px", textAlign: "center", borderTop: "1px solid var(--color-border-light)", paddingTop: "54px" }}>
            <p style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-muted)", marginBottom: "34px" }}>Bygget for ærlige audits, ikke magiske tall</p>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "42px", opacity: 0.58 }}>
              <div style={{ fontWeight: 800, fontSize: "18px" }}>CRAWL-DATA</div>
              <div style={{ fontWeight: 800, fontSize: "18px" }}>SCHEMA</div>
              <div style={{ fontWeight: 800, fontSize: "18px" }}>ROBOTS.TXT</div>
              <div style={{ fontWeight: 800, fontSize: "18px" }}>LLMS.TXT</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
