import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import {
  AuditInputError,
  applyNarrative,
  buildNarrativePrompt,
  collectAudit,
  type AuditNarrative,
} from './audit-engine'

export const runtime = 'nodejs'
export const maxDuration = 60

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 6
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

export async function POST(req: Request) {
  try {
    assertRateLimit(req)

    const body = await req.json()
    const { url } = body

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'Mangler URL' }, { status: 400 })
    }

    const deterministicAudit = await collectAudit(url)
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        data: {
          ...deterministicAudit,
          aiNarrativeStatus: 'skipped_missing_api_key',
        },
      })
    }

    try {
      const openai = new OpenAI({ apiKey })
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: 'Du er en senior GEO-, SEO- og CRO-strateg. Du skriver presist på norsk og returnerer kun gyldig JSON.',
          },
          {
            role: 'user',
            content: buildNarrativePrompt(deterministicAudit),
          },
        ],
        response_format: { type: 'json_object' },
      })

      const rawJson = completion.choices[0]?.message?.content || '{}'
      const narrative = JSON.parse(rawJson) as AuditNarrative
      return NextResponse.json({
        success: true,
        data: {
          ...applyNarrative(deterministicAudit, narrative),
          aiNarrativeStatus: 'generated',
        },
      })
    } catch (error) {
      console.error('AI narrative failed:', error)
      return NextResponse.json({
        success: true,
        data: {
          ...deterministicAudit,
          aiNarrativeStatus: 'fallback_deterministic',
        },
      })
    }
  } catch (error: any) {
    console.error('Audit API Error:', error)

    if (error instanceof AuditInputError) {
      return NextResponse.json({ error: error.message }, { status: error.status })
    }

    return NextResponse.json({
      error: 'Det oppstod en ukjent feil på serveren under auditen.',
    }, { status: 500 })
  }
}

function assertRateLimit(req: Request): void {
  const ip = getClientIp(req)
  const now = Date.now()
  const bucket = rateBuckets.get(ip)

  if (!bucket || bucket.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return
  }

  bucket.count += 1
  if (bucket.count > RATE_LIMIT_MAX) {
    throw new AuditInputError('For mange analyser på kort tid. Prøv igjen om noen minutter.', 429)
  }
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}
