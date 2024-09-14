import type { D1Database, D1Result } from "@miniflare/d1";
import { LinkObj } from "~/data/dataContext";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const getLink = async (DB: D1Database, linkId: number) => {
  if (!DB) {
    throw new Error("getLink: database not found");
  }

  try {
    const { results } = (await DB.prepare(`SELECT * FROM Links WHERE id = ?`)
      .bind(linkId)
      .all()) as D1Result<LinkObj>;

    if (!results || !results?.length) {
      throw new Error(`link with id: ${linkId} is not found`);
    }

    const results2: LinkObj[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2[0];
  } catch (error) {
    console.error(`getLink linkId: ${linkId}`, error);
  }
};
