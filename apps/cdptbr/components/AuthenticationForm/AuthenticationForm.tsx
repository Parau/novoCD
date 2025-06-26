"use client";
import React, { useState } from 'react';
import {
  Divider,
  Paper,
  PaperProps,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { MicrosoftButton } from './MicrosoftButton';
import { EmailButton } from './EmailButton';
import Link from 'next/link';

export interface AuthenticationFormProps extends PaperProps {
  handleLogin: (type: 'Google' | 'Microsoft' | 'Email', email?: string) => void;
}

export function AuthenticationForm({ handleLogin, ...props }: AuthenticationFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleGoogleClick = () => {
    handleLogin('Google');
  };

  const handleMicrosoftClick = () => {
    handleLogin('Microsoft');
  };

  const handleEmailClick = () => {
    if (!/^\S+@\S+$/.test(email)) {
      setEmailError('Digite um email válido.');
      return;
    }
    setEmailError('');
    console.log(`Função handleEmailClick acionada para ${email}`);
    handleLogin('Email', email);
  };

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      style={{ maxWidth: 400, margin: "auto" }}
      {...props}
    >
      <Text size="lg" fw={500}>
        Faça login na sua conta:
      </Text>

      <Stack mb="md" mt="md">
        <GoogleButton radius="xl" onClick={handleGoogleClick}>
          Google
        </GoogleButton>
        <MicrosoftButton radius="xl" onClick={handleMicrosoftClick}>
          Microsoft
        </MicrosoftButton>
      </Stack>

      <Divider
        label='Se a sua autenticação for do tipo "email link"'
        labelPosition="center"
        my="lg"
      />

      <Stack>
        <TextInput
          label="Email"
          placeholder="hello@seu-email.com"
          radius="md"
          error={emailError}
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
        <EmailButton radius="xl" onClick={handleEmailClick}>
          Login com email
        </EmailButton>
      </Stack>

      <Divider my="lg" />
      <Link href="/">
        <Text
          c="dimmed"
          size="sm"
          ta="center"
          mt="md"
          style={{ cursor: "pointer" }}
        >
          Voltar para a página inicial.
        </Text>
      </Link>
    </Paper>
  );
}