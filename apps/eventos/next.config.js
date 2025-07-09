/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  //basePath: '/testedocs',
  trailingSlash: true, //Vou começar o projeto assim para tentar evitar problemas com a indexação do google, pode ser que dê problema na versão atual do meu componente de blog
    // Opcional: para evitar problemas de renderização dupla no modo de desenvolvimento
  reactStrictMode: false, //Desliguei porque no loginlink ele estava dando erro de renderização dupla, parece que O useEffect está rodando duas vezes porque, no Next.js (especialmente em modo de desenvolvimento), o React ativa o Strict Mode, que executa efeitos duas vezes para ajudar a identificar efeitos colaterais não idempotentes. Troque para false e parou de rodar duas vezes.
};

export default nextConfig;

