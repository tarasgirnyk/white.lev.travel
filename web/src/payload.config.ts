import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Houses } from './collections/Houses'
import { Inquiries } from './collections/Inquiries'
import { Posts } from './collections/Posts'
import { Settings } from './globals/Settings'
import { seed } from './seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '· White.Lev.Travel',
    },
  },
  editor: lexicalEditor({}),
  collections: [Users, Media, Houses, Posts, Inquiries],
  globals: [Settings],
  localization: {
    locales: [
      { label: 'Українська', code: 'uk' },
      { label: 'English', code: 'en' },
      { label: 'Polski', code: 'pl' },
    ],
    defaultLocale: 'uk',
    fallback: true,
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Синхронізувати схему автоматично (dev + перший деплой без окремих міграцій).
    push: true,
  }),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  cors: [serverURL],
  csrf: [serverURL],
  sharp,
  onInit: async (payload) => {
    if (process.env.SEED_ON_INIT === 'true') {
      await seed(payload)
    }
  },
})
