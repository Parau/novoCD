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
  {
    id: 3,
    title: 'Eu digo, você entende; mas será que entende o que eu digo?',
    image: 'https://blog.criatividade.digital/blog/ambiguidade/thumb-height.jpg',
    category: 'IA',
    excerpt: 'A Importância da Escolha das Palavras na Interação com IA.',
    date: '11 de Fevereiro, 2025',
    link: 'https://blog.criatividade.digital/blog/ambiguidade/',
  },
  {
    id: 4,
    title: 'Produtividade: Pesquisas sobre IA Generativa',
    image: 'https://blog.criatividade.digital/blog/refs/genia-thumb.jpg',
    category: 'IA',
    excerpt: 'Lista de pesquisas que exploram o impacto da IA generativa na produtividade.',
    date: '23 de Fevereiro, 2025',
    link: 'https://blog.criatividade.digital/blog/refs/produtividade-iagenerativa/',
  },
  {
    id: 5,
    title: 'Quando a Máquina Aprendeu a Falar a Nossa Língua?',
    image: 'https://blog.criatividade.digital/blog/maquina-falar-nossa-lingua/thumb01.jpg',
    category: 'IA',
    excerpt: 'Vivemos um momento único na tecnologia, onde imaginar e realizar estão mais próximos do que nunca. Agora, o segredo para desbloquear esse potencial está em reaprender a interagir com os computadores.',
    date: '2 de Janeiro, 2025',
    link: 'https://blog.criatividade.digital/blog/maquina-falar-nossa-lingua/',
  },
  {
    id: 6,
    title: '🔊 Estudante nota 5 ou 10? O segredo das redações geradas por IA.',
    image: 'https://blog.criatividade.digital/blog/redacao-enem/thumb.jpg',
    category: 'IA',
    excerpt: 'Uma escola de São Paulo desafiou os alunos a usar IA para criar redações do Enem. O que aconteceu revela lições valiosas para todos nós.',
    date: '14 de Outubro, 2024',
    link: 'https://blog.criatividade.digital/blog/redacao-enem/',
  },
  {
    id: 7,
    title: 'A magia da IA generativa',
    image: 'https://blog.criatividade.digital/blog/magia-ia-gen/thumb.png',
    category: 'IA',
    excerpt: 'Com a inteligência artificial generativa, a fronteira entre realidade e imaginação se tornou mais sutil.',
    date: '10 de Setembro, 2023',
    link: 'https://blog.criatividade.digital/blog/magia-ia-gen/',
  },
  {
    id: 8,
    title: 'Samsung "dá um puxão de orelha" nos usuários do ChatGPT',
    image: 'https://blog.criatividade.digital/blog/samsung/thumb.png',
    category: 'IA',
    excerpt: 'O que podemos aprender com esse caso?',
    date: '23 de Agosto, 2023',
    link: 'https://blog.criatividade.digital/blog/samsung/',
  },
  {
    id: 9,
    title: 'Alta ansiedade: a IA está fora de controle',
    image: 'https://blog.criatividade.digital/blog/fora-de-controle/thumb.png',
    category: 'IA',
    excerpt: 'Será que estamos confiando em uma IA que nem seus próprios criadores conseguem entender? Descubra por que o futuro da inteligência artificial pode ser mais enigmático e inquietante do que parece.',
    date: '16 de Agosto, 2023',
    link: 'https://blog.criatividade.digital/blog/fora-de-controle/',
  },
  {
    id: 10,
    title: 'Apresentando Jimi Hendrix: o maestro melódico do aprendizado de máquina',
    image: 'https://blog.criatividade.digital/blog/maestro/thumb.png',
    category: 'IA',
    excerpt: 'Descubra como as trajetórias de Jimi Hendrix e Brian May se conectam ao desenvolvimento da Inteligência Artificial!',
    date: '29 de Julho, 2023',
    link: 'https://blog.criatividade.digital/blog/maestro-machine-learning/',
  },
  {
    id: 11,
    title: 'Desmascarando a Inteligência Artificial',
    image: 'https://blog.criatividade.digital/blog/desmascarando/thumb.png',
    category: 'IA',
    excerpt: 'Você sabe o que está por trás da Inteligência Artificial? Prepare-se para descobrir! Este é o primeiro artigo de uma série que vai revelar os segredos da IA e mudar a maneira como você entende essa tecnologia.',
    date: '18 de Julho, 2023',
    link: 'https://blog.criatividade.digital/blog/desmascarando/',
  },
];

export function BlogPostsList({ categories }: { categories?: string[] }) {
  const filteredData = categories && categories.length > 0
    ? mockdata.filter(post => categories.includes(post.category))
    : mockdata;

  const cards = filteredData.map((post) => (
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
