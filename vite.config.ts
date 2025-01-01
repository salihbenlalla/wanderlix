/**
 * This is the base config for vite.
 * When building, the adapter config is used which loads this file and extends it.
 */
import { defineConfig, type UserConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@salihbenlalla/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";
import svgx from "@svgx/vite-plugin-qwik";
import resolvePlatform from "./src/vite-plugin-resolve-platform";
import replaceLinkIdsRehype from "./src/rehypePlugin";
import createGetDevDB from "./src/lib/helpers/createGetDevDB";
import { suppress403Errors } from "./src/vitePluginSupressErrors";
// import { partytownVite } from "@builder.io/partytown/utils";
const { dependencies = {}, devDependencies = {} } = pkg as any as {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  [key: string]: unknown;
};
/**
 * Note that Vite normally starts from `index.html` but the qwikCity plugin makes start at `src/entry.ssr.tsx` instead.
 */

export default defineConfig(async ({ command, mode }): Promise<UserConfig> => {
  const DB = await (await createGetDevDB())();
  return {
    plugins: [
      resolvePlatform(),
      qwikCity({
        mdx: {
          providerImportSource: "~/components/MDXProvider/",
          jsxRuntime: "automatic",
          jsxImportSource: "@builder.io/qwik",
          rehypePlugins: [[replaceLinkIdsRehype, DB]],
        },
        platform: {
          env: {
            DB: DB,
          },
        },
      }),
      qwikVite({
        entryStrategy: {
          type: "smart",
          manual: {
            ...bundle("initialbundle", [
              "_hW",
              "s_LcO2OGTEA00",
              "s_OvpTnKZsgbw",
              "s_e0Qzq1fIk78",
              "s_OvpTnKZsgbw",
            ]),
          },
        },
      }),
      tsconfigPaths(),
      svgx(),
      suppress403Errors(),
      // partytownVite({ dest: join(__dirname, "dist", "~partytown") }),
    ],
    define: {
      "import.meta.env.PUBLIC_CF_PAGES_URL": JSON.stringify(
        process.env.CF_PAGES_URL,
      ),
    },
    build: {
      minify: "esbuild",
      target: "es2020",
      cssMinify: true,
      rollupOptions: {
        external: [
          "better-sqlite3",
          "@miniflare/d1",
          "@miniflare/core",
          "@miniflare/shared",
          "@iarna/toml",
        ],
        output: {
          // manualChunks(id) {
          //   if (id.includes("@builder.io/qwik") || id.includes("@salihbenlalla/qwik-city")) {
          //     return "vendor";
          //   }
          //   if (id.includes("@modular-forms/qwik")) {
          //     return "forms";
          //   }
          //   if (id.includes("dateformat") || id.includes("uuid") || id.includes("valibot")) {
          //     return "utils";
          //   }
          // },
        },
      },
    },
    // This tells Vite which dependencies to pre-build in dev mode.
    optimizeDeps: {
      // Put problematic deps that break bundling here, mostly those with binaries.
      // For example ['better-sqlite3'] if you use that in server functions.
      exclude: [
        "better-sqlite3",
        "@miniflare/d1",
        "@miniflare/shared",
        "miniflare",
        "@builder.io/qwik",
        "@salihbenlalla/qwik-city",
      ],
    },
    // This tells Vite how to bundle the server code.
    ssr:
      command === "build" && mode === "production"
        ? {
            // All dev dependencies should be bundled in the server build
            noExternal: Object.keys(devDependencies),
            // Anything marked as a dependency will not be bundled
            // These should only be production binary deps (including deps of deps), CLI deps, and their module graph
            // If a dep-of-dep needs to be external, add it here
            // For example, if something uses `bcrypt` but you don't have it as a dep, you can write
            // external: [...Object.keys(dependencies), 'bcrypt']
            external: [
              ...Object.keys(dependencies),
              // "@miniflare/d1",
              // "@miniflare/core",
              // "@miniflare/shared",
              // "@iarna/toml",
              // "esbuild",
              // "./src/lib/helpers/createGetDevDB"
            ],
          }
        : undefined,
    server: {
      headers: {
        // Don't cache the server response in dev mode
        "Cache-Control": "public, max-age=0",
      },
      watch: {
        ignored: ["./src/routes/**/*.mdx"],
      },
      preTransformRequests: false,
      // from previous project
      // hmr: {
      //   clientPort: 5173,
      // }
    },
    preview: {
      headers: {
        // Do cache the server response in preview (non-adapter production build)
        "Cache-Control": "public, max-age=600",
      },
    },
    // from previous project
    // build: {
    //   minify: true,
    //   sourcemap: false,
    //   // rollupOptions: {
    //   //   external: ["src/lib/helpers/createGetDevDB.ts", "src/lib/helpers/getDB_copy.ts", "esbuild", "@miniflare/d1", "@miniflare/core", "@miniflare/shared", "@iarna/toml"]
    //   // }
    // },
    resolve: {
      // alias: [
      //   { find: /^@builder\.io\/qwik(.*)$/, replacement: '@builder/qwik$1' }
      // ]
      alias: {
        "@builder.io/qwik-city": "@salihbenlalla/qwik-city",
      },
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
  };
});
function bundle(bundleName: string, symbols: string[]) {
  return symbols.reduce(
    (obj, key) => {
      // Sometimes symbols are prefixed with `s_`, remove it.
      obj[key.replace("s_", "")] = obj[key] = bundleName;
      return obj;
    },
    {} as Record<string, string>,
  );
}
