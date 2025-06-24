import Image, { type ImageProps } from "next/image";
import { Button, Container, Group, Title, Box } from "@mantine/core";
import { meuTeste } from "@repo/nextjs-util";
import { pathWithBase } from "../lib/pathWithBase";


import { HeaderCD } from "../components/HeaderCD";

import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <HeaderCD />
    </>
  );
}
