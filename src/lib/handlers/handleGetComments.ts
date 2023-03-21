import { RequestEventLoader } from "@builder.io/qwik-city";
import type { Comment } from "./db";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database, D1Result } from "@miniflare/d1";
import { getDB } from "../helpers/getDB";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const handleGetComments = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  if (DB) {
    const { results } = (await DB.prepare(
      "SELECT * FROM Comments"
    ).all()) as D1Result<Comment>;

    const results2: Comment[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2;
  }
};
