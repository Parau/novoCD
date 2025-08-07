'use client';
import { Anchor, Container, Group } from '@mantine/core';
import { use, useEffect, useRef } from 'react';
import classes from './Footer.module.css';

const links = [
  { link: '/about.html', label: 'Sobre' },
  { link: '/privacidade/cd.html', label: 'Privacidade' },
];

function ObfuscatedContact() {
  const contactRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (contactRef.current) {
      const parts = ['criatividade', 'digital', 'infos'];
      const domain = parts[0] + '.' + parts[1];
      const box = parts[2] + '@' + domain;

      const clickable = document.createElement('a');
      clickable.href = 'mailto:' + box;
      clickable.textContent = 'Contato';
      clickable.style.color = 'var(--mantine-color-dimmed)';
      clickable.style.fontSize = 'var(--mantine-font-size-sm)';
      clickable.style.textDecoration = 'none';

      contactRef.current.textContent = '';
      contactRef.current.appendChild(clickable);
    }
  }, []);

  return <span ref={contactRef}>Contato</span>;
}

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      size="sm"
      target="_blank"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>
          {items}
          <ObfuscatedContact />
        </Group>
      </Container>
    </div>
  );
}