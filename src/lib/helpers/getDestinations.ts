import { type RequestEventLoader } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database, D1Result } from "@miniflare/d1";
import { getDB } from "./getDB";
import { Destination } from "~/components/SideBar/DestinationsWidget";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const getDestinations = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  if (DB) {
    const { results } = (await DB.prepare(
      `SELECT countryName, count
       FROM (
       SELECT Countries.name AS countryName, COUNT(Posts.id) AS count
       FROM posts
       LEFT JOIN Countries ON Posts.country_id = countries.id
       GROUP BY Countries.name
       ) AS subquery
       ORDER BY RANDOM()
       LIMIT 9;`
    ).all()) as D1Result<Destination>;

    const results2: Destination[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2;
  }
};

export interface Country {
  id: number | null;
  name: string;
}
export const getDestination = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  const destinationUrl = decodeURI(
    ev.pathname.substr(0, ev.pathname.length - 1)
  );

  const [country, state, city] = destinationUrl
    .replace("/destination/", "")
    .split("/");

  if (DB) {
    const query = city
      ? `SELECT *  FROM Cities WHERE name = '${city}'`
      : state
      ? `SELECT *  FROM States WHERE name = '${state}'`
      : `SELECT *  FROM Countries WHERE name = '${country}'`;
    const { results } = (await DB.prepare(query).all()) as D1Result<Country>;

    const results2: Country[] = JSON.parse(JSON.stringify(results)) ?? [];
    if (results2.length === 0) {
      return ev.fail(404, { message: "Destination not found" });
    }
    return results2[0];
  }
};
