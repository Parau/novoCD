import { Card, CardSection, Image, Text, Badge, Button, Group, Stack, Title, SimpleGrid, rem } from '@mantine/core';

// Dados de exemplo que viriam da sua API ou CMS
const mockdata = [
  {
    id: 1,
    title: 'Feliz Dia Nacional do Livro Infantil',
    image: 'https://blog.criatividade.digital/blog/dnli/feliz-dia-nacional-livro-infantil.jpg',
    category: 'Alfabetização',
    excerpt: 'Para comemorar, preparamos um presente especial para você enviar a quem quiser!',
    date: '17 de Abril, 2025',
    link: 'https://blog.criatividade.digital/blog/dnli/feliz-dia-nacional-do-livro-infantil/',
  },
  {
    id: 2,
    title: 'IA nas organizações: Estamos Desenvolvendo Mentes ou Treinando Seguidores de Prompts?',
    image: 'https://blog.criatividade.digital/blog/L&D/bem-vindo-2025/thumb.jpg',
    category: 'IA',
    excerpt: 'Após dois anos de IA generativa, o que aprendemos sobre seu impacto no desenvolvimento humano?',
    date: '5 de Março, 2025',
    link: 'https://blog.criatividade.digital/blog/ld/bem-vindo-2025/',
  },
  // ... adicione mais posts aqui
];

export function BlogPostsList() {
  const cards = mockdata.map((post) => (
    <Card key={post.id} withBorder radius="md" p="md" shadow="sm">
      <CardSection>
        <Image src={post.image} height={180} alt={post.title} />
      </CardSection>

      <Stack mt="md" gap="xs">
        <Group justify="space-between">
            <Badge variant="light">{post.category}</Badge>
            <Text size="xs" c="dimmed">{post.date}</Text>
        </Group>
        
        <Title order={3} fz="lg" fw={600}>
            {post.title}
        </Title>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {post.excerpt}
        </Text>

        <Group justify="space-between" mt={4}>
            <Text
              component="a"
              href={post.link}
              rel="noopener noreferrer"
              style={{
                background: '#fff',
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 500,
                padding: 0,
                display: 'inline-block',
              }}
            >
              Ler mais &rarr;
            </Text>
        </Group>
      </Stack>
    </Card>
  ));

  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3 }}
      spacing="xl"
    >
      {cards}
    </SimpleGrid>
  );
}
