import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import type { D1Result, D1Database } from "@miniflare/d1";
import { getGridPostsNumber } from "~/lib/helpers/getGridPostsNumber";

interface GetDestinationParamsOpts {
  env: EnvGetter;
  platform: {
    env: {
      DB: D1Database;
    };
  };
}

interface DestinationParamsDBResult {
  path: string;
  postsCount: number;
}

const getDestinationParams = async (opts: GetDestinationParamsOpts) => {
  const DB = opts.platform.env.DB;

  const query = `
SELECT Countries.param AS path, COUNT(Posts.id) AS postsCount
FROM Countries
LEFT JOIN Posts ON Countries.id = Posts.country_id
GROUP BY Countries.id

UNION ALL

SELECT Countries.param||'/'||States.param AS path, COUNT(Posts.id) AS postsCount
FROM Countries
JOIN States ON Countries.id = States.country_id
LEFT JOIN Posts ON States.id = Posts.state_id
GROUP BY Countries.id, States.id

UNION ALL

SELECT Countries.param||'/'||States.param||'/'||Cities.param AS path, COUNT(Posts.id) AS postsCount
FROM Countries
JOIN States ON Countries.id = States.country_id
JOIN Cities ON States.id = Cities.state_id
LEFT JOIN Posts ON Cities.id = Posts.city_id
GROUP BY Countries.id, States.id, Cities.id;
`;

  const { results } = (await DB.prepare(
    query,
  ).all()) as D1Result<DestinationParamsDBResult>;

  const slugs = [];
  const gridPostsNumber = getGridPostsNumber();

  for (const result of results ?? []) {
    const pagesCount = Math.ceil(result.postsCount / gridPostsNumber);
    for (let i = 1; i <= pagesCount; i++) {
      if (i === 1) {
        slugs.push(result.path);
      } else {
        slugs.push(`${result.path}/${i}`);
      }
    }
  }

  return slugs;
};

export default getDestinationParams;
