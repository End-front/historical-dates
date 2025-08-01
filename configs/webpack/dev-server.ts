import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import type { WebpackOptions } from "./lib/types";

export function devServer({ port }: WebpackOptions): DevServerConfiguration {
    return {
        port,
        open: true,
    }
}

