import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostLayout from '../../components/PostLayout'
import { getAllSlugs, getPost } from '../../lib/getposts'
import * as mdxComponents from '../../components/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'

export const dynamic = 'error'

export async function generateStaticParams() {

  const slugs = await getAllSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { meta } = await getPost(params.slug)
  return {
    title: meta.title,
    description: meta.dek,
  }
}

// Nota: usamos next-mdx-remote mesmo com arquivos locais para que possamos ler e
// processar o MDX a partir de strings obtidas via gray-matter, em vez de importar
// diretamente o arquivo como módulo. Isso oferece flexibilidade (ex.: suporte
// futuro a CMS ou conteúdos vindos de API) e mantém a renderização no servidor.
export default async function Page({ params }: { params: { slug: string } }) {

  const { meta, content } = await getPost(params.slug).catch(() => ({ meta: null, content: '' }))
  if (!meta) return notFound()

  return (
    <PostLayout post={meta}>
      <MDXRemote source={content} components={mdxComponents} />
    </PostLayout>
  )
}