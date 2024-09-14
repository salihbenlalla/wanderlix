import { type D1Database } from "@miniflare/d1";
import path from "path";


const createGetDevDB = async() => {
  let getDevDb: () => Promise<D1Database> | void = () => { };
  
  // if (import.meta.env.DEV) {
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
      )
        devDb = new D1Database(new D1DatabaseAPI(sqlLite));
      }
      return devDb;
    };
  // }
  return getDevDb;
};

export default createGetDevDB
