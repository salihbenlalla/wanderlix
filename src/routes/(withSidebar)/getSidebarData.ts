import { type RequestEventLoader } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Result, type D1Database } from "@miniflare/d1";
import { type Tag } from "~/components/SideBar/TagCloudsWidget/index";
import { type SideBarProps } from "~/components/SideBar";
import { type Destination } from "~/components/SideBar/DestinationsWidget";
import { type PopularPost } from "~/components/SideBar/PopularPostsWidget";
import { type CarouselPost } from "~/components/SideBar/PostsCarouselWidget";
import { getDB } from "~/lib/helpers/getDB";
import { getUniqueRandomNumbers } from "~/lib/helpers/getRandomNumbers";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

/**
 * Get the sidebar data.
 *
 * @param {RequestEventLoader<PlatformCloudflarePages>} ev The request event.
 *
 * @return {Promise<SideBarProps>} The sidebar data.
 */
export const getSidebarData = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
): Promise<SideBarProps> => {
  const DB = await getDB(ev);

  if (!DB) {
    return {};
  }

  try {
    const [popularPosts, carouselPosts, tags, destinations] = await Promise.all(
      [
        getPopularPosts(DB), // Get the 3 most popular posts.
        getCarouselPosts(DB), // Get 3 random posts for the carousel.
        getTags(DB), // Get the top 10 tags.
        getDestinations(DB), // Get 9 random destinations.
      ]
    );

    const sidebarData: SideBarProps = {
      popularPosts: {
        title: "Popular Posts",
        posts: popularPosts, // The popular posts data.
      },
      postsCarousel: {
        title: "Read Also",
        posts: carouselPosts, // The carousel posts data.
      },
      tagClouds: {
        title: "Tag Clouds",
        tags: tags, // The top 10 tags data.
      },
      destinations: {
        title: "Explore Destinations",
        destinations: destinations, // The 9 random destinations data.
      },
      sponsoredAd: {
        imageUrl: "/images/etc/ad-widget-photo.png",
        adUrl: "#",
      },
      newsletter: {
        title: "Newsletter",
        subscribersCount: 70000,
      },
    };

    return sidebarData;
  } catch (error) {
    return {};
  }
};

/**
 * Get 3 most popular posts.
 *
 * @param {D1Database} DB The database.
 *
 * @return {Promise<PopularPost[]>} The popular posts data.
 */
export const getPopularPosts = async (
  DB: D1Database
): Promise<PopularPost[]> => {
  const postsIds = getUniqueRandomNumbers(3, 1, 6984);
  const { results } = (await DB.prepare(
    `SELECT * FROM Posts WHERE id IN (?, ?, ?)`
  )
    .bind(postsIds[0], postsIds[1], postsIds[2])
    .all()) as D1Result<PopularPost>;

  if (!results || results.length === 0) {
    return [];
  }

  const results2: PopularPost[] = JSON.parse(JSON.stringify(results)) ?? [];

  return results2;
};

/**
 * Get 3 random posts for the carousel.
 *
 * @param {D1Database} DB The database.
 *
 * @return {Promise<CarouselPost[]>} The carousel posts data.
 */
export const getCarouselPosts = async (
  DB: D1Database
): Promise<CarouselPost[]> => {
  const postsIds = getUniqueRandomNumbers(3, 1, 6984);

  const query = `
SELECT Posts.title, Posts.slug, Posts.image, Posts.imageWidth, Posts.imageHeight, Posts.dateModified, Authors.name AS authorName, Authors.url AS authorUrl
FROM Posts
LEFT JOIN Authors ON Posts.author_id = Authors.id
WHERE Posts.id IN (?, ?, ?)
`;

  const { results } = (await DB.prepare(query)
    .bind(postsIds[0], postsIds[1], postsIds[2])
    .all()) as D1Result<CarouselPost>;

  if (!results || results.length === 0) {
    return [];
  }

  const results2: CarouselPost[] = JSON.parse(JSON.stringify(results)) ?? [];

  return results2;
};

/**
 * Get the top 10 tags.
 *
 * @param {D1Database} DB The database.
 *
 * @return {Promise<Tag[]>} The top 10 tags data.
 */
export const getTags = async (DB: D1Database): Promise<Tag[]> => {
  const { results } = (await DB.prepare(
    `SELECT Tags.name, Tags.url FROM Tags LIMIT 10`
  ).all()) as D1Result<Tag>;

  if (!results || results.length === 0) {
    return [];
  }

  const results2: Tag[] = JSON.parse(JSON.stringify(results)) ?? [];
  return results2;
};

/**
 * Get 9 random destinations.
 *
 * @param {D1Database} DB The database.
 *
 * @return {Promise<Destination[]>} The 9 random destinations data.
 */
export const getDestinations = async (
  DB: D1Database
): Promise<Destination[]> => {
  const query = `
SELECT countryName, countryParam, count
FROM (
SELECT Countries.name AS countryName, Countries.param AS countryParam, COUNT(Posts.id) AS count
FROM posts
LEFT JOIN Countries ON Posts.country_id = countries.id
GROUP BY Countries.param
) AS subquery
ORDER BY RANDOM()
LIMIT 9;`;

  const { results } = (await DB.prepare(query).all()) as D1Result<Destination>;

  if (!results || results.length === 0) {
    return [];
  }

  const results2: Destination[] = JSON.parse(JSON.stringify(results)) ?? [];
  return results2;
};
