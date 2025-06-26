import { BlogPostsList } from "../components/BlogPostsList";


import { HeaderCD } from "../components/HeaderCD";

import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';

export default function HomePage() {
  return (
    <>
      <HeaderCD />
      <BlogPostsList />
    </>
  );
}
