import {
  type FailReturn,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Result } from "@miniflare/d1";
import { type DestinationCardProps } from "~/components/DestinationCard";
import { getDB } from "~/lib/helpers/getDB";

export const getDestinations = async (
  ev: RequestEventLoader<PlatformCloudflarePages>,
): Promise<DestinationCardProps[] | FailReturn<{ message: string }>> => {
  const query = `
SELECT c.name AS country, c.param, p.image, p.imageWidth, p.imageHeight, COUNT(p.id) AS post_count
FROM Posts p
JOIN Countries c ON p.country_id = c.id
WHERE p.image IS NOT NULL
GROUP BY c.id
`;

  const DB = await getDB(ev);

  if (!DB) {
    return ev.fail(500, { message: "Internal server error" });
  }

  try {
    const { results } = (await DB.prepare(
      query,
    ).all()) as D1Result<DestinationCardProps>;

    // const results2: DestinationCardProps[] =
    //   JSON.parse(JSON.stringify(results)) ?? [];

    if (!results || results.length === 0) {
      return ev.fail(500, { message: "Internal server error" });
    }
    return results;
  } catch (error) {
    console.error(
      "getDestinations: Error while getting destinations data from DB:",
      error,
    );
    return ev.fail(500, { message: "Internal server error" });
  }
};
