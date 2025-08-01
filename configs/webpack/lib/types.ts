export type WebpackMode = 'development' | 'production';

export type WebpackPaths = {
  entry: string;
  dist: string;
  html: string;
};

export type WebpackOptions = {
  mode: WebpackMode;
  port: number;
  paths: WebpackPaths;
};
