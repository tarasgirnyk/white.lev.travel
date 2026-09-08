import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { getDict } from '@/i18n'
import { isLocale, type Locale } from '@/i18n/config'
import { getPost } from '@/lib/payload'
import { mediaUrl, type PostDoc } from '@/lib/types'

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  if (!isLocale(locale)) return {}
  const post = (await getPost(slug, locale as Locale).catch(() => null)) as PostDoc | null
  if (!post) return {}
  return { title: `${post.title} · White.Lev.Travel`, description: post.excerpt || undefined }
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()
  const l = locale as Locale
  const dict = getDict(l)

  const post = (await getPost(slug, l).catch(() => null)) as PostDoc | null
  if (!post) notFound()

  const cover = mediaUrl(post.cover, 'hero')

  return (
    <article className="section">
      <div className="container-wlt max-w-3xl">
        <Link href={`/${l}/blog`} className="text-sm text-muted hover:text-fg link-underline">← {dict.blog.back}</Link>
        <h1 className="display text-3xl sm:text-5xl mt-5">{post.title}</h1>
        {post.publishedAt && (
          <time className="block mt-3 text-sm text-muted">{new Date(post.publishedAt).toLocaleDateString(l)}</time>
        )}
        {cover && (
          <div className="mt-8 card overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt={post.title} className="w-full" />
          </div>
        )}
        <div className="rich mt-8">
          {post.content ? <RichText data={post.content as SerializedEditorState} /> : null}
        </div>
      </div>
    </article>
  )
}
