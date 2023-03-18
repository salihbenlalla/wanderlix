import { RequestEventAction } from "@builder.io/qwik-city";
import { PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { D1Database } from "@miniflare/d1";
// import { DB } from "./db";
import dateFormat from "dateformat";
// import { sequelize, connectToDB } from "./sequelize.js";
// import { Comment } from "./Models";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export const handleAddComment = async (
  comment: any,
  ev: RequestEventAction<PlatformCloudflarePages>
) => {
  const date = dateFormat(Date.now(), "isoUtcDateTime");
  if (ev.platform.DB) {
    const { success } = await ev.platform.DB.prepare(
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
  //   DB.comments.push({
  //     id: DB.comments.length + 1,
  //     website: comment.website,
  //     avatarImage: "/images/comment-avatar.png",
  //     authorName: comment.authorName,
  //     email: comment.email,
  //     commentDate: date,
  //     commentText: comment.text,
  //   });

  //   return {
  //     success: true,
  //     id: DB.comments.length,
  //   };

  //   await connectToDB();

  //   const newComment = await Comment.create({
  //     website: comment.website,
  //     avatarImage: "/images/comment-avatar.png",
  //     authorName: comment.authorName,
  //     email: comment.email,
  //     commentDate: date,
  //     commentText: comment.commentText,
  //   });

  //   console.log("added comment: ", newComment);

  //   return {
  //     success: true,
  //     id: newComment.dataValues.id,
  //   };
};
