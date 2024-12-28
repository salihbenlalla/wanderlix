import { cloudflarePagesAdapter } from "@salihbenlalla/qwik-city/adapters/cloudflare-pages/vite";
import { extendConfig } from "@salihbenlalla/qwik-city/vite";
import baseConfig from "../../vite.config";
import { getOrigin } from "../../src/lib/helpers/getOrigin";

export default extendConfig(baseConfig, () => {

  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["src/entry.cloudflare-pages.tsx", "@qwik-city-plan"],
      },
    },
    
    plugins: [cloudflarePagesAdapter({
      ssg: {
        origin: getOrigin(),
        include: ["/*"],
        exclude: [
          "/search/*",
          "/comments/*",
          "/contact-message/*",
          "/images/*",
          "/newsletter/*"
        ],
      },
    })],
  };
});
