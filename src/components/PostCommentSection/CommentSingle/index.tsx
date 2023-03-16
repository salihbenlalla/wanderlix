import { component$, useStyles$ } from "@builder.io/qwik";
import type { Comment } from "~/lib/handlers/db";
import { formatDate } from "~/lib/helpers/formatDate";
import styles from "./style.css?inline";

// avatarImage: "/images/comment-avatar.png"
// date: "2023-03-10T12:00:20+00:00"
// dateText: March 10, 2023 at 12:00 pm

export type CommentSingleProps = Omit<Comment, "id" | "email">;

export default component$<CommentSingleProps>(
  ({ website, avatarImage, authorName, commentDate, commentText }) => {
    useStyles$(styles);
    return (
      <article class="comments-list-comment">
        <div class="comment-author-avatar-container">
          <a href={website}>
            <img src={avatarImage ?? "/images/comment-avatar.png"} />
          </a>
        </div>
        <div class="comment-details">
          <h6 class="comment-author-name">
            <a href={website}>{authorName}</a>
          </h6>
          <a href="#">
            <span title={formatDate(commentDate)} class="comment-date">
              {formatDate(commentDate)}
            </span>
          </a>
          <div class="comment-text">{commentText}</div>
          <p class="comment-awaiting-moderation">
            Your comment is awaiting moderation.
          </p>
          <footer class="comment-footer-meta">
            <a
              rel="nofollow"
              class="comment-reply-link"
              href="#"
              data-commentid="9"
              data-postid="47"
              data-belowelement="comment-9"
              data-respondelement="respond"
              data-replyto="Reply to john doe"
              aria-label="Reply to john doe"
            >
              Reply
            </a>
          </footer>
        </div>
      </article>
    );
  }
);
