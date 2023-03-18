import { component$, useStyles$ } from "@builder.io/qwik";
import type { ResourceReturn } from "@builder.io/qwik";
import CommentForm from "./CommentForm";
import type { Comment } from "~/lib/handlers/db";
import CommentsList from "./CommentsList";
import styles from "./style.css?inline";

interface PostCommentSectionProps {
  comments: ResourceReturn<Comment[]>;
}

export default component$<PostCommentSectionProps>((props) => {
  useStyles$(styles);
  return (
    <div class="post-comment-section">
      <h3>Comments (3)</h3>
      <CommentsList comments={props.comments} />
      <h3>Leave a Reply </h3>
      <CommentForm />
    </div>
  );
});
