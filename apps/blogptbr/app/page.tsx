import { Container, Title, Text, Card, Group, Badge, Button } from '@mantine/core';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default async function HomePage() {
  const posts = await getAllPosts();

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">Blog PT-BR</Title>
      <Text size="lg" mb="xl">Bem-vindo ao nosso blog!</Text>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.map((post) => (
          <Card key={post.slug} shadow="sm" padding="lg" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Title order={3}>{post.title}</Title>
              <Badge color="blue" variant="light">
                {post.date}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" mb="md">
              {post.excerpt}
            </Text>
            <Button 
              component={Link} 
              href={`/${post.slug}/`}
              variant="light"
              size="sm"
            >
              Ler mais
            </Button>
          </Card>
        ))}
      </div>
    </Container>
  );
}
