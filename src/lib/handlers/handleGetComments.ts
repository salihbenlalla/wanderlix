// import { RequestEventLoader } from "@builder.io/qwik-city";
import { DB } from "./db";
// import { sequelize, connectToDB } from "./sequelize.js";
// import { Comment } from "./Models";
import type { Comment } from "./db";

// import { RequestEvent, RequestEventLoader } from "@builder.io/qwik-city";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database } from "@miniflare/d1";
import { RequestEvent } from "@builder.io/qwik-city";
// import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const handleGetComments = async (
  ev: RequestEvent<PlatformCloudflarePages>
) => {
  if (ev.platform.DB) {
    const results = (
      await ev.platform.DB.prepare("SELECT * FROM Comments").all()
    ).results as Comment[];
    //   return results
    return results;
  }
  //   return ev.json(200, DB.comments);
  //   await connectToDB();

  //   const comments = (await Comment.findAll()).map(
  //     (comment) => comment.dataValues
  //   );

  //   return comments;
};
