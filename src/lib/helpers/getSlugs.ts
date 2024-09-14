import { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import type { D1Database, D1Result } from "@miniflare/d1";
// import fs from "fs";
// import path from "path";

import slugs from "~/data/slugs.json";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

interface SlugResult {
  slug: string;
}

export const getSlugsFromDB = async (DB: D1Database | void) => {
  if (!DB) {
    throw new Error("getSlugs: database not found");
  }

  try {
    const { results } = (await DB.prepare(
      `SELECT slug FROM Posts`
    ).all()) as D1Result<SlugResult[]>;
    
    if (!results || !results?.length) {
      throw new Error(`getSlugs: slugs not found`);
    }

    const results2: SlugResult[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2.map((el) => el.slug);
  } catch (error) {
    console.error(`getSlugs: Error while trying to get slugs`, error);
  }
};

interface getSlugsOpts {
    env: EnvGetter;
    platform: Record<string, any>;
}

export const getSlugs = async (opts: getSlugsOpts) => {
  return await getSlugsFromDB(opts.platform.env.DB)
};
