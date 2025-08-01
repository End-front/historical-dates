import type { WebpackMode } from './types';

export function isDev(mode: WebpackMode) {
  return mode === 'development';
}
