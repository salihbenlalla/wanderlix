import { RequestEventAction } from "@builder.io/qwik-city";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { D1Database } from "@miniflare/d1";
import dateFormat from "dateformat";
import { getDB } from "../helpers/getDB";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const handleAddComment = async (
  comment: any,
  ev: RequestEventAction<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  const date = dateFormat(Date.now(), "isoUtcDateTime");
  if (DB) {
    const { success } = await DB.prepare(
      "INSERT INTO Comments (website, avatarImage, authorName, email, commentDate, commentText) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(
        comment.website,
        "/images/comment-avatar.png",
        comment.authorName,
        comment.email,
        date,
        comment.commentText
      )
      .all();

    console.log("add comment success: ", success);
    if (success) {
      return {
        success: true,
        id: 4,
      };
    }
  }
};
