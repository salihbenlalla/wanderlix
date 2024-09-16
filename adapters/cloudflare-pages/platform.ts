import { D1Database, D1DatabaseAPI } from "@miniflare/d1";
import { createSQLiteDB } from "@miniflare/shared";
import path from "path";
import fs from "fs";

// Function to check if the file is an SQLite database
function isSQLiteFile(filePath: string): boolean {
  try {
    // Get file stats
    const stats = fs.statSync(filePath);

    // Check if the file is empty
    if (stats.size === 0) {
      return false; // It's an empty document
    }

    // Read the first 16 bytes to check for the SQLite header
    const buffer = Buffer.alloc(16);
    const fd = fs.openSync(filePath, "r");
    fs.readSync(fd, buffer, 0, 16, 0);
    fs.closeSync(fd);

    const header = buffer.toString();

    // Return true if the file is an SQLite database, false otherwise
    return header === "SQLite format 3\0";
  } catch (err) {
    console.error(
      `Error processing file ${filePath}, to check if it's an sql file:`,
      err,
    );
    return false; // Return false if there's an error (e.g., file not found)
  }
}

const getLatestSqliteFile = (): string => {
  const dbDir = path.join(
    process.cwd(),
    ".wrangler/state/v3/d1/miniflare-D1DatabaseObject",
  );
  const files = fs.readdirSync(dbDir);
  const sqliteFiles = files.filter((file) => file.endsWith(".sqlite"));

  for (let file of sqliteFiles) {
    if (isSQLiteFile(path.join(dbDir, file))) {
      return file;
    }
  }

  return sqliteFiles.sort(
    (a, b) =>
      fs.statSync(path.join(dbDir, b)).mtime.getTime() -
      fs.statSync(path.join(dbDir, a)).mtime.getTime(),
  )[1];
};

// Then use it in your getDB function:
const sqliteFile = getLatestSqliteFile();

let devDb: D1Database | undefined;

const getDB = async () => {
  if (!devDb && sqliteFile) {
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
