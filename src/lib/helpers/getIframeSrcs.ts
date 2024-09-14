import type { D1Database, D1Result } from "@miniflare/d1";
import { LinkObj, SrcObj } from "~/data/dataContext";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const getIframeSrc = async (DB: D1Database, srcId: number) => {
  if (!DB) {
    throw new Error("getIframeSrc: database not found");
  }

  try {
    const { results } = (await DB.prepare(
      `SELECT * FROM IframeSrcs WHERE id = ?`
    )
      .bind(srcId)
      .all()) as D1Result<SrcObj>;

    if (!results || !results?.length) {
      throw new Error(`iframe src with id: ${srcId} is not found`);
    }

    const results2: SrcObj[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2[0];
  } catch (error) {
    console.error(`getIframeSrc linkId: ${srcId}`, error);
  }
};
