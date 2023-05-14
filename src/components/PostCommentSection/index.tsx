import { component$, useStyles$ } from "@builder.io/qwik";
import CommentForm from "./CommentForm";
import type { Comment } from "./commentHandlers";
import CommentsList from "./CommentsList";
import styles from "./style.css?inline";
import { type ActionStore } from "@builder.io/qwik-city";
import { type AddCommentReturnValue } from "~/routes/blog/layout";

interface PostCommentSectionProps {
  comments: Comment[] | undefined;
  action: ActionStore<
    Partial<AddCommentReturnValue>,
    Record<string, any>,
    true
  >;
}

export default component$<PostCommentSectionProps>((props) => {
  useStyles$(styles);
  return (
    <div class="post-comment-section">
      <h3>Comments (3)</h3>
      <CommentsList comments={props.comments} />
      <h3>Leave a Reply </h3>
      <CommentForm action={props.action} />
    </div>
  );
});
