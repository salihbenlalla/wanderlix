import {
  component$,
  Resource,
  //   useResource$,
  useStyles$,
} from "@builder.io/qwik";
import type { ResourceReturn } from "@builder.io/qwik";
import CommentSingle from "../CommentSingle";
import type { Comment } from "~/lib/handlers/db";
import styles from "./style.css?inline";

interface CommentsListProps {
  comments: ResourceReturn<Comment[]>;
}

export default component$<CommentsListProps>((props) => {
  useStyles$(styles);

  return (
    <div class="comments-list-container">
      {/* <ul>
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
      </ul> */}
      <Resource
        value={props.comments}
        onPending={() => <p>Loading comments ...</p>}
        onRejected={(error) => <p>failed to load comments {error}</p>}
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
      />
    </div>
  );
});
