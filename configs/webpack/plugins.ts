import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { ProgressPlugin, type WebpackPluginInstance } from 'webpack';

import type { WebpackOptions } from './lib/types';

export function plugins({ paths }: WebpackOptions): WebpackPluginInstance[] {
  return [
    new ProgressPlugin(),
    new HTMLWebpackPlugin({
      template: paths.html,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
  ];
}
