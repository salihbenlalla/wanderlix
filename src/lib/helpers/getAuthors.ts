import { type RequestEventLoader } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database, D1Result } from "@miniflare/d1";
import { getDB } from "./getDB";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export interface Author {
  name: string;
  url: string;
  bio: string;
  avatarUrl: string;
  imageUrl: string;
}

export const getAuthors = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  if (DB) {
    const { results } = (await DB.prepare(
      `SELECT * FROM Authors LIMIT 10`
    ).all()) as D1Result<Author>;

    const results2: Author[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2;
  }
};

export const getAuthor = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
): Promise<Author> => {
  const DB = await getDB(ev);
  if (!DB) {
    throw new Error("DB was null");
  }
  const authorSlug = decodeURI(ev.pathname).split("/")[2];
  const authorUrl = decodeURI(`/author/${authorSlug}`);
  if (!authorUrl) {
    throw new Error("authorUrl is empty");
  }
  const { results } = (await DB.prepare(
    `SELECT * FROM Authors WHERE url = '${authorUrl}'`
  ).all()) as D1Result<Author>;

  const results2: Author[] = JSON.parse(JSON.stringify(results)) ?? [];
  if (!results2 || results2.length === 0) {
    throw new Error(`No author found for ${authorUrl}`);
  }
  return results2[0];
};
