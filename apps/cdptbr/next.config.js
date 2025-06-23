/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/testedocs',
  trailingSlash: true, //Vou começar o projeto assim para tentar evitar problemas com a indexação do google, pode ser que dê problema na versão atual do meu componente de blog
};

export default nextConfig;

