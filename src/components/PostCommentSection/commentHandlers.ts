import {
  type RequestEventAction,
  type RequestEventLoader,
  type RequestEvent,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { D1Database, D1Result } from "@miniflare/d1";
import dateFormat from "dateformat";
import { getDB } from "../../lib/helpers/getDB";
import { type CommentFormInput } from "./CommentForm";

declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
  interface PlatformCloudflarePages {
    DB: D1Database;
  }
}

export interface Comment {
  id: number;
  website: string;
  avatarImage?: string;
  authorName: string;
  email: string;
  commentDate: string;
  commentText: string;
  commenter_id: string;
  approved: boolean;
}

export const handleGetComments = async (
  ev:
    | RequestEventLoader<PlatformCloudflarePages>
    | RequestEvent<PlatformCloudflarePages>,
  postSlug: string | undefined
): Promise<Comment[]> => {
  if (!postSlug) {
    console.error("Error handleGetComments: No post slug provided");
    return [];
  }

  const DB = await getDB(ev);

  if (!DB) {
    console.error("Error handleGetComments: DB not found");
    return [];
  }

  const commenterId = ev.cookie.get("commenter_id")?.value;

  const query = `
SELECT Comments.*, Posts.slug
FROM Comments
LEFT JOIN Posts ON Comments.post_id = Posts.id
WHERE Posts.slug = ?
AND (approved = 1 OR commenter_id = ?);
`;
  try {
    const { results } = (await DB.prepare(query)
      .bind(postSlug, commenterId)
      .all()) as D1Result<Comment>;

    const results2: Comment[] = JSON.parse(JSON.stringify(results)) ?? [];

    return results2;
  } catch (error) {
    return [];
  }
};

export type CommentHandlersReturnValue = {
  failed: boolean;
  message: string;
  comment?: Comment;
};

export const handleAddComment = async (
  comment: CommentFormInput,
  ev:
    | RequestEventAction<PlatformCloudflarePages>
    | RequestEvent<PlatformCloudflarePages>
  // postSlug: string | undefined
): Promise<CommentHandlersReturnValue> => {
  const postSlug = comment.postSlug;
  const DB = await getDB(ev);

  if (!DB) {
    console.error("Error handleAddComment: No database!");

    if ("fail" in ev) {
      return ev.fail(500, { message: "Internal server error." });
    } else {
      return {
        failed: true,
        message: "Internal server error.",
      };
    }
  }

  const date = dateFormat(Date.now(), "isoUtcDateTime");

  const addQuery = `
INSERT INTO Comments (website, avatarImage, authorName, email, commentDate, commentText, commenter_id, post_id)
SELECT ?, ?, ?, ?, ?, ?, ?, p.id
FROM Posts p
WHERE p.slug = ?;
`;

  const selectQuery = `
SELECT * FROM Comments WHERE id = ?
`;

  try {
    const {
      success,
      meta: meta1,
      error,
    } = await DB.prepare(addQuery)
      .bind(
        comment.website,
        null, // the avatar currently is always undefined
        comment.authorName,
        comment.email,
        date,
        comment.commentText,
        comment.commenter_id,
        postSlug
      )
      .all();

    if (success && meta1.changes >= 1 && !error) {
      // retrieve the just added comment
      const { results, success, error } = await DB.prepare(selectQuery)
        .bind(meta1.last_row_id)
        .all();

      if (!success || error) {
        console.error(
          "Error handleEditComment: no success or error when selecting added comment: ",
          error
        );
        if ("fail" in ev) {
          return ev.fail(500, { message: "Internal server error." });
        } else {
          return {
            failed: true,
            message: "Internal server error.",
          };
        }
      }

      const results2: Comment[] = JSON.parse(JSON.stringify(results)) ?? [];

      return {
        failed: false,
        message: "comment updated seccessfuly.",
        comment: results2[0],
      };
    } else {
      console.error(
        "Error handleAddComment: no success or meta.changes < 1, error: ",
        error
      );
      if ("fail" in ev) {
        return ev.fail(500, { message: "Internal server error." });
      } else {
        return {
          failed: true,
          message: "Internal server error.",
        };
      }
    }
  } catch (error) {
    console.error(
      "Error handleAddComment: error while trying to add comment to database: ",
      error
    );
    if ("fail" in ev) {
      return ev.fail(500, { message: "Internal server error." });
    } else {
      return {
        failed: true,
        message: "Internal server error.",
      };
    }
  }
};

