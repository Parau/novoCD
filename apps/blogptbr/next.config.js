
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      require('remark-frontmatter'),
      require('remark-mdx-frontmatter'),
    ],
    rehypePlugins: [],
  },
});

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
};

module.exports = withMDX(nextConfig);
