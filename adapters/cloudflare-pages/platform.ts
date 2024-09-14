import { D1Database, D1DatabaseAPI } from "@miniflare/d1";
import { createSQLiteDB } from "@miniflare/shared";
import path from "path";

let devDb: D1Database | undefined;

const getDB = async () => {
  if (!devDb) {
    const sqlLite = await createSQLiteDB(
      path.join(
        process.cwd(),
        ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
        "6e80d6088f6ca11a8adb3037f967e619013a65977a2958584d8e3b54323d2613.sqlite",
      ),
    );
    devDb = new D1Database(new D1DatabaseAPI(sqlLite));
  }
  return devDb;
};

const getPlatform = async () => {
  const DB = await getDB();
  return {
    env: {
      DB,
    },
  };
};

export default getPlatform;
