'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { content, Lang } from './content'
import './henning.css'

export default function HenningPage() {
  const [lang, setLang] = useState<Lang>('no')
  const [labMode, setLabMode] = useState<'simple' | 'system'>('system')
  const t = content[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'no' ? 'nb' : 'en'
  }, [lang])

  return (
    <div className="henning-page">
      <a className="henning-skip" href="#main">Skip to content</a>

      <header className="henning-nav" aria-label="Primary navigation">
        <a className="henning-brand" href="#top" aria-label="Henning Navrud-Søberg — top">
          HNS<span>.</span>
        </a>
        <nav className="henning-nav__links" aria-label="Page sections">
          <a href="#work">{t.nav.work}</a>
          <a href="#process">{t.nav.process}</a>
          <a href="#capabilities">{t.nav.capabilities}</a>
          <a href="#about">{t.nav.about}</a>
        </nav>
        <div className="henning-lang" aria-label="Language">
          <button className={lang === 'no' ? 'is-active' : ''} onClick={() => setLang('no')} aria-pressed={lang === 'no'}>NO</button>
          <span aria-hidden="true">/</span>
          <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
        </div>
      </header>

      <main id="main">
        <section className="henning-hero" id="top">
          <div className="henning-shell henning-hero__grid">
            <div className="henning-hero__copy">
              <div className="henning-availability"><span />{t.availability}</div>
              <p className="henning-kicker">{t.eyebrow}</p>
              <h1>
                <span>{t.heroLine1}</span>
                <strong>{t.heroLine2}</strong>
              </h1>
              <p className="henning-hero__body">{t.heroBody}</p>
              <div className="henning-actions">
                <a className="henning-button henning-button--primary" href="#work">{t.heroPrimary}<span aria-hidden="true">↘</span></a>
                <a className="henning-button henning-button--ghost" href="mailto:henning@avyronis.com">{t.heroSecondary}<span aria-hidden="true">↗</span></a>
              </div>
              <a className="henning-text-link" href="#process">{t.heroTertiary}<span aria-hidden="true">↓</span></a>
            </div>

            <div className="henning-hero__visual" aria-label="Portrait and working system">
              <div className="henning-portrait-wrap">
                <Image
                  className="henning-portrait"
                  src="/henning-avyronis-portrett.webp"
                  alt="Henning Navrud-Søberg"
                  width={760}
                  height={920}
                  priority
                  sizes="(max-width: 800px) 76vw, 36vw"
                />
                <div className="henning-portrait__meta" aria-hidden="true">
                  <span>Problem</span><i>→</i><span>Build</span><i>→</i><span>Learn</span>
                </div>
              </div>
              <div className="henning-signal henning-signal--one"><span>01</span> Product thinking</div>
              <div className="henning-signal henning-signal--two"><span>02</span> AI orchestration</div>
              <div className="henning-signal henning-signal--three"><span>03</span> Commercial execution</div>
            </div>
          </div>
        </section>

        <section className="henning-section henning-work" id="work">
          <div className="henning-shell">
            <div className="henning-section-head">
              <p className="henning-kicker">{t.proofKicker}</p>
              <h2>{t.proofHeading}</h2>
              <p>{t.proofIntro}</p>
            </div>

            <div className="henning-projects">
              {t.projects.map((project, index) => (
                <article className="henning-project" key={project.title}>
                  <div className="henning-project__number">0{index + 1}</div>
                  <div className="henning-project__main">
                    <div className="henning-project__topline">
                      <span className="henning-status">{project.status}</span>
                      <span className="henning-project__rule" />
                    </div>
                    <h3>{project.title}</h3>
                    <p className="henning-project__summary">{project.summary}</p>

                    <div className="henning-project__details">
                      <div><span>{lang === 'no' ? 'Problemet' : 'Problem'}</span><p>{project.problem}</p></div>
                      <div><span>{lang === 'no' ? 'Min rolle' : 'My role'}</span><p>{project.role}</p></div>
                      <div><span>{lang === 'no' ? 'Hvordan AI ble brukt' : 'How AI was used'}</span><p>{project.ai}</p></div>
                      <div><span>{lang === 'no' ? 'Resultat / status' : 'Result / status'}</span><p>{project.result}</p></div>
                    </div>

                    <div className="henning-project__footer">
                      <div className="henning-tags" aria-label={lang === 'no' ? 'Dette viser prosjektet' : 'What this project demonstrates'}>
                        {project.shows.map((item) => <span key={item}>{item}</span>)}
                      </div>
                      {project.href && (
                        <a className="henning-project__link" href={project.href} target="_blank" rel="noreferrer">
                          {project.hrefLabel}<span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="henning-section henning-process" id="process">
          <div className="henning-shell">
            <div className="henning-section-head henning-section-head--wide">
              <p className="henning-kicker">{t.processKicker}</p>
              <h2>{t.processHeading}</h2>
              <p>{t.processIntro}</p>
            </div>

            <ol className="henning-workflow">
              {t.workflow.map((step) => (
                <li key={step.number}>
                  <span className="henning-workflow__number">{step.number}</span>
                  <div className="henning-workflow__copy"><h3>{step.title}</h3><p>{step.desc}</p></div>
                  <div className="henning-workflow__output"><span>{lang === 'no' ? 'Output' : 'Output'}</span>{step.output}</div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="henning-section henning-orchestration">
          <div className="henning-shell henning-orchestration__grid">
            <div className="henning-section-head">
              <p className="henning-kicker">{t.orchestrationKicker}</p>
              <h2>{t.orchestrationHeading}</h2>
              <p>{t.orchestrationIntro}</p>
            </div>

            <div className="henning-flow" aria-label={t.orchestrationHeading}>
              <div className="henning-flow__start">{t.orchestrationProblem}</div>
              <div className="henning-flow__line" aria-hidden="true" />
              <div className="henning-flow__hub">
                <span>HUMAN</span>
                <strong>{lang === 'no' ? 'Orkestrering' : 'Orchestration'}</strong>
                <small>{lang === 'no' ? 'kontekst · beslutning · review' : 'context · decision · review'}</small>
              </div>
              <div className="henning-flow__nodes">
                {t.orchestrationNodes.map((node, index) => <div key={node}><span>0{index + 1}</span>{node}</div>)}
              </div>
              <div className="henning-flow__line" aria-hidden="true" />
              <div className="henning-flow__end">{t.orchestrationOutput}<span aria-hidden="true">✓</span></div>
            </div>
          </div>
        </section>

        <section className="henning-section henning-lab" id="lab">
          <div className="henning-shell">
            <div className="henning-section-head henning-section-head--wide">
              <p className="henning-kicker">{t.labKicker}</p>
              <h2>{t.labHeading}</h2>
              <p>{t.labIntro}</p>
            </div>

            <div className="henning-lab__panel">
              <div className="henning-lab__tabs" role="tablist" aria-label={t.labHeading}>
                <button role="tab" aria-selected={labMode === 'simple'} className={labMode === 'simple' ? 'is-active' : ''} onClick={() => setLabMode('simple')}>{t.labSimple}</button>
                <button role="tab" aria-selected={labMode === 'system'} className={labMode === 'system' ? 'is-active' : ''} onClick={() => setLabMode('system')}>{t.labSystem}</button>
              </div>
              <div className={`henning-lab__flow ${labMode === 'system' ? 'is-system' : ''}`} role="tabpanel">
                {(labMode === 'simple' ? t.labSimpleSteps : t.labSystemSteps).map((step, index) => (
                  <div className="henning-lab__step" key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
              <div className="henning-lab__note">
                <span>{lang === 'no' ? 'Poenget' : 'The point'}</span>
                <p>{lang === 'no' ? 'AI blir mest verdifullt når det inngår i en tydelig arbeidsprosess med kilder, ansvar, kvalitetskontroll og et menneske som eier beslutningen.' : 'AI becomes most valuable when it sits inside a clear workflow with sources, ownership, quality control and a human responsible for the decision.'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="henning-section henning-capabilities" id="capabilities">
          <div className="henning-shell">
            <div className="henning-section-head">
              <p className="henning-kicker">{t.capabilitiesKicker}</p>
              <h2>{t.capabilitiesHeading}</h2>
              <p>{t.capabilitiesIntro}</p>
            </div>
            <div className="henning-capability-grid">
              {t.capabilities.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="henning-section henning-about" id="about">
          <div className="henning-shell henning-about__grid">
            <div>
              <p className="henning-kicker">{t.aboutKicker}</p>
              <h2>{t.aboutHeading}</h2>
            </div>
            <div className="henning-about__body">
              <p>{t.aboutBody1}</p>
              <p>{t.aboutBody2}</p>
            </div>
          </div>
        </section>

        <section className="henning-section henning-tools">
          <div className="henning-shell">
            <div className="henning-section-head">
              <p className="henning-kicker">{t.toolsKicker}</p>
              <h2>{t.toolsHeading}</h2>
            </div>
            <div className="henning-tools__grid">
              {t.tools.map((group) => (
                <div key={group.group}>
                  <h3>{group.group}</h3>
                  <div>{group.items.map((item) => <span key={item}>{item}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="henning-section henning-paths">
          <div className="henning-shell henning-paths__grid">
            <article>
              <span>01</span>
              <h2>{t.employerHeading}</h2>
              <p>{t.employerBody}</p>
              <a href="mailto:henning@avyronis.com?subject=Relevant%20rolle">{t.employerCta}<span aria-hidden="true">↗</span></a>
            </article>
            <article>
              <span>02</span>
              <h2>{t.businessHeading}</h2>
              <p>{t.businessBody}</p>
              <a href="mailto:henning@avyronis.com?subject=AI%20eller%20digitalt%20prosjekt">{t.businessCta}<span aria-hidden="true">↗</span></a>
            </article>
          </div>
        </section>

        <section className="henning-contact" id="contact">
          <div className="henning-shell">
            <p className="henning-kicker">{t.contactKicker}</p>
            <h2>{t.contactHeading}</h2>
            <p>{t.contactBody}</p>
            <a className="henning-contact__email" href="mailto:henning@avyronis.com">{t.emailCta}<span aria-hidden="true">↗</span></a>
            <div className="henning-contact__meta">
              <span>Norway</span>
              <span>AI · Product · Growth · Build</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="henning-footer">
        <div className="henning-shell"><span>© {new Date().getFullYear()} Henning Navrud-Søberg</span><span>{t.footer}</span></div>
      </footer>
    </div>
  )
}
