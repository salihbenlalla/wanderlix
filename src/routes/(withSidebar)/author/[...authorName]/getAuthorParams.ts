import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import type { D1Result, D1Database } from "@miniflare/d1";

interface GetAuthorParamsOpts {
  env: EnvGetter;
  platform: {
    env: {
      DB: D1Database;
    };
  };
}

interface AuthorParamsDBResult {
  author: string;
  postsCount: number;
}

const getAuthorParams = async (opts: GetAuthorParamsOpts) => {
  const DB = opts.platform.env.DB;

  const query = `
SELECT Authors.url AS author, COUNT(Posts.id) AS postsCount
FROM Authors
LEFT JOIN Posts ON Authors.id = Posts.author_id
GROUP BY Authors.id
`;

  const { results } = (await DB.prepare(
    query
  ).all()) as D1Result<AuthorParamsDBResult>;

  const slugs = [];

  for (const result of results ?? []) {
    const pagesCount = Math.ceil(result.postsCount / 10);
    for (let i = 1; i <= pagesCount; i++) {
      if (i === 1) {
        slugs.push(result.author.replace("/author/", ""));
      } else {
        slugs.push(`${result.author.replace("/author/", "")}/${i}`);
      }
    }
  }

  return slugs;
};

export default getAuthorParams;
