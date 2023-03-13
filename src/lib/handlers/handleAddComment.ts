import { RequestEventAction } from "@builder.io/qwik-city";
import { DB } from "./db";
import type { Comment } from "./db";
import dateFormat from "dateformat";

export const handleAddComment = async (
  comment: any,
  ev: RequestEventAction
) => {
  const date = dateFormat(Date.now(), "isoUtcDateTime");
  if (ev.platform.DB) {
    const { success } = await ev.platform.DB.prepare(
      "INSERT INTO Comments (website, avatarImage, authorName, date, text) VALUES (?, ?, ?, ?, ?)"
    )
      .bind(
        comment.website,
        comment.avatarImage,
        comment.authorName,
        date,
        comment.text
      )
      .all();
    if (success) {
      return {
        success: true,
        CommentID: 4,
      };
    }
  }
  DB.comments.push({
    CommentID: DB.comments.length + 1,
    website: comment.website,
    avatarImage: comment.avatarImage,
    authorName: comment.authorName,
    email: comment.email,
    date: date,
    text: comment.text,
  });

  return {
    success: true,
    CommentID: DB.comments.length,
  };
};
