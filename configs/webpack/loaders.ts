import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import type { RuleSetRule } from 'webpack';

import { isDev } from './lib/is-dev';
import type { WebpackOptions } from './lib/types';

export function loaders({ mode }: WebpackOptions): RuleSetRule[] {
  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes('.module.')),
            localIdentName: isDev(mode) ? '[name]__[hash:base64:8]' : '[hash:base64:8]',
            namedExport: false,
          },
        },
      },
      'sass-loader',
    ],
  };

  const typescriptLoader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          getCustomTransformers: () => ({
            before: [isDev(mode) && ReactRefreshTypeScript()].filter(Boolean),
          }),
          transpileOnly: isDev(mode),
        },
      },
    ],
  };

  return [typescriptLoader, cssLoader];
}
