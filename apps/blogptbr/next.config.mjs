import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/blog',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/blog',
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    mdxRs: false,
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, {name: 'matter'}]],
            rehypePlugins: [],
          },
        },
      ],
    });

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
        fs: false,
        path: false,
        os: false,
      };
    }

    return config;
  },
};

export default nextConfig;
