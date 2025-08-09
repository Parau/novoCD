import { ReactNode } from 'react';

interface MDXContentProps {
  slug: string;
  isMdx: boolean;
}

export default async function MDXContent({ slug, isMdx }: MDXContentProps) {
  if (isMdx) {
    try {
      // Dynamic import of MDX file as per Next.js official docs
      const { default: MDXComponent } = await import(`@/content/posts/${slug}.mdx`);
      return <MDXComponent />;
    } catch (error) {
      console.error('Error loading MDX file:', error);
      return <div>Error loading content</div>;
    }
  }

  // For regular markdown files, also use dynamic import since @next/mdx handles .md files
  try {
    const { default: MDComponent } = await import(`@/content/posts/${slug}.md`);
    return <MDComponent />;
  } catch (error) {
    console.error('Error loading MD file:', error);
    return <div>Error loading content</div>;
  }
}

