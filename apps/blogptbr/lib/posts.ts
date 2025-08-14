import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  source: string;
  title: string;
  date: string;
  excerpt: string;
  thumb: string;
  content: string;
  isMdx: boolean;
}

function processThumb(thumb: string, postDir: string): string {
  if (!thumb) return '';
  if (/^https?:\/\//.test(thumb)) return thumb;

  const absSrc = path.resolve(postDir, thumb);
  if (!fs.existsSync(absSrc)) return '';

  const data = fs.readFileSync(absSrc);
  const hash = createHash('sha1').update(data).digest('hex').slice(0, 8);
  const ext = path.extname(absSrc);
  const name = path.basename(absSrc, ext);
  const filename = `${name}-${hash}${ext}`;

  const destDir = path.join(process.cwd(), 'public/images/posts');
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(absSrc, path.join(destDir, filename));

  const base = (process.env.NEXT_PUBLIC_BASE_PATH || '') + '/images/posts';
  return path.posix.join(base.replace(/\/$/, ''), filename);
}

function normalizeSegment(segment: string): string {
  return segment
    .normalize('NFD')
    .replace(/[\.\s]+/g, '-')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const posts: Post[] = [];
  const slugCount: Record<string, number> = {};

  function walk(dir: string, relDir: string) {
    const entries = fs
      .readdirSync(dir, { withFileTypes: true })
      .filter((e) => !e.name.startsWith('.') && !e.name.startsWith('_'));
    const mdFiles = entries.filter(
      (e) => e.isFile() && /(\.mdx?|\.MDX?)$/.test(e.name)
    );
    const subdirs = entries.filter((e) => e.isDirectory());

    const count = mdFiles.length;
    const relSegments = relDir
      ? relDir.split(path.sep).map((s) => normalizeSegment(s))
      : [];

    for (const file of mdFiles) {
      const fullPath = path.join(dir, file.name);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const isMdx = file.name.toLowerCase().endsWith('.mdx');
      const source = path
        .relative(postsDirectory, fullPath)
        .replace(/\.[^/.]+$/, '')
        .split(path.sep)
        .join('/');
      const stem = path.basename(file.name, path.extname(file.name));

      let slugSegments: string[];
      if (!relDir) {
        slugSegments = [normalizeSegment(stem)];
      } else if (count === 1) {
        slugSegments = relSegments;
      } else {
        slugSegments = [...relSegments, normalizeSegment(stem)];
      }

      let slug = slugSegments.join('/');
      if (slugCount[slug]) {
        slugCount[slug] += 1;
        slug += `-${slugCount[slug]}`;
      } else {
        slugCount[slug] = 1;
      }

      const thumb = processThumb(data.thumb || '', path.dirname(fullPath));

      posts.push({
        slug,
        source,
        title: data.title || slugSegments[slugSegments.length - 1] || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
        thumb,
        content,
        isMdx,
      });
    }

    for (const sub of subdirs) {
      walk(path.join(dir, sub.name), path.join(relDir, sub.name));
    }
  }

  walk(postsDirectory, '');

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

