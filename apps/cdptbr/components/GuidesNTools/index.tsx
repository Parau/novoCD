"use client";

import {
  IconBlocks,
  IconWritingSign,
  IconLego,
} from '@tabler/icons-react';
import {
  Card,
  Group,
  SimpleGrid,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
//import { sendGTMEvent } from '@next/third-parties/google';
import classes from './GuidesNTools.module.css';
import {trackElementClick, parametersConstants } from '@repo/analytics';

const mockdata = [
  { title: 'Alfabetização', icon: IconWritingSign, color: 'violet', target: "", link: '/alfa/' },
  { title: 'Construções Criativas', icon: IconBlocks, color: 'indigo', target: "_blank", link: 'https://criatividade.digital/CCriativas/' },
  { title: 'Dicas LEGO® SPIKE™ Prime', icon: IconLego, color: 'blue', target: "_blank", link: 'https://lego.criatividade.digital/dicas/' },

];

export function GuidesNTools() {
  const theme = useMantineTheme();

  const items = mockdata.map((item) => (
    <UnstyledButton
      component="a"
      key={item.title}
      href={item.link}
      target={item.target}
      className={classes.item}
      onClick={() => trackElementClick({
        location: parametersConstants.elementLocation.GUIDENTOOLS_HOME,
        type: parametersConstants.elementType.NAVIGATION_BUTTON,
        text: item.title,
        url: item.link
      })}
    >
      <item.icon color={theme.colors[item.color]?.[6] ?? "#f8f9fa"} />
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