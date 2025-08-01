import type { RuleSetRule } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { WebpackOptions } from "./lib/types";
import { isDev } from "./lib/is-dev";

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
                        localIdentName: isDev(mode) ? '[name]__[hash:base64:8]' : '[hash:base64:8]'
                    },
                }
            },
            'sass-loader',
        ]
    }

    const typescriptLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        typescriptLoader,
        cssLoader,
    ]
}
