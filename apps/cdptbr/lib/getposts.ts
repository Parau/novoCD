import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

export type PostMeta = {
  title: string
  dek?: string
  author: string
  authorAvatar?: string
  date: string
  updated?: string
  hero?: string
  tags?: string[]
  slug: string
  draft?: boolean
}

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

export async function getAllSlugs() {
  console.log('[getAllSlugs] Diretório base:', POSTS_DIR)
  const files = await fs.readdir(POSTS_DIR)
  return files.filter(f => f.endsWith('.mdx')).map(f => f.replace(/\.mdx$/, ''))
}

export async function getPostMeta(slug: string): Promise<PostMeta> {
  const raw = await fs.readFile(path.join(POSTS_DIR, slug + '.mdx'), 'utf8')
  const { data } = matter(raw)
  return { ...(data as Omit<PostMeta, 'slug'>), slug }
}

export async function getPost(slug: string) {
  const filePath = path.join(POSTS_DIR, slug + '.mdx')
  const raw = await fs.readFile(filePath, 'utf8')
  const { content, data } = matter(raw)
  return {
    meta: { ...(data as Omit<PostMeta, 'slug'>), slug },
    content,
  }
}