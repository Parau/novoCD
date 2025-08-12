import path from 'node:path';
import { visit } from 'unist-util-visit';

export default function remarkRewriteImageSrc({
  publicBase = '/blog/images/posts'
} = {}) {
  const base = publicBase.replace(/\/$/, '');
  return (tree) => {
    visit(tree, 'image', (node) => {
      if (!node?.url || typeof node.url !== 'string') return;

      // remark-copy-linked-files produces an absolute filesystem path.
      // We need to convert it to a web-friendly URL.
      if (path.isAbsolute(node.url)) {
        // Extract the filename (which includes the hash)
        const filename = path.basename(node.url);
        // Join with the public base path using POSIX separators for URL
        node.url = path.posix.join(base, filename);
      }
    });
  };
}
