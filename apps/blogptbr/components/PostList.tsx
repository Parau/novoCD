"use client";

import { Card, Group, Badge, Button, Title, Text } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/lib/posts';

interface PostListProps {
  posts: Post[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {posts.map((post) => (
        <Card key={post.slug} shadow="sm" padding="lg" radius="md" withBorder>
          {post.thumb && (
            <Card.Section>
              <Image
                src={post.thumb}
                alt={post.title}
                width={400}
                height={200}
                style={{ objectFit: 'cover' }}
              />
            </Card.Section>
          )}
          <Group justify="space-between" mt="md" mb="xs">
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
  );
}
