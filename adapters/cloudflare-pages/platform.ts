import { D1Database, D1DatabaseAPI } from "@miniflare/d1";
import { createSQLiteDB } from "@miniflare/shared";
import path from "path";
import fs from "fs";

const getLatestSqliteFile = () => {
  const dbDir = path.join(
    process.cwd(),
    ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
  );
  const files = fs.readdirSync(dbDir);
  const sqliteFiles = files.filter((file) => file.endsWith(".sqlite"));
  return sqliteFiles.sort(
    (a, b) =>
      fs.statSync(path.join(dbDir, b)).mtime.getTime() -
      fs.statSync(path.join(dbDir, a)).mtime.getTime(),
  )[0];
};

// Then use it in your getDB function:
const sqliteFile = getLatestSqliteFile();

let devDb: D1Database | undefined;

const getDB = async () => {
  if (!devDb) {
    const sqlLite = await createSQLiteDB(
      path.join(
        process.cwd(),
        ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
        sqliteFile,
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
