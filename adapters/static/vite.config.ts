import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";
import baseConfig from "../../vite.config";

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
      minify: false,
      sourcemap: true,
    },
    plugins: [
      staticAdapter({
        origin: "http://127.0.0.1:8787",
        serverData: { x: "Hello World" },
      }),
    ],
  };
});
