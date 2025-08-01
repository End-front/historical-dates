import type { ResolveOptions } from 'webpack';

import type { WebpackOptions } from './lib/types';

export function resolvers(_: WebpackOptions): ResolveOptions {
  return {
    extensions: ['.tsx', '.ts', '.js'],
  };
}
