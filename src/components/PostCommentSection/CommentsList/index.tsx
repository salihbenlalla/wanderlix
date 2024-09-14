import {
  type Signal,
  component$,
  useStyles$,
  useSignal,
  useTask$,
  $,
} from "@builder.io/qwik";
import CommentSingle from "../CommentSingle";
import type { Comment } from "../commentHandlers";
import styles from "./style.css?inline";

interface CommentsListProps {
  commentsSignal: Signal<Comment[]>;
  commentsStatusSignal: Signal<"loaded" | "loading" | "error">;
}

export default component$<CommentsListProps>((props) => {
  useStyles$(styles);

  if (props.commentsStatusSignal.value === "loading") {
    return (
      <div class="comments-list-container">
        <div class="zero-comments-notice">
          <p>Loading comments ...</p>
        </div>
      </div>
    );
  }

  if (props.commentsStatusSignal.value === "error") {
    return (
      <div class="comments-list-container">
        <div class="zero-comments-notice">
          <p>Something went wrong when trying to load comments!</p>
        </div>
      </div>
    );
  }

  const numCommentsToShow = useSignal<number>(1);

  const commentsToRender = useSignal<Comment[]>([]);

  useTask$(({ track }) => {
    track(() => props.commentsSignal.value);
    track(() => numCommentsToShow.value);
    commentsToRender.value = props.commentsSignal.value.slice(
      0,
      numCommentsToShow.value
    );
  });

  const showMoreComments = $(() => {
    if (numCommentsToShow.value === 1) {
      numCommentsToShow.value = Math.min(10, props.commentsSignal.value.length);
    } else {
      numCommentsToShow.value = Math.min(
        numCommentsToShow.value + 10,
        props.commentsSignal.value.length
      );
    }
  });

  return (
    <div class="comments-list-container">
      {commentsToRender.value.length > 0 ? (
        <div class="comments-container">
          <ul>
            {commentsToRender.value.map((commentProps) => (
              <li key={`${commentProps.id}`}>
                <CommentSingle {...commentProps} />
              </li>
            ))}
          </ul>
          <div class="more-comments-container">
            {commentsToRender.value.length ===
            props.commentsSignal.value.length ? (
              <button class="more-comments-button" disabled>
                No more comments
              </button>
            ) : (
              <button class="more-comments-button" onClick$={showMoreComments}>
                Show{" "}
                {props.commentsSignal.value.length - numCommentsToShow.value}{" "}
                more comments
              </button>
            )}
          </div>
        </div>
      ) : (
        <div class="zero-comments-notice">
          <p>No comments yet, be the first one to comment!</p>
        </div>
      )}
    </div>
  );
});
