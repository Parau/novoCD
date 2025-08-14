import { Container, Title, Text, Paper, Button } from '@mantine/core';
import Link from 'next/link';
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import MDXContent from '@/components/MDXContent';

interface PostPageProps {
  params: {
    slug: string[];
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug.split('/') }));
}

export async function generateMetadata({ params }: PostPageProps) {
  const slug = params.slug.join('/');
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug.join('/');
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container size="md" py="xl">
      <Button component={Link} href="/" variant="light" mb="xl">
        ← Voltar ao início
      </Button>
      
      <Paper p="xl" withBorder>
        <Title order={1} mb="sm">{post.title}</Title>
        <Text size="sm" c="dimmed" mb="xl">{post.date}</Text>
        
        <MDXContent source={post.source} isMdx={post.isMdx} />
      </Paper>
    </Container>
  );
}
