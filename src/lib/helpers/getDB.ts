import {
  type RequestEventAction,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Database } from "@miniflare/d1";

const createGetDevDB = async () => {
  let getDevDb: () => Promise<D1Database> | void = () => {};

  if (import.meta.env.DEV) {
    const { D1Database, D1DatabaseAPI } = await import("@miniflare/d1");
    const { createSQLiteDB } = await import("@miniflare/shared");

    let devDb: D1Database;

    getDevDb = async () => {
      if (!devDb) {
        const sqlLite = await createSQLiteDB(".wrangler/state/d1/DB.sqlite3");
        devDb = new D1Database(new D1DatabaseAPI(sqlLite));
      }
      return devDb;
    };
  }
  return getDevDb;
};

export const getDB = async (
  context:
    | RequestEventLoader<PlatformCloudflarePages>
    | RequestEventAction<PlatformCloudflarePages>
) => {
  if (context.platform.DB) {
    return context.platform.DB;
  }
  const getDevDb = await createGetDevDB();

  return getDevDb();
};