export const handleEditComment = async (
  comment: CommentFormInput,
  ev:
    | RequestEventAction<PlatformCloudflarePages>
    | RequestEvent<PlatformCloudflarePages>
): Promise<CommentHandlersReturnValue> => {
  const DB = await getDB(ev);

  if (!DB) {
    console.error("Error handleEditComment: No database!");
    if ("fail" in ev) {
      return ev.fail(500, { message: "Internal server error." });
    } else {
      return {
        failed: true,
        message: "Internal server error.",
      };
    }
  }

  const date = dateFormat(Date.now(), "isoUtcDateTime");

  const updateQuery = `
UPDATE Comments
SET website = ?, avatarImage = ?, authorName = ?, email = ?, commentDate = ?, commentText = ?, commenter_id = ?
WHERE id = ?;
`;

  const selectQuery = `
SELECT * FROM Comments WHERE id = ?
`;

  try {
    const { success, meta, error } = await DB.prepare(updateQuery)
      .bind(
        comment.website,
        "/images/etc/comment-avatar.png",
        comment.authorName,
        comment.email,
        date,
        comment.commentText,
        comment.commenter_id,
        comment.commentId
      )
      .all();

    if (success && meta.changes >= 1 && !error) {
      // retrieve the just updated comment
      const { results, success, error } = await DB.prepare(selectQuery)
        .bind(comment.commentId)
        .all();

      if (!success || error) {
        console.error(
          "Error handleEditComment: no success or error when selecting updated comment: ",
          error
        );
        if ("fail" in ev) {
          return ev.fail(500, { message: "Internal server error." });
        } else {
          return {
            failed: true,
            message: "Internal server error.",
          };
        }
      }

      const results2: Comment[] = JSON.parse(JSON.stringify(results)) ?? [];

      return {
        failed: false,
        message: "comment updated seccessfuly.",
        comment: results2[0],
      };
    } else {
      console.error(
        "Error handleEditComment: no success or meta.changes < 1, error: ",
        error
      );
      if ("fail" in ev) {
        return ev.fail(500, { message: "Internal server error." });
      } else {
        return {
          failed: true,
          message: "Internal server error.",
        };
      }
    }
  } catch (error) {
    console.error(
      "Error handleEditComment: error while trying to edit comment in the database",
      error
    );
    if ("fail" in ev) {
      return ev.fail(500, { message: "Internal server error." });
    } else {
      return {
        failed: true,
        message: "Internal server error.",
      };
    }
  }
};

export const handleDeleteComment = async function (
  commentId: number,
  ev:
    | RequestEventAction<PlatformCloudflarePages>
    | RequestEvent<PlatformCloudflarePages>
): Promise<CommentHandlersReturnValue> {
  const DB = await getDB(ev);

  if (!DB) {
    console.error("Error handleDeleteComment: No database!");
    if ("fail" in ev) {
      return ev.fail(500, { message: "Internal server error." });
    } else {
      return {
        failed: true,
        message: "Internal server error.",
      };
    }
  }

  const query = `DELETE FROM Comments WHERE id = ?;`;

  try {
    const { success, meta, error } = await DB.prepare(query)
      .bind(commentId)
      .all();

    if (!success || meta.changes < 1 || error) {
      console.error(
        "Error handleDeleteComment: no success or meta.changes < 1, error: ",
        error
      );
      if ("fail" in ev) {
        return ev.fail(500, { message: "Internal server error." });
      } else {
        return {
          failed: true,
          message: "Internal server error.",
        };
      }
    }

    return {
      failed: false,
      message: "comment deleted successfully.",
    };
  } catch (error) {
    console.error(
      "Error handleDeleteComment: error while trying to delete comment from the database"
    );
    if ("fail" in ev) {
      return ev.fail(500, { message: "Internal server error." });
    } else {
      return {
        failed: true,
        message: "Internal server error.",
      };
    }
  }
};
