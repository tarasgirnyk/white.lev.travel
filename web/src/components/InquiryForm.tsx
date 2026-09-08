'use client'

import { useState } from 'react'
import type { Locale } from '@/i18n/config'
import type { Dict } from '@/i18n'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function InquiryForm({ locale, dict }: { locale: Locale; dict: Dict }) {
  const [status, setStatus] = useState<Status>('idle')
  const f = dict.form

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          phone: data.get('phone'),
          email: data.get('email') || undefined,
          intent: data.get('intent'),
          houseType: data.get('houseType'),
          message: data.get('message') || undefined,
          locale,
          sourcePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="text-ember text-3xl mb-3">✓</div>
        <h3 className="text-xl font-semibold mb-2">{f.successTitle}</h3>
        <p className="text-fg-dim">{f.successText}</p>
      </div>
    )
  }

  const field =
    'w-full bg-ink border border-line rounded-xl px-4 py-3 text-fg placeholder:text-muted focus:outline-none focus:border-line-strong transition-colors'

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8 grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1.5 text-sm">
          <span className="text-fg-dim">{f.name} *</span>
          <input name="name" required className={field} placeholder={f.name} />
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-fg-dim">{f.phone} *</span>
          <input name="phone" required inputMode="tel" className={field} placeholder="+380…" />
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="text-fg-dim">{f.email}</span>
        <input name="email" type="email" className={field} placeholder="name@email.com" />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="grid gap-1.5 text-sm">
          <span className="text-fg-dim">{f.intent}</span>
          <select name="intent" defaultValue="invest" className={field}>
            <option value="invest">{f.intentInvest}</option>
            <option value="stay">{f.intentStay}</option>
            <option value="other">{f.intentOther}</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="text-fg-dim">{f.houseType}</span>
          <select name="houseType" defaultValue="unsure" className={field}>
            <option value="compact">Compact</option>
            <option value="comfort">Comfort</option>
            <option value="vip">VIP</option>
            <option value="unsure">{f.houseUnsure}</option>
          </select>
        </label>
      </div>

      <label className="grid gap-1.5 text-sm">
        <span className="text-fg-dim">{f.message}</span>
        <textarea name="message" rows={4} className={field} placeholder="…" />
      </label>

      {status === 'error' && <p className="text-sm text-ember">{f.error}</p>}

      <button type="submit" disabled={status === 'sending'} className="btn btn-ember w-full sm:w-auto justify-self-start disabled:opacity-60">
        {status === 'sending' ? f.sending : f.submit}
      </button>
    </form>
  )
}
