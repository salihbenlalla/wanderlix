import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgx from "@svgx/vite-plugin-qwik";
import replaceLinkIdsRehype from "./src/rehypePlugin";
// import replaceLinkIdsRehype from "./src/recmaPlugin";

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity({
        mdx: {
          providerImportSource: "src/components/MDXProvider",
          jsxRuntime: "automatic",
          jsxImportSource: "@builder.io/qwik",
          rehypePlugins: [replaceLinkIdsRehype],
          // recmaPlugins: [replaceLinkIdsRehype],
        },
      }),
      qwikVite(),
      tsconfigPaths(),
      svgx(),
    ],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});
