import { type RequestEventLoader } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database, D1Result } from "@miniflare/d1";
import { getDB } from "./getDB";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export interface Tag {
  name: string;
  url: string;
}

export const getTags = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  if (DB) {
    const { results } = (await DB.prepare(
      `SELECT Tags.name, Tags.url FROM Tags LIMIT 10`
    ).all()) as D1Result<Tag>;

    const results2: Tag[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2;
  }
};

export const getTag = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  const tagUrl = decodeURI(ev.pathname.substr(0, ev.pathname.length - 1));

  if (DB) {
    const { results } = (await DB.prepare(`SELECT * FROM Tags WHERE url = ?`)
      .bind(tagUrl)
      .all()) as D1Result<Tag>;

    const results2: Tag[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2[0];
  }
};
