import { Container, Title, Text } from '@mantine/core';
import { getAllPosts } from '@/lib/posts';
import { PostList } from '@/components/PostList';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">Blog PT-BR</Title>
      <Text size="lg" mb="xl">Bem-vindo ao nosso blog!</Text>

      <PostList posts={posts} />
    </Container>
  );
}
