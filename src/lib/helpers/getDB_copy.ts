import {
  RequestEvent,
  RequestEventBase,
  type RequestEventAction,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Database } from "@miniflare/d1";
import path from "path";

// declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
//   interface PlatformCloudflarePages {
//     env: {
//       DB: D1Database;
//     }
//   }
// }

interface CreateGetDevDBOptions {
  isSSG: boolean | null
}

const createGetDevDB = async(options ?: CreateGetDevDBOptions) => {
  let getDevDb: () => Promise<D1Database> | void = () => {};

  if (import.meta.env.PROD) {
  // if (true) {
    const { D1Database, D1DatabaseAPI } = await import("@miniflare/d1");
    const { createSQLiteDB } = await import("@miniflare/shared");

    let devDb: D1Database;

    getDevDb = async () => {
      if (!devDb) {
        const sqlLite = await createSQLiteDB(
          path.join(
              process.cwd(),
              ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
              "6e80d6088f6ca11a8adb3037f967e619013a65977a2958584d8e3b54323d2613.sqlite"
          )
        );
        devDb = new D1Database(new D1DatabaseAPI(sqlLite));
      }
      return devDb;
    };
  }
  return getDevDb;
};

interface StaticOptions { static: boolean, node: string, env: Record<string, any> | undefined }

export const getDB = async (
  context:
    | RequestEventLoader<PlatformCloudflarePages | StaticOptions>
    | RequestEventAction<PlatformCloudflarePages | StaticOptions>
    | RequestEvent<PlatformCloudflarePages | StaticOptions>
    | RequestEventBase<PlatformCloudflarePages | StaticOptions>
    | undefined
): Promise<D1Database | void> => {

  if (context?.platform.env?.DB) {
    return context.platform.env.DB;
  }

  let isSSG: boolean | null = null

  if (context && "static" in context?.platform) {
    isSSG = true
  }

  const getDevDb = await createGetDevDB({isSSG});

  return getDevDb();
};
