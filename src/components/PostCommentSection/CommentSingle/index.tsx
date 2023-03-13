import { component$, useStyles$ } from "@builder.io/qwik";
import { formatDate } from "~/lib/helpers/formatDate";
import styles from "./style.css?inline";

// avatarImage: "/images/comment-avatar.png"
// date: "2023-03-10T12:00:20+00:00"
// dateText: March 10, 2023 at 12:00 pm

export interface CommentSingleProps {
  website?: string;
  avatarImage?: string;
  authorName: string;
  date: string;
  text: string;
}

export default component$<CommentSingleProps>((props) => {
  useStyles$(styles);
  console.log(props.date);
  return (
    <article class="comments-list-comment">
      <div class="comment-author-avatar-container">
        <a href={props.website}>
          <img src={props.avatarImage ?? "/images/comment-avatar.png"} />
        </a>
      </div>
      <div class="comment-details">
        <h6 class="comment-author-name">
          <a href={props.website}>{props.authorName}</a>
        </h6>
        <a href="#">
          <span title={formatDate(props.date)} class="comment-date">
            {formatDate(props.date)}
          </span>
        </a>
        <div class="comment-text">{props.text}</div>
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
});
