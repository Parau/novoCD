import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { visit } from 'unist-util-visit';

/**
 * Remark plugin to process `thumb` field from frontmatter.
 *
 * Copies the referenced thumbnail image to the public directory and rewrites
 * the value to include the public base path, mirroring the behaviour of
 * `remarkRewriteImageSrc` for inline images.
 */
export default function remarkRewriteThumbFrontmatter({
  publicBase = '/blog/images/posts',
  destinationDir = 'public/images/posts',
} = {}) {
  const base = publicBase.replace(/\/$/, '');
  return (tree, file) => {
    visit(tree, 'mdxjsEsm', (node) => {
      const estree = node?.data?.estree;
      if (!estree) return;

      for (const body of estree.body) {
        if (body.type !== 'ExportNamedDeclaration') continue;
        const decl = body.declaration;
        if (!decl || decl.type !== 'VariableDeclaration') continue;

        for (const d of decl.declarations) {
          if (d.id.type !== 'Identifier' || d.id.name !== 'matter') continue;
          const init = d.init;
          if (!init || init.type !== 'ObjectExpression') continue;

          for (const prop of init.properties) {
            if (prop.type !== 'Property') continue;
            const key = prop.key;
            if (
              (key.type === 'Identifier' && key.name === 'thumb') ||
              (key.type === 'Literal' && key.value === 'thumb')
            ) {
              const val = prop.value;
              if (val.type !== 'Literal' || typeof val.value !== 'string') continue;
              let thumbPath = val.value;

              // Ignore external URLs
              if (/^https?:\/\//.test(thumbPath)) return;

              // Resolve relative paths and copy the file
              if (!thumbPath.startsWith('/')) {
                const postDir = path.dirname(file.path);
                const absSrc = path.resolve(postDir, thumbPath);
                if (!fs.existsSync(absSrc)) return;

                const data = fs.readFileSync(absSrc);
                const hash = createHash('sha1').update(data).digest('hex').slice(0, 8);
                const ext = path.extname(absSrc);
                const name = path.basename(absSrc, ext);
                const filename = `${name}-${hash}${ext}`;
                const destDir = path.join(process.cwd(), destinationDir);
                fs.mkdirSync(destDir, { recursive: true });
                fs.copyFileSync(absSrc, path.join(destDir, filename));
                thumbPath = path.posix.join(base, filename);
              } else {
                // Root-relative path: just prefix base path
                thumbPath = path.posix.join(base.replace(/\/images\/posts$/, ''), thumbPath);
              }

              val.value = thumbPath;
            }
          }
        }
      }
    });
  };
}
