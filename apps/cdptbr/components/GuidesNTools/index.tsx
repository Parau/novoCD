"use client";

import {
  IconBlocks,
  IconWritingSign,
  IconLego,
} from '@tabler/icons-react';
import {
  Anchor,
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import classes from './GuidesNTools.module.css';

const mockdata = [
  { title: 'Alfabetização', icon: IconWritingSign, color: 'violet', target: "_blank", link: 'https://criatividade.digital/alfabetizar/' },
  { title: 'Construções Criativas', icon: IconBlocks, color: 'indigo', target: "_blank", link: 'https://criatividade.digital/CCriativas/' },
  { title: 'Dicas LEGO® SPIKE™ Prime', icon: IconLego, color: 'blue', target: "_blank", link: 'https://lego.criatividade.digital/dicas/' },

];

export function GuidesNTools() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton component="a" key={item.title} href={item.link} target={item.target} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size={32} />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group justify="space-between">
        <Text className={classes.title}>Guias e Ferramentas</Text>
        {/*<Anchor size="xs" c="dimmed" style={{ lineHeight: 1 }}>
          + 21 other services
        </Anchor>
        */}
      </Group>
      <SimpleGrid cols={3} mt="xs">
        {items}
      </SimpleGrid>
    </Card>
  );
}