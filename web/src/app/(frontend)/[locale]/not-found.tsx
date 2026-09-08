import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-wlt text-center py-24">
        <p className="display text-6xl text-ember">404</p>
        <p className="mt-4 text-fg-dim">Сторінку не знайдено · Page not found · Nie znaleziono</p>
        <Link href="/uk" className="btn btn-ghost mt-8">На головну</Link>
      </div>
    </section>
  )
}
