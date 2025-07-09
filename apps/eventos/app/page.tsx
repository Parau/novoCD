"use client";
import { 
  Container, 
  Text, 
  Button, 
  Stack, 
  Group, 
  Title, 
  Box, 
  Grid, 
  Card, 
  Accordion, 
  List, 
  Avatar, 
  Anchor,
  Paper,
  Center,
  Divider,
  Overlay,
  rem
} from '@mantine/core';
import { 
  IconCalendar, 
  IconClock, 
  IconUser, 
  IconMapPin, 
  IconCheck, 
  IconQuestionMark,
  IconMinus,
  IconPlus
} from '@tabler/icons-react';
import { useAuth } from '@repo/firebase/AuthContext';
import nextConfig from '../next.config.js';
import classes from './page.module.css';
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
  subsets: ['latin'],
  // Load all the weights you plan to use on this page
  weight: ['400', '500', '700'],
});


export default function HomePage() {
  const basePath = nextConfig.basePath || '';
  const { user } = useAuth();

  const workshopModules = [
    {
      id: 'module-1',
      title: 'Parte 1 - O NOME PRÓPRIO NA ALFABETIZAÇÃO',
      description: 'Conheça como surgiu a proposta de utilizar o nome próprio como base do processo de alfabetização.',
      items: [
        { title: 'Importância do nome próprio', duration: '06:00' },
        { title: 'Alfabetização no Brasil', duration: '07:00' },
        { title: 'Exemplos de atividades usando o nome próprio', duration: '05:00' },
        { title: 'Perguntas e respostas', duration: '10:00' }
      ]
    },
    {
      id: 'module-2',
      title: 'Parte 2 - MÃO NA MASSA - ACESSANDO O POWERBOOK',
      description: 'Vamos colocar a mão na massa e liberar o seu acesso ao PowerBook contendo o material do workshop.',
      items: [
        { title: 'Criando a sua conta no Gmail', duration: '02:00' },
        { title: 'Liberando o acesso ao PowerBook', duration: '02:00' },
        { title: 'Perguntas e respostas', duration: '10:00' }
      ]
    },
    {
      id: 'module-3',
      title: 'Parte 3 - LIVRO O NOME DA GENTE',
      description: 'Vamos conhecer a versão impressa e digital do livro infantil O NOME DA GENTE.',
      items: [
        { title: 'Versão impressa', duration: '02:00' },
        { title: 'Versão digital', duration: '02:00' }
      ]
    },
    {
      id: 'module-4',
      title: 'Parte 4 - MÃO NA MASSA - PERSONALIZANDO O SEU LIVRO',
      description: 'Aprenda como criar e compartilhar a sua versão personalizada do livro digital O NOME DA GENTE.',
      items: [
        { title: 'Criar seu livro personalizado', duration: '10:00' },
        { title: 'Compartilhar o seu livro personalizado', duration: '02:00' },
        { title: 'Perguntas e respostas', duration: '05:00' }
      ]
    },
    {
      id: 'module-5',
      title: 'Parte 5 - ROTEIROS DE USO DO LIVRO DIGITAL ONDG',
      description: 'Conheça duas propostas de uso do livro digital O NOME DA GENTE com seus alunos.',
      items: [
        { title: 'Laboratório de informática', duration: '05:00' },
        { title: 'Leitura com a família', duration: '05:00' },
        { title: 'Perguntas e respostas', duration: '05:00' }
      ]
    },
    {
      id: 'module-6',
      title: 'Parte 6 - COMO GANHAR O SEU BADGE DE PARTICIPAÇÃO',
      description: 'Hora de aprender o que você deve fazer para ganhar a sua medalha (badge) de participação.',
      items: [
        { title: 'Como ganhar o seu badge', duration: '05:00' }
      ]
    },
    {
      id: 'module-7',
      title: 'BÔNUS - ESPECIAL PARA QUEM PARTICIPOU ATÉ O FINAL DO WORKSHOP',
      description: 'Para quem participou até o final do workshop temos algumas surpresas preparadas!!! 🙂',
      items: [
        { title: 'Bônus #1', duration: '05:00' },
        { title: 'Bônus #2', duration: '05:00' }
      ]
    }
  ];

  const faqItems = [
    {
      question: 'Onde acontece o workshop?',
      answer: 'O workshop será 100% online. Após a inscrição você receberá um link para acesso ao evento no Youtube.'
    },
    {
      question: 'Posso usar um celular para participar do workshop?',
      answer: 'Sim. Mas, recomendamos fortemente que você participe do workshop por meio de um computador do tipo desktop ou notebook. Isso facilitará durante as atividades mão na massa propostas.'
    },
    {
      question: 'Não recebi o e-mail de confirmação da inscrição.',
      answer: 'O e-mail de confirmação é enviado assim que você concluir o processo de inscrição. Não deixe de verificar se a mensagem não foi retida na caixa de spam do seu e-mail.'
    }
  ];

  return (
    <>
      <div
        className={classes.hero}
        style={{
          backgroundImage: `url(${basePath}/img/hero-bg.jpg)`,
        }}
      >
        <Overlay
          gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
          opacity={1}
          zIndex={0}
        />
        <Container className={classes.container} size="md">
          <Title className={classes.title} component="span">
            <span
              style={{
                color: "orange",
                fontFamily: "sans-serif",
                marginRight: 4,
              }}
            >
              {"{"}
            </span>
            <span
              style={{
                fontFamily: montserrat.style.fontFamily,
                fontWeight: 700,
                display: "inline-block",
                letterSpacing: "-1px",
              }}
            >
              Workshop
            </span>
            <span style={{ color: "orange", fontFamily: "sans-serif" }}>
              {"}"}
            </span>
            <br />
            <span
              style={{
                //fontFamily: montserrat.style.fontFamily,
                fontWeight: 400,
                display: "inline-block",
                letterSpacing: "-2px",
              }}
            >
              A IA pode ser sua aliada na alfabetização
            </span>
          </Title>
          <Text className={classes.description} size="xl" mt="lg">
            Primeiros passos para integrar inteligência artificial no cotidiano
            pedagógico.
          </Text>

          <Grid className={classes.infosEvento} mt="lg">
            <Grid.Col span={3}>
              <Stack align="center" gap="xs">
                <Group>
                  <IconCalendar size={24} />
                  <Text size="sm">Data</Text>
                </Group>
                <Text fw={500}>29 Mar - 20h00</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
              <Stack align="center" gap="xs">
                <Group>
                  <IconClock size={24} />
                  <Text size="sm">Duração</Text>
                </Group>
                <Text fw={500}>1h 30min</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
              <Stack align="center" gap="xs">
                <Group>
                  <IconUser size={24} />
                  <Text size="sm">Inscrição</Text>
                </Group>
                <Text fw={500}>GRATUITA</Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
              <Stack align="center" gap="xs">
                <Group>
                  <IconMapPin size={24} />
                  <Text size="sm">Local</Text>
                </Group>
                <Text fw={500}>100% online</Text>
              </Stack>
            </Grid.Col>
          </Grid>

          <Button
            variant="gradient"
            size="xl"
            radius="xl"
            className={classes.button}
          >
            Inscreva-se!
          </Button>
        </Container>
      </div>

      <Container size="lg" py="xl">
        <Paper
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%), url(${basePath}/img/hero-bg.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            borderRadius: rem(12),
          }}
          p="xl"
          mb="xl"
        >
          <Center>
            <Stack align="center" spacing="lg">
              <Text size="lg" weight={500}>
                Editora eTrix e APRENDER.digital apresentam
              </Text>

              <Title order={1} size="h1" align="center">
                <Text span color="yellow">
                  {"{"}
                </Text>
                <Text span mx="xs">
                  Workshop
                </Text>
                <Text span color="yellow">
                  {"}"}
                </Text>
                <br />
                <Text size="h2" mt="xs">
                  A Importância do Nome na Alfabetização
                </Text>
              </Title>

              <Grid mt="xl" className={classes.infoGridWhiteText}>
                <Grid.Col span={6} md={3}>
                  <Stack align="center" spacing="xs">
                    <IconCalendar size={24} />
                    <Text size="sm">Data</Text>
                    <Text weight={500}>29 Mar - 20h00</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} md={3}>
                  <Stack align="center" spacing="xs">
                    <IconClock size={24} />
                    <Text size="sm">Duração</Text>
                    <Text weight={500}>1h 30min</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} md={3}>
                  <Stack align="center" spacing="xs">
                    <IconUser size={24} />
                    <Text size="sm">Inscrição</Text>
                    <Text weight={500}>GRATUITA</Text>
                  </Stack>
                </Grid.Col>
                <Grid.Col span={6} md={3}>
                  <Stack align="center" spacing="xs">
                    <IconMapPin size={24} />
                    <Text size="sm">Local</Text>
                    <Text weight={500}>100% online</Text>
                  </Stack>
                </Grid.Col>
              </Grid>

              <Button
                size="lg"
                color="yellow"
                variant="filled"
                component="a"
                href="/reserva/?sim=1"
              >
                Inscreva-se AGORA!
              </Button>
            </Stack>
          </Center>
        </Paper>

        {/* About Section */}
        <Section title="Sobre o Workshop">
          <Stack spacing="md">
            <Text>
              Neste{" "}
              <Text span style={{ fontStyle: "italic" }}>
                workshop
              </Text>{" "}
              você vai conhecer como surgiu a proposta de uso do{" "}
              <Text span weight={700}>
                nome próprio
              </Text>{" "}
              como base do processo de alfabetização. Também vai conhecer
              exemplos de atividades pedagógicas usando o nome próprio.
            </Text>

            <Text>
              Por fim, em uma atividade{" "}
              <Text span weight={700}>
                mão na massa
              </Text>
              , vai aprender como o livro{" "}
              <Text span weight={700}>
                O NOME DA GENTE
              </Text>{" "}
              pode ser utilizado em uma atividade muito legal que, além de
              contribuir no processo de alfabetização, também ajuda a
              desenvolver em seus alunos o gosto pela leitura.
            </Text>

            <Center>
              <List
                spacing="xs"
                size="sm"
                icon={<IconCheck size={16} color="green" />}
              >
                <List.Item>O nome próprio na alfabetização.</List.Item>
                <List.Item>Atividades usando o nome próprio.</List.Item>
                <List.Item>
                  Conhecendo o livro O NOME DA GENTE (ONDG).
                </List.Item>
                <List.Item>
                  Usando o livro digital ONDG no laboratório de informática.
                </List.Item>
                <List.Item>
                  Usando o livro digital ONDG como atividade "de casa".
                </List.Item>
              </List>
            </Center>

            <Center>
              <Button size="md" component="a" href="/reserva/?sim=1">
                Inscreva-se AGORA!
              </Button>
            </Center>
          </Stack>
        </Section>

        {/* Agenda Section */}
        <Section title="Agenda do WORKSHOP">
          <Accordion
            variant="separated"
            defaultValue={[
              "module-1",
              "module-2",
              "module-3",
              "module-4",
              "module-5",
              "module-6",
            ]}
            multiple
          >
            {workshopModules.map((module) => (
              <Accordion.Item key={module.id} value={module.id}>
                <Accordion.Control icon={<IconMinus size={16} />}>
                  {module.title}
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack spacing="sm">
                    <Text size="sm" color="dimmed">
                      {module.description}
                    </Text>
                    {module.items.map((item, index) => (
                      <Group
                        key={index}
                        position="apart"
                        p="sm"
                        style={{ borderBottom: "1px solid #eee" }}
                      >
                        <Text size="sm">
                          <Text span color="dimmed" mr="xs">
                            {index + 1}.{module.id.split("-")[1]}
                          </Text>
                          {item.title}
                        </Text>
                        <Text size="sm" color="dimmed">
                          {item.duration}
                        </Text>
                      </Group>
                    ))}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>

          <Center mt="xl">
            <Button size="md" component="a" href="/reserva/?sim=1">
              Inscreva-se AGORA!
            </Button>
          </Center>
        </Section>

        {/* Requirements Section */}
        <Section title="Para quem é este WORKSHOP?">
          <Text>
            Pensamos este{" "}
            <Text span style={{ fontStyle: "italic" }}>
              workshop
            </Text>{" "}
            para educadoras e educadores que atuam em turmas da Educação
            Infantil ou séries iniciais do Ensino Fundamental.
          </Text>
          <Text>
            O{" "}
            <Text span style={{ fontStyle: "italic" }}>
              workshop
            </Text>{" "}
            é 100% online via Youtube. Apesar de ser possível participar usando
            o seu celular, recomendamos que você participe por meio de um
            computador do tipo{" "}
            <Text span style={{ fontStyle: "italic" }}>
              desktop
            </Text>{" "}
            ou{" "}
            <Text span style={{ fontStyle: "italic" }}>
              notebook
            </Text>
            .
          </Text>
        </Section>

        {/* Tutor Section */}
        <Paper
          p="xl"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
          radius="md"
        >
          <Grid align="center">
            <Grid.Col span={12} md={3}>
              <Center>
                <Stack align="center" spacing="sm">
                  <Avatar
                    src="/parahuari-branco.jpg"
                    size={120}
                    radius="md"
                    alt="Parahuari Branco"
                  />
                  <Text weight={500}>Parahuari Branco</Text>
                </Stack>
              </Center>
            </Grid.Col>
            <Grid.Col span={12} md={9}>
              <Stack spacing="md">
                <Title order={3} color="white">
                  Facilitador deste{" "}
                  <Text span style={{ fontStyle: "italic" }}>
                    workshop
                  </Text>
                </Title>
                <Text>
                  Parahuari é apaixonado pela área de educação. Ele tem mais de
                  20 anos de experiência no desenvolvimento de soluções
                  tecnológicas voltadas à aprendizagem. Ao longo desses anos,
                  Parahuari teve a oportunidade de desempenhar diferentes papéis
                  como professor, programador, autor, designer instrucional,
                  gerente de projetos e pesquisador.
                </Text>
                <Text>
                  Parau, como também é chamado, trabalhou no desenvolvimento de
                  diferentes tipos de soluções educativas como portais
                  educacionais, livros didáticos digitais, simulações, sistemas
                  adaptativos e jogos educativos. Agora ele está envolvido na
                  pesquisa e desenvolvimento de soluções que incentivam a
                  leitura e promovem a criatividade digital.
                </Text>
                <Text>
                  Parahuari acredita que melhorar a educação é também melhorar o
                  mundo.
                </Text>
                <Group>
                  <Anchor
                    href="https://www.linkedin.com/in/parau/"
                    target="_blank"
                    color="white"
                  >
                    LinkedIn
                  </Anchor>
                  <Anchor
                    href="https://twitter.com/Parau"
                    target="_blank"
                    color="white"
                  >
                    Twitter
                  </Anchor>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        <Center mt="xl">
          <Button size="md" component="a" href="/reserva/?sim=1">
            Inscreva-se AGORA!
          </Button>
        </Center>

        {/* FAQ Section */}
        <Paper
          p="xl"
          style={{ backgroundColor: "#f8f9fa" }}
          radius="md"
          mt="xl"
        >
          <Grid>
            <Grid.Col span={12} md={3}>
              <Stack spacing="md">
                <Title order={3}>FAQ</Title>
                <Text size="sm">
                  Não encontrou a resposta que precisava?{" "}
                  <Anchor href="mailto:equipe.aprender.digital@gmail.com?subject=Workshop Nome na Alfabetização">
                    Mande um e-mail pra nós
                  </Anchor>
                  .
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={12} md={9}>
              <Stack spacing="lg">
                {faqItems.map((item, index) => (
                  <div key={index}>
                    <Group spacing="sm" mb="xs">
                      <IconQuestionMark size={16} color="blue" />
                      <Text weight={500}>{item.question}</Text>
                    </Group>
                    <Text size="sm" color="dimmed" pl="xl">
                      {item.answer}
                    </Text>
                  </div>
                ))}
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Footer */}
        <Box mt="xl" pt="xl">
          <Divider mb="md" />
          <Center>
            <Text size="sm" color="dimmed">
              eTrix + APRENDER.digital — Designed with ❤️ by{" "}
              <Anchor href="http://themes.3rdwavemedia.com" target="_blank">
                Xiaoying Riley
              </Anchor>
            </Text>
          </Center>
        </Box>
      </Container>
    </>
  );
}

// Helper component for sections
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Stack spacing="lg" mb="xl">
      <Title order={2} mb="md">{title}</Title>
      {children}
    </Stack>
  );
}

// Mantine commonly supports these options for the `size` prop:
// 'xs', 'sm', 'md', 'lg', 'xl'

// Example usage:
// <Button size="xs" />
// <Button size="sm" />
// <Button size="md" />
// <Button size="lg" />
// <Button size="xl" />

// The same options apply to most Mantine components that accept a `size` prop.
