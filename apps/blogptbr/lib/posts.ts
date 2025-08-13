import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
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

export async function getAllPosts(): Promise<Post[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md') || name.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(md|mdx)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const isMdx = fileName.endsWith('.mdx');

      const thumb = processThumb(data.thumb || '', path.dirname(fullPath));

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        excerpt: data.excerpt || '',
        thumb,
        content,
        isMdx,
      };
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    let fullPath = path.join(postsDirectory, `${slug}.md`);
    let isMdx = false;
    
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${slug}.mdx`);
      isMdx = true;
      if (!fs.existsSync(fullPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const thumb = processThumb(data.thumb || '', path.dirname(fullPath));

    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      excerpt: data.excerpt || '',
      thumb,
      content,
      isMdx,
    };
  } catch (error) {
    return null;
  }
}

