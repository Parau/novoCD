import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  //basePath: '/testedocs',
  trailingSlash: true, //Vou começar o projeto assim para tentar evitar problemas com a indexação do google, pode ser que dê problema na versão atual do meu componente de blog
  // Opcional: para evitar problemas de renderização dupla no modo de desenvolvimento
  reactStrictMode: false, //Desliguei porque no loginlink ele estava dando erro de renderização dupla, parece que O useEffect está rodando duas vezes porque, no Next.js (especialmente em modo de desenvolvimento), o React ativa o Strict Mode, que executa efeitos duas vezes para ajudar a identificar efeitos colaterais não idempotentes. Troque para false e parou de rodar duas vezes.
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'], // adiciona suporte a MD/MDX
  webpack: (config, { isServer }) => {
    // Configuração manual do MDX
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            // remarkGfm → suporte a GitHub Flavored Markdown (tabelas, listas de tarefas, etc.)
            remarkPlugins: [remarkGfm],
            // rehypeSlug → adiciona id nos headings; rehypeAutolinkHeadings → link automático nos headings
            rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
          },
        },
      ],
    })

    // Fallbacks para módulos Node.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        path: false,
        os: false,
      }
    }
    return config
  },
}

export default nextConfig