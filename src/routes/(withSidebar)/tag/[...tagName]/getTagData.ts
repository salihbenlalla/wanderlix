import {
  type FailReturn,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Result } from "@miniflare/d1";
import { type PostCardData } from "~/components/PostsGrid/PostCard";
import { getDB } from "~/lib/helpers/getDB";
import isNumber from "~/lib/helpers/isNumber";
import splitStringWithoutEmpty from "~/lib/helpers/splitStringWithoutEmpty";

export interface TagData {
  posts: PostCardData[];
  tagName: string;
  tagUrl: string;
  totalPages: number;
  currentPage: number;
}

interface TagDBData extends PostCardData {
  totalPages: number;
}

export const getTagData = async (
  ev: RequestEventLoader<PlatformCloudflarePages>,
): Promise<TagData | FailReturn<{ message: string }>> => {
  // const tagName =
  //   typeof ev.params.tagName !== "undefined"
  //     ? decodeURI(ev.params.tagName)
  //     : "";

  const params = splitStringWithoutEmpty(ev.params.tagName, "/");

  const lastParamIsNumber = isNumber(params[params.length - 1]);

  const pageNumber = lastParamIsNumber ? Number(params.pop()) : 1;

  const tagName = decodeURI(params[0]);

  if (!tagName) {
    return ev.fail(404, { message: "No tag!" });
  }

  // const pageNumber = Number(ev.query.get("page")) || 1;
  const offset = (pageNumber - 1) * 10;

  const query = `
WITH PageCountCTE AS (
SELECT CEIL(CAST(COUNT(*) AS FLOAT) / 10) AS totalPages
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
LEFT JOIN Tags ON Posts.tag_id = Tags.id
WHERE Tags.url COLLATE NOCASE = ?
)
SELECT Posts.title, Posts.dateModified, Posts.slug, Posts.description, Posts.image, Authors.name AS authorName, Authors.avatarUrl AS authorAvatar, Authors.url AS authorUrl, Tags.name As tagName, Tags.url AS tagUrl, totalPages
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
LEFT JOIN Tags ON Posts.tag_id = Tags.id
LEFT JOIN PageCountCTE ON 1=1
WHERE tagUrl COLLATE NOCASE = ?
LIMIT 10 OFFSET ?;
`;

  const DB = await getDB(ev);

  if (!DB) {
    return ev.fail(500, { message: "Internal server error" });
  }

  try {
    const { results } = (await DB.prepare(query)
      .bind(tagName, tagName, offset)
      .all()) as D1Result<TagDBData>;

    if (!results || results.length === 0) {
      return ev.fail(404, { message: "Tag not found" });
    }

    const results2: TagDBData[] = JSON.parse(JSON.stringify(results)) ?? [];

    // get rid of properties that are not used from the cards
    const tagPosts = results2.map(({ totalPages: _, ...rest }) => rest);

    return {
      posts: tagPosts,
      tagName: results2[0].tagName,
      tagUrl: results2[0].tagUrl,
      totalPages: results2[0].totalPages,
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error("getTagData: Error while getting tag data from DB:", error);
    return ev.fail(500, { message: "Internal server error" });
  }
};
