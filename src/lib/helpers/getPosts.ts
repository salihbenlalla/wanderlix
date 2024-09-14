import {
  RequestEventLoader,
  // type RequestEvent,
  FailReturn,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database, D1Result } from "@miniflare/d1";
import { getDB } from "./getDB";
import { getUniqueRandomNumbers } from "./getRandomNumbers";
// import { formatDate } from "./formatDate";
// import { Author } from "./getAuthors";
import { PostCardData } from "~/components/PostsGrid/PostCard";
import { compile } from "@mdx-js/mdx";
import replaceLinkIds from "~/rehypePlugin";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  imageType: string;
  imageWidth: number;
  imageHeight: number;
  readDuration: number;
  datePublished: string;
  dateModified: string;
  tag_id: number;
  country_id: number;
  state_id: number;
  city_id: number;
  author_id: number;
  authorName: string;
  authorAvatar: string;
  authorUrl: string;
  authorBio: string;
  authorImageUrl: string;
  tagName: string;
  tagUrl: string;
  countryName: string;
  countryParam: string;
  stateName: string | null;
  stateParam: string | null;
  cityName: string | null;
  cityParam: string | null;
  prevPostSlug: string;
  prevPostTitle: string;
  nextPostSlug: string;
  nextPostTitle: string;
}

export interface PaginatedPosts {
  posts: PostCardData[];
  totalPages: number;
  currentPage: number;
}

export const getPost = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
): Promise<Post | FailReturn<{ message: string }>> => {
  const DB = await getDB(ev);

  const postSlug = ev.pathname.startsWith("/post/")
    ? ev.url.pathname.split("/")[2]
    : undefined;
  
  if (!postSlug) {
    console.error("Error getPost: No post slug provided");
    return ev.fail(500, { message: "Internal server error" });
  }


  if (!DB) {
    console.log("DB not found");
    return ev.fail(500, { message: "Internal server error" });
  }

  // const query = `
  //     SELECT Posts.*,
  //            Authors.name AS authorName,
  //            Authors.avatarUrl AS authorAvatar,
  //            Authors.url AS authorUrl,
  //            Tags.name As tagName,
  //            Tags.url AS tagUrl,
  //            Countries.name AS countryName,
  //            Countries.param AS countryParam,
  //            States.name AS stateName,
  //            States.param AS stateParam,
  //            Cities.name AS cityName,
  //            Cities.param AS cityParam
  //     FROM Posts
  //     LEFT JOIN Authors ON Posts.author_id = Authors.id
  //     LEFT JOIN Tags ON Posts.tag_id = Tags.id
  //     LEFT JOIN Cities ON Posts.city_id = Cities.id
  //     LEFT JOIN States ON Posts.state_id = States.id
  //     LEFT JOIN Countries ON Posts.country_id = Countries.id
  //     WHERE Posts.slug = ?;
  //     `;

  const query = `
WITH CurrentPost AS (
    SELECT * FROM Posts WHERE slug = ?
),
PreviousPost AS (
    SELECT slug, title
    FROM Posts 
    WHERE id = (
        SELECT IFNULL(MAX(id), (SELECT MAX(id) FROM Posts)) 
        FROM Posts 
        WHERE id < (SELECT id FROM CurrentPost)
    )
),
NextPost AS (
    SELECT slug , title
    FROM Posts 
    WHERE id = (
        SELECT IFNULL(MIN(id), (SELECT MIN(id) FROM Posts)) 
        FROM Posts 
        WHERE id > (SELECT id FROM CurrentPost)
    )
)
SELECT Posts.*,
       Authors.name AS authorName,
       Authors.avatarUrl AS authorAvatar,
       authors.imageUrl AS authorImageUrl,
       authors.bio AS authorBio,
       Authors.url AS authorUrl,
       Tags.name AS tagName,
       Tags.url AS tagUrl,
       Countries.name AS countryName,
       Countries.param AS countryParam,
       States.name AS stateName,
       States.param AS stateParam,
       Cities.name AS cityName,
       Cities.param AS cityParam,
       PreviousPost.slug AS prevPostSlug,
       PreviousPost.title AS prevPostTitle,
       NextPost.slug AS nextPostSlug,
       NextPost.title AS nextPostTitle
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
LEFT JOIN Tags ON Posts.tag_id = Tags.id
LEFT JOIN Cities ON Posts.city_id = Cities.id
LEFT JOIN States ON Posts.state_id = States.id
LEFT JOIN Countries ON Posts.country_id = Countries.id
LEFT JOIN PreviousPost ON 1 = 1
LEFT JOIN NextPost ON 1 = 1
WHERE Posts.slug = ?;
`

  try {
    const { results } = (await DB.prepare(query)
      .bind(postSlug, postSlug)
      .all()) as D1Result<Comment>;
    if (!results || results.length === 0) {
      return ev.fail(404, { message: "Post not found" });
    }
    const results2: Post[] = JSON.parse(JSON.stringify(results)) ?? [];

    // compile mdx to jsx
    results2[0].content = String(
      await compile(results2[0].content ?? "", {
        jsxImportSource: "@builder.io/qwik",
        outputFormat: "function-body",
        development: false,
        rehypePlugins: [[replaceLinkIds, DB ]],
      })
    );

    return results2[0];
  } catch (e) {
    console.error("getPost: Error while getting post from DB:", e);
    return ev.fail(500, { message: "Internal server error" });
  }
};

export const getPopularPosts = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  //   const postsIds = getUniqueRandomNumbers(3, 1, 6989);
  const postsIds = getUniqueRandomNumbers(3, 1, 3038);
  const DB = await getDB(ev);
  if (DB) {
    const { results } = (await DB.prepare(
      `SELECT * FROM Posts WHERE id IN (?, ?, ?)`
    )
      .bind(postsIds[0], postsIds[1], postsIds[2])
      .all()) as D1Result<Comment>;

    const results2: Post[] = JSON.parse(JSON.stringify(results)) ?? [];

    if (results2.length > 0) {
      return results2;
    }
  }
  return [];
};

export const getCarouselPosts = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  //   const postsIds = getUniqueRandomNumbers(3, 1, 6989);
  const postsIds = getUniqueRandomNumbers(3, 1, 52);
  const DB = await getDB(ev);
  if (DB) {
    const { results } = (await DB.prepare(
      `
SELECT Posts.title, Posts.slug, Posts.image, Posts.dateModified, Authors.name AS authorName, Authors.url AS authorUrl
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
WHERE Posts.id IN (?, ?, ?)
`
    )
      .bind(postsIds[0], postsIds[1], postsIds[2])
      .all()) as D1Result<Comment>;

    const results2: Post[] = JSON.parse(JSON.stringify(results)) ?? [];

    if (results2.length > 0) {
      return results2;
    }
  }
  return [];
};
