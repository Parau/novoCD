import Image from 'next/image'
import { PostMeta } from '../lib/getposts'

export default function PostLayout({ post, children }: { post: PostMeta; children: React.ReactNode }) {
  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <header className="pt-8">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        {post.dek && <p className="mt-4 text-lg text-slate-700">{post.dek}</p>}
        <div className="mt-2 text-sm text-slate-500">
          {post.date} • {post.author}
        </div>
      </header>
      {post.hero && (
        <div className="mt-6">
          <Image src={post.hero} alt="" width={1200} height={675} className="rounded-lg" />
        </div>
      )}
      <div className="prose mt-8 max-w-none">{children}</div>
    </article>
  )}
}