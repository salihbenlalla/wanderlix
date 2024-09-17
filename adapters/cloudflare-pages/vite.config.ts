import { cloudflarePagesAdapter } from "@salihbenlalla/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@salihbenlalla/qwik-city/vite";
import baseConfig from "../../vite.config";
// import createGetDevDB from "../../src/lib/helpers/createGetDevDB";

export default extendConfig(baseConfig, () => {

  // const DB = await (await createGetDevDB())()

  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
        // external: ["esbuild", "@miniflare/d1", "@miniflare/core", "@miniflare/shared", "@iarna/toml", "wrangler", "./src/lib/helpers/createGetDevDB.ts"],
      },
    },
    plugins: [cloudflarePagesAdapter({
      ssg: {
        include: ["/*"],
        serverData: { x: "Hello World" },
        // maxWorkers: 0,
        // platform: {
        //   env: {DB}
        // }
      },
    })],
  };
});
