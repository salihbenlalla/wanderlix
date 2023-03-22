import { component$, useStyles$ } from "@builder.io/qwik";
import CommentSingle from "../CommentSingle";
import type { Comment } from "../commentHandlers";
import styles from "./style.css?inline";

interface CommentsListProps {
  comments: Comment[] | undefined;
}

export default component$<CommentsListProps>((props) => {
  useStyles$(styles);

  return (
    <div class="comments-list-container">
      <ul>
        {props.comments &&
          props.comments.map((commentProps) => (
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
