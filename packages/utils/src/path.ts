/**
 * Prefixes a given path with a basePath.
 * @param basePath The base path from the router, which can be an empty string.
 * @param path The path to prefix.
 * @returns The path with the base path, e.g., /my-base/my-path
 */
export function pathWithBase( basePath: string, path: string): string {
  //Para poder transformar em biblioteca tive que transformar o uso do nextConfig.basePath
  // em um parâmetro da função, pois o nextConfig não é acessível aqui.
  // para passar o parametro você pode:
  // 1. importar o nextConfig  (import nextConfig from '../next.config.js';)
  // 1. passar o basePath (nextConfig.basePath)
  return `${basePath || ''}${path}`;
}

