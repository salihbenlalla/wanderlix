import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgx from "@svgx/vite-plugin-qwik";

export default defineConfig(async () => {
  return {
    ssr: {
      target: "webworker",
      // noExternal: true,
    },
    plugins: [
      qwikCity({
        mdx: {
          providerImportSource: "src/components/MDXProvider",
        },
      }),
      qwikVite(),
      tsconfigPaths(),
      // mdx()
      svgx(),
    ],
    // assetsInclude: ["**/*.svg"],
  };
});
