import { component$, useStyles$ } from "@builder.io/qwik";
import CommentSingle from "../CommentSingle";
import type { Comment } from "~/lib/handlers/db";
import styles from "./style.css?inline";

export interface CommentsListProps {
  comments: Comment[];
}

export default component$<CommentsListProps>(({ comments }) => {
  useStyles$(styles);
  return (
    <div class="comments-list-container">
      <ul>
        {comments.map((commentProps) => (
          <li key={`${commentProps.id}`}>
            <CommentSingle
              website={commentProps.website}
              avatarImage={commentProps.avatarImage}
              authorName={commentProps.authorName}
              commentDate={commentProps.commentDate}
              commentText={commentProps.commentText}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});
