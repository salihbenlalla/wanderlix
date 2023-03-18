import {
  component$,
  //   Resource,
  //   useResource$,
  useStyles$,
} from "@builder.io/qwik";
import CommentSingle from "../CommentSingle";
import type { Comment } from "~/lib/handlers/db";
import styles from "./style.css?inline";

export interface CommentsListProps {
  comments: Comment[] | undefined;
}

export default component$<CommentsListProps>((props) => {
  useStyles$(styles);
  //   const commentsResource = useResource$<Comment[]>(async () => {
  //     const res = await fetch("http://127.0.0.1:8788/comments");

  //     return res.json();
  //   });
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
      {/* <Resource
        value={commentsResource}
        onPending={() => <p>Loading comments ...</p>}
        onRejected={(error) => <p>failed to load comments {error.message}</p>}
        onResolved={(comments) => (
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
        )}
      /> */}
    </div>
  );
});
