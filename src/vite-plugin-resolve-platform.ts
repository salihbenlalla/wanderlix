import path from "path";
import { type Plugin } from "vite";

const PLATFORM = "@platform";

function resolvePlatform(): Plugin {
  return {
    name: "vite-plugin-resolve-platform",
    enforce: "pre",

    resolveId(id) {
      if (id === PLATFORM) {
        return path.resolve(
          process.cwd(),
          "/adapters/cloudflare-pages/platform",
        );
      }
    },
  };
}

export default resolvePlatform;
