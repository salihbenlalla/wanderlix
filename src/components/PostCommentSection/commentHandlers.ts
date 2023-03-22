import {
  type RequestEventAction,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database, D1Result } from "@miniflare/d1";
import dateFormat from "dateformat";
import { getDB } from "../../lib/helpers/getDB";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export interface Comment {
  id: number;
  website: string;
  avatarImage: string;
  authorName: string;
  email: string;
  commentDate: string;
  commentText: string;
}

export const handleGetComments = async (
  ev: RequestEventLoader<PlatformCloudflarePages>
) => {
  const DB = await getDB(ev);
  if (DB) {
    const { results } = (await DB.prepare(
      "SELECT * FROM Comments"
    ).all()) as D1Result<Comment>;

    const results2: Comment[] = JSON.parse(JSON.stringify(results)) ?? [];
    return results2;
  }
};

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
