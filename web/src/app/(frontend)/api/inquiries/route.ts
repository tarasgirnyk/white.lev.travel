import config from '@payload-config'
import { getPayload } from 'payload'
import { NextResponse } from 'next/server'

const intents = new Set(['invest', 'stay', 'other'])
const locales = new Set(['uk', 'en', 'pl'])

function optionalText(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

export async function POST(request: Request) {
  let input: Record<string, unknown>

  try {
    input = await request.json()
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 })
  }

  const name = optionalText(input.name)
  const phone = optionalText(input.phone)
  const email = optionalText(input.email)
  const intent = optionalText(input.intent)
  const locale = optionalText(input.locale)

  if (!name || !phone || (email && !/^\S+@\S+\.\S+$/.test(email))) {
    return NextResponse.json({ error: 'INVALID_CONTACT' }, { status: 400 })
  }

  try {
    const payload = await getPayload({ config })
    const inquiry = await payload.create({
      collection: 'inquiries',
      data: {
        name,
        phone,
        email,
        intent: intent && intents.has(intent) ? intent as 'invest' | 'stay' | 'other' : 'other',
        houseType: 'comfort',
        message: optionalText(input.message),
        locale: locale && locales.has(locale) ? locale : undefined,
        sourcePath: optionalText(input.sourcePath),
        status: 'new',
      },
    })

    return NextResponse.json({ id: inquiry.id }, { status: 201 })
  } catch (error) {
    console.error('INQUIRY_CREATE_FAILED', error instanceof Error ? error.message : 'unknown error')
    return NextResponse.json({ error: 'INQUIRY_CREATE_FAILED' }, { status: 500 })
  }
}
