import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import type { D1Result, D1Database } from "@miniflare/d1";

interface GetTagParamsOpts {
  env: EnvGetter;
  platform: {
    env: {
      DB: D1Database;
    };
  };
}

interface TagParamsDBResult {
  tag: string;
  postsCount: number;
}

const getTagParams = async (opts: GetTagParamsOpts) => {
  const DB = opts.platform.env.DB;

  const query = `
SELECT Tags.url AS tag, COUNT(Posts.id) AS postsCount
FROM Tags
LEFT JOIN Posts ON Tags.id = Posts.tag_id
GROUP BY Tags.id
`;

  const { results } = (await DB.prepare(
    query
  ).all()) as D1Result<TagParamsDBResult>;

  const slugs = [];

  for (const result of results ?? []) {
    const pagesCount = Math.ceil(result.postsCount / 10);
    for (let i = 1; i <= pagesCount; i++) {
      if (i === 1) {
        slugs.push(result.tag.replace("/tag/", ""));
      } else {
        slugs.push(`${result.tag.replace("/tag/", "")}/${i}`);
      }
    }
  }

  return slugs;
};

export default getTagParams;
