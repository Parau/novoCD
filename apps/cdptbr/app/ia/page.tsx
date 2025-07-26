"use client";
import { useEffect } from 'react';
import {Center , rem, ActionIcon, Paper, Alert, Text, Breadcrumbs, Anchor, Card, Image, Group, Button, SimpleGrid } from '@mantine/core';
import { IconHomeFilled } from '@tabler/icons-react';
import { HeaderCD } from '../../components/HeaderCD';
//import { useAuth, ACCESS_STATUS } from '../../firebase/AuthContext';
import { useAuth, ACCESS_STATUS } from '@repo/firebase/AuthContext';
import { LoginPrompt } from '../../components/LoginPrompt';
import classes from './card.module.css';
import { IconArrowsExchange, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { BlogPostsList } from '../../components/BlogPostsList';

function FerramentaButton() {
  return (
    <Center mb="xl">
      <Button
        component={Link}
        href="/sua-ferramenta"
        size="lg"
        variant="gradient"
        gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        leftSection={<IconArrowsExchange size={20} />}
      >
        Acessar a Ferramenta de Comparação
      </Button>
    </Center>
  );
}

function FerramentaAlert() {
  return (
    <Alert
      variant="light"
      color="blue"
      radius="md"
      p="lg"
      mb="xl" // Adiciona uma margem inferior para separar dos cartões
      icon={<IconArrowsExchange size={32} />}
    >
      <Group justify="space-between">
        <div>
          <Text fw={700} size="lg">
            Ferramenta de Comparação de Textos
          </Text>
          <Text size="sm" c="dimmed">
            Compare versões e visualize as alterações feitas pela IA no seu texto.
          </Text>
        </div>
        <Button
          component="a"
          href="/comparador"
          variant="light"
          color="blue"
          size="sm"
        >
          Acessar
        </Button>
      </Group>
    </Alert>
  );
}

function FerramentaPaper() {
  return (
    <Paper
      withBorder
      p="md"
      radius="md"
      mb="xl"
      component={Link}
      href="/comparador"
      style={{ textDecoration: 'none' }}
    >
      <Group justify="space-between">
        <Group>
          <ActionIcon variant="light" color="blue" size="lg" radius="md">
            <IconArrowsExchange style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
          <div>
          <Text fw={500}>Ferramenta de Comparação de Textos</Text>
          <Text size="sm" c="dimmed">
            Compare versões e visualize as alterações feitas pela IA no seu texto.
          </Text>
          </div>
        </Group>
        <IconArrowRight size={20} stroke={1.5} />
      </Group>
    </Paper>
  );
}

export default function Page() {
  const { user, hasAccess, getAllAccess } = useAuth();

  useEffect(() => {
    //console.log(getAllAccess());
  }, [getAllAccess, hasAccess]);

  const cardsData = [
    {
      id: 1,
      imageSrc: '/GuidesNTools/thumbs/plano-aula.jpg',
      imageAlt: 'Plano de aula livro O Nome da Gente',
      title: 'Planos de aula ONDG',
      description: (
        <>
          Este guia apresenta três situações didáticas elaboradas para o trabalho com o livro{' '}
          <i>O Nome da Gente</i>.
        </>
      ),
      link: 'https://criatividade.digital/ondg-planos/',
      visible: false, 
      requiredAccess: '0', // Restrict access to users with ONDG license
    },
    {
      id: 2,
      imageSrc: '/GuidesNTools/thumbs/importancia-nome-alfabetizacao.jpg', // Placeholder image
      imageAlt: 'Guia a importância do nome na alfabetização',
      title: 'A importância do nome na alfabetização',
      description: (
        <>
          A proposta deste material é destacar o valor do nome próprio como ponto de partida significativo no processo de alfabetização.
        </>
      ),
      link: 'https://criatividade.digital/importancia-nome-alfabetizacao/',
      visible: false, 
      requiredAccess: '', // no restriction
    },
    {
      id: 3,
      imageSrc: '/GuidesNTools/thumbs/atividades-usando-lenga-lengas.jpg', // Placeholder image
      imageAlt: ' Guia Proposta de atividades usando LENGA-LENGAS',
      title: 'Atividades usando LENGA-LENGAS',
      description: (
        <>
          Um guia prático e inspirador que mostra como a produção de histórias próprias pode ser uma porta de entrada afetiva para o universo da leitura.
        </>
      ),
      link: 'https://criatividade.digital/alfabetizar/docs/lenga-lenga/apresentacao',
      visible: false, 
      requiredAccess: '', // no restriction
    },
  ];

  // Filter cards based on user access
  const filteredCards = cardsData.filter(card => {
    // If no access restriction, show the card
    if (card.requiredAccess === '') {
      return true;
    }
    // If user is not logged in, don't show restricted cards
    if (!user) {
      return false;
    }
    // Check if user has required access
    return hasAccess(card.requiredAccess) === ACCESS_STATUS.GRANTED;
  });

  return (
    <>
      <HeaderCD />
      <Breadcrumbs separator=">" separatorMargin="xs" mt={0} mb="xs">
        <Anchor href="/">
          <IconHomeFilled size={18} color="black" />
        </Anchor>
        Inteligência Artificial
      </Breadcrumbs>
      {!user && <LoginPrompt redirectPath="/alfa" />}

      {/*<FerramentaAlert />*/}

      <FerramentaPaper />

      {/*<FerramentaButton />*/}

      <Text size="xl" mt={12} mb={4}>
        Guias
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            withBorder
            radius="md"
            p="md"
            className={classes.card}
            style={{ 
              maxWidth: 512, 
              minWidth: 256, 
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
          >
            <Card.Section>
              <Image src={card.imageSrc} alt={card.imageAlt} fit="cover" />
            </Card.Section>
            <Card.Section className={classes.section} mt="md" style={{ flex: 1 }}>
              <Group justify="apart">
                <Text fz="lg" fw={500}>
                  {card.title}
                </Text>
              </Group>
              <Text fz="sm" mt="xs">
                {card.description}
              </Text>
            </Card.Section>
            <Group mt="auto">
              <Button
                component="a"
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                radius="md"
                style={{ flex: 1 }}
              >
                Abrir
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
      <Text size="xl" mt={12} mb={4}>Últimas publicações</Text>
      <BlogPostsList categories={["IA"]} />
    </>
  );
}