import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDict } from '@/i18n'
import { isLocale, type Locale } from '@/i18n/config'
import { getPosts } from '@/lib/payload'
import { mediaUrl, type PostDoc } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDict(l)

  let posts: PostDoc[] = []
  try {
    posts = (await getPosts(l)) as unknown as PostDoc[]
  } catch {
    posts = []
  }

  return (
    <section className="section">
      <div className="container-wlt">
        <div className="max-w-2xl">
          <h1 className="display text-4xl sm:text-5xl">{dict.blog.title}</h1>
          <p className="mt-4 text-fg-dim">{dict.blog.subtitle}</p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-muted">{dict.blog.empty}</p>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p) => {
              const cover = mediaUrl(p.cover, 'card')
              return (
                <Link key={p.id} href={`/${l}/blog/${p.slug}`} className="card card-hover overflow-hidden">
                  <div className="aspect-[16/10] bg-ink-2">
                    {cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={cover} alt={p.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-5">
                    {p.publishedAt && (
                      <time className="text-xs text-muted">
                        {new Date(p.publishedAt).toLocaleDateString(l)}
                      </time>
                    )}
                    <h3 className="mt-1.5 text-lg font-semibold">{p.title}</h3>
                    {p.excerpt && <p className="mt-2 text-sm text-fg-dim line-clamp-3">{p.excerpt}</p>}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
