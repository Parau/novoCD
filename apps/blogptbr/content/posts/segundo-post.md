---
title: "Segundo Post: Explorando o Next.js"
date: "2024-01-20"
excerpt: "Neste segundo post, vamos explorar algumas funcionalidades interessantes do Next.js e como utilizá-las."
thumb: "/images/thumbs/segundo-post.svg"
---

# Explorando o Next.js
![dentro do post](./dentroPost2.svg)
No nosso segundo post, vamos falar sobre algumas funcionalidades interessantes do **Next.js**.

## App Router

O novo App Router do Next.js 13+ trouxe muitas melhorias:

- Layouts aninhados
- Loading states
- Error boundaries
- Server Components por padrão

## Static Site Generation

Uma das grandes vantagens do Next.js é a capacidade de gerar sites estáticos:

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
};
```

## Conclusão

O Next.js continua evoluindo e oferecendo excelentes ferramentas para desenvolvedores React.

Até o próximo post!
