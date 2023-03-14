import { component$, useStyles$ } from "@builder.io/qwik";
import CommentSingle from "../CommentSingle";
import type { CommentSingleProps } from "../CommentSingle";
import styles from "./style.css?inline";

export interface CommentsListProps {
  comments: CommentSingleProps[];
}

export default component$<CommentsListProps>((props) => {
  useStyles$(styles);
  console.log("CommentsList run");

  return (
    <div class="comments-list-container">
      <ul>
        {props.comments.map((commentProps, index) => (
          <li key={`${index}`}>
            <CommentSingle {...commentProps} />
          </li>
        ))}
      </ul>
    </div>
  );
});
