import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgx from "@svgx/vite-plugin-qwik";
import viteCompression from "vite-plugin-compression";
import replaceLinkIdsRehype from "./src/rehypePlugin";
import ViteCspPlugin from "vite-plugin-csp";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        mdx: {
          providerImportSource: "src/components/MDXProvider",
          jsxRuntime: "automatic",
          jsxImportSource: "@builder.io/qwik",
          rehypePlugins: [replaceLinkIdsRehype],
        },
      }),
      qwikVite(),
      tsconfigPaths(),
      svgx(),
      viteCompression(),
      ViteCspPlugin(),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    // build: {
    //   minify: false,
    //   sourcemap: true,
    // },
    server: {
      hmr: {
        clientPort: 5173,
      },
    },
  };
});
