import type { Configuration as WebpackConfiguration } from 'webpack';

import { isDev } from './lib/is-dev';
import type { WebpackOptions } from './lib/types';
import { plugins } from './plugins';
import { resolvers } from './resolvers';
import { loaders } from './loaders';
import { devServer } from './dev-server';

export function webpackConfig(options: WebpackOptions): WebpackConfiguration {
  return {
    mode: options.mode,
    entry: options.paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: options.paths.dist,
      clean: true,
    },
    plugins: plugins(options),
    module: {
      rules: loaders(options),
    },
    resolve: resolvers(options),
    devtool: isDev(options.mode) ? 'inline-source-map' : undefined,
    devServer: isDev(options.mode) ? devServer(options) : undefined,
  };
}
