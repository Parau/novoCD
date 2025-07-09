import { Text } from '@mantine/core';
import { BlogPostsList } from "../components/BlogPostsList";
import { HeaderCD } from "../components/HeaderCD";
import { GuidesNTools } from "../components/GuidesNTools";

export default function HomePage() {
  return (
    <>
      <HeaderCD />
      <GuidesNTools />
      <Text size="xl" mt={12} mb={4}>Últimas publicações</Text>
      <BlogPostsList />
    </>
  );
}
