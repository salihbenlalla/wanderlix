import {
  type FailReturn,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Result } from "@miniflare/d1";
import { type PostCardData } from "~/components/PostsGrid/PostCard";
import { getDB } from "~/lib/helpers/getDB";

export interface SearchData {
  posts: PostCardData[];
  searchQuery: string;
  totalPages: number;
  currentPage: number;
}

interface SearchDBData extends PostCardData {
  totalPages: number;
}

export const getSearchData = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
): Promise<SearchData | FailReturn<{ message: string }>> => {
  // const pageNumber = Number(ev.query.get("page")) || 1;
  const pageNumber = Number(ev.query.get("page"))
    ? Number(ev.query.get("page"))
    : 1;
  const offset = (pageNumber - 1) * 10;
  const searchPhrase = ev.query.get("q")?.trim();
  const searchQuery = `%${searchPhrase}%`;

  if (!searchQuery) {
    return ev.fail(404, { message: "No search query entered" });
  }

  const query = `
WITH PageCountCTE AS (
  SELECT CEIL(CAST(COUNT(*) AS FLOAT) / 10) AS totalPages
  FROM Posts
  LEFT JOIN Authors ON Posts.author_id = Authors.id
  LEFT JOIN Tags ON Posts.tag_id = Tags.id
  WHERE title LIKE ?
    OR content LIKE ?
    OR description LIKE ?
    OR slug LIKE ?
)
SELECT Posts.title, Posts.dateModified, Posts.slug, Posts.description, Posts.image, Posts.imageWidth, Posts.imageHeight, Authors.name AS authorName, Authors.avatarUrl AS authorAvatar, Authors.url AS authorUrl, Tags.name As tagName, Tags.url AS tagUrl, totalPages
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
LEFT JOIN Tags ON Posts.tag_id = Tags.id
LEFT JOIN PageCountCTE ON 1=1
WHERE title LIKE ?
  OR content LIKE ?
  OR description LIKE ?
  OR slug LIKE ?
LIMIT 10 OFFSET ?;
`;

  const DB = await getDB(ev);

  if (!DB) {
    return ev.fail(500, { message: "Internal server error" });
  }

  try {
    const { results } = (await DB.prepare(query)
      .bind(
        searchQuery,
        searchQuery,
        searchQuery,
        searchQuery,
        searchQuery,
        searchQuery,
        searchQuery,
        searchQuery,
        offset
      )
      .all()) as D1Result<SearchDBData>;

    const results2: SearchDBData[] = JSON.parse(JSON.stringify(results)) ?? [];

    if (!results || results.length === 0) {
      return ev.fail(404, { message: "No results found" });
    }

    const searchPosts = results2.map(({ totalPages: _, ...rest }) => rest);

    return {
      posts: searchPosts,
      searchQuery: `${searchPhrase}`,
      totalPages: results2[0].totalPages,
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error(
      "getSearchData: Error while getting search data from DB:",
      error
    );
    return ev.fail(500, { message: "Internal server error" });
  }
};
