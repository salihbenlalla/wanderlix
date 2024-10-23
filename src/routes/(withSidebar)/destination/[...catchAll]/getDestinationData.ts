import {
  type FailReturn,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Result } from "@miniflare/d1";
import { type PostCardData } from "~/components/PostsGrid/PostCard";
import { getDB } from "~/lib/helpers/getDB";
import { getGridPostsNumber } from "~/lib/helpers/getGridPostsNumber";
import isNumber from "~/lib/helpers/isNumber";
import splitStringWithoutEmpty from "~/lib/helpers/splitStringWithoutEmpty";

export interface DestinationData {
  posts: PostCardData[];
  countryName: string;
  stateName: string | null;
  cityName: string | null;
  totalPages: number;
  currentPage: number;
}

interface DestinationDBData extends PostCardData {
  countryName: string;
  stateName: string | null;
  cityName: string | null;
  totalPages: number;
}

export const getDestinationData = async (
  ev: RequestEventLoader<PlatformCloudflarePages>,
): Promise<DestinationData | FailReturn<{ message: string }>> => {
  // const pageNumber = Number(ev.query.get("page")) || 1;

  const params = splitStringWithoutEmpty(ev.params.catchAll, "/");

  const lastParamIsNumber = isNumber(params[params.length - 1]);

  const pageNumber = lastParamIsNumber ? Number(params.pop()) : 1;

  const [country, state, city] = params.map((param) => decodeURI(param));

  const stateFilter = state ? ` AND States.param = '${state}'` : "";
  const cityFilter = city ? ` AND Cities.param = '${city}'` : "";

  const gridPostsNumber = getGridPostsNumber();
  const offset = (pageNumber - 1) * gridPostsNumber;

  const query = `
WITH PageCountCTE AS (
  SELECT CEIL(CAST(COUNT(*) AS FLOAT) / ${gridPostsNumber}) AS totalPages
  FROM Posts
  LEFT JOIN Authors ON Posts.author_id = Authors.id
  LEFT JOIN Tags ON Posts.tag_id = Tags.id
  LEFT JOIN Countries ON Posts.country_id = Countries.id
  LEFT JOIN States ON Posts.state_id = States.id
  LEFT JOIN Cities ON Posts.city_id = Cities.id
  WHERE Countries.param = ?
  ${stateFilter}
  ${cityFilter}
)
SELECT Posts.title, Posts.dateModified, Posts.slug, Posts.description, Posts.image, Posts.imageWidth, Posts.imageHeight, Authors.name AS authorName, Authors.avatarUrl AS authorAvatar, Authors.url AS authorUrl, Tags.name As tagName, Tags.url AS tagUrl, Countries.name AS countryName, States.name AS stateName, Cities.name AS cityName, totalPages
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
LEFT JOIN Tags ON Posts.tag_id = Tags.id
LEFT JOIN Countries ON Posts.country_id = Countries.id
LEFT JOIN States ON Posts.state_id = States.id
LEFT JOIN Cities ON Posts.city_id = Cities.id
LEFT JOIN PageCountCTE ON 1=1
WHERE Countries.param = ?
${stateFilter}
${cityFilter}
LIMIT ${gridPostsNumber} OFFSET ?;
`;

  const DB = await getDB(ev);

  if (!DB) {
    return ev.fail(500, { message: "Internal server error" });
  }

  try {
    const { results } = (await DB.prepare(query)
      .bind(country, country, offset)
      .all()) as D1Result<DestinationDBData>;

    if (!results || results.length === 0) {
      return ev.fail(404, { message: "Destination not found" });
    }

    const results2: DestinationDBData[] =
      JSON.parse(JSON.stringify(results)) ?? [];

    // get rid of properties that are not used from the cards
    const destinationPosts = results2.map(
      ({
        totalPages: _,
        countryName: __,
        stateName: ___,
        cityName: ____,
        ...rest
      }) => rest,
    );

    return {
      posts: destinationPosts,
      totalPages: results2[0].totalPages,
      countryName: results2[0].countryName,
      stateName: state ? results2[0].stateName : null,
      cityName: city ? results2[0].cityName : null,
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error(
      "getDestinationData: Error while getting destination data from DB:",
      error,
    );
    return ev.fail(500, { message: "Internal server error" });
  }
};
