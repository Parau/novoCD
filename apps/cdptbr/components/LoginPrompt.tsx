import { Anchor, Text } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export const LoginPrompt = ({ redirectPath }: { redirectPath: string }) => (
  <Text
    size="xs"
    c="blue"
    bg="#e8f4fd"
    px="md"
    py={8}
    mb="md"
    style={{ display: "flex", alignItems: "center", gap: 8, borderRadius: "var(--mantine-radius-md)" }}
  >
    <IconInfoCircle size={18} style={{ flexShrink: 0 }} />
    Para ver seus conteúdos,{' '}
    <Anchor href={`/login?redirect=${redirectPath}`} underline="always">
      faça login
    </Anchor>
    {' '}na sua conta.
  </Text>
);

