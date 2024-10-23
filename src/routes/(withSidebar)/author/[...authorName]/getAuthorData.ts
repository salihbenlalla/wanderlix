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

export interface Author {
  name: string;
  url: string;
  bio: string;
  avatarUrl: string;
  imageUrl: string;
}

export interface AuthorData {
  posts: PostCardData[];
  author: Author;
  totalPages: number;
  currentPage: number;
}

interface AuthorDBData extends PostCardData {
  totalPages: number;
  authorBio: string;
  authorImage: string;
}

export const getAuthorData = async (
  ev: RequestEventLoader<PlatformCloudflarePages>,
): Promise<AuthorData | FailReturn<{ message: string }>> => {
  // const authorUrl = decodeURI(ev.pathname.substr(0, ev.pathname.length - 1));
  // const pageNumber = Number(ev.query.get("page")) || 1;

  const params = splitStringWithoutEmpty(ev.params.authorName, "/");

  const lastParamIsNumber = isNumber(params[params.length - 1]);

  const pageNumber = lastParamIsNumber ? Number(params.pop()) : 1;

  const authorUrl = decodeURI(params[0]);

  const gridPostsNumber = getGridPostsNumber();
  const offset = (pageNumber - 1) * gridPostsNumber;

  const query = `
WITH PageCountCTE AS (
  SELECT CEIL(CAST(COUNT(*) AS FLOAT) / ${gridPostsNumber.toString()}) AS totalPages
  FROM Posts
  LEFT JOIN Authors ON Posts.author_id = Authors.id
  LEFT JOIN Tags ON Posts.tag_id = Tags.id
  WHERE Authors.url = ?
)
SELECT Posts.title, Posts.dateModified, Posts.slug, Posts.description, Posts.image, Authors.name AS authorName, Authors.avatarUrl AS authorAvatar, Authors.url AS authorUrl, Authors.bio AS authorBio, Authors.imageUrl AS authorImage, Tags.name As tagName, Tags.url AS tagUrl, totalPages
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
LEFT JOIN Tags ON Posts.tag_id = Tags.id
LEFT JOIN PageCountCTE ON 1=1
WHERE authorUrl = ?
LIMIT ${gridPostsNumber.toString()} OFFSET ?;
`;

  const DB = await getDB(ev);
  if (!DB) {
    return ev.fail(500, { message: "Internal server error" });
  }

  try {
    const { results } = (await DB.prepare(query)
      .bind(authorUrl, authorUrl, offset)
      .all()) as D1Result<AuthorDBData>;

    const results2: AuthorDBData[] = JSON.parse(JSON.stringify(results)) ?? [];

    if (!results || results.length === 0) {
      return ev.fail(404, { message: "Author not found" });
    }

    const authorPosts = results2.map(
      ({ totalPages: _, authorBio: __, authorImage: ___, ...rest }) => rest,
    );

    return {
      posts: authorPosts,
      author: {
        avatarUrl: results2[0].authorAvatar,
        bio: results2[0].authorBio,
        name: results2[0].authorName,
        url: results2[0].authorUrl,
        imageUrl: results2[0].authorImage,
      },
      totalPages: results2[0].totalPages,
      currentPage: pageNumber,
    };
  } catch (error) {
    console.error(
      "getAuthorData: Error while getting author data from DB:",
      error,
    );
    return ev.fail(500, { message: "Internal server error" });
  }
};
