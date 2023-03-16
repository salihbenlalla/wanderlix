import { RequestEventAction } from "@builder.io/qwik-city";
import { DB } from "./db";
import dateFormat from "dateformat";

export const handleAddComment = async (
  comment: any,
  ev: RequestEventAction
) => {
  const date = dateFormat(Date.now(), "isoUtcDateTime");
  if (ev.platform.DB) {
    const success = await ev.platform.DB.prepare(
      "INSERT INTO Comments (website, avatarImage, authorName, email, commentDate, commentText) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(
      comment.website,
      "/images/comment-avatar.png",
      comment.authorName,
      comment.email,
      date,
      comment.commentText
    );
    if (success) {
      return {
        success: true,
        id: 4,
      };
    }
  }
  DB.comments.push({
    id: DB.comments.length + 1,
    website: comment.website,
    avatarImage: "/images/comment-avatar.png",
    authorName: comment.authorName,
    email: comment.email,
    commentDate: date,
    commentText: comment.text,
  });

  return {
    success: true,
    id: DB.comments.length,
  };
};
