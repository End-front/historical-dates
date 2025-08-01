import webpack from 'webpack';
import path from "path";
import type { EnvObject } from './configs/env';
import { type WebpackPaths, createWebpackConfig } from './configs/webpack';

const __dirname = path.resolve();

export default (env: EnvObject) => {
    const mode = env.mode || 'development';
    const port = env.port || 3000
    const paths: WebpackPaths = {
        entry: path.resolve(__dirname, 'src', 'app', 'main.tsx'),
        dist: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }

    const config: webpack.Configuration = createWebpackConfig({
        mode,
        paths,
        port,
    })

    return config;
};


