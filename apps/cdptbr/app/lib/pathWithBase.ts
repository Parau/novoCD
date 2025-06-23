import nextConfig from '../../next.config.js';

export function pathWithBase(path: string) {
  // nextConfig.basePath pode ser undefined
  return `${nextConfig.basePath || ''}${path}`;
}
