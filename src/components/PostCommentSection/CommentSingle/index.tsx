import {
  $,
  component$,
  useContext,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { Comment } from "../commentHandlers";
import { formatDate } from "~/lib/helpers/formatDate";
import styles from "./style.css?inline";
import { getCookie } from "~/lib/helpers/cookies";
import { ThemeContext } from "~/routes/layout";
import { ImageWithFallback } from "~/components/ImageWithFallback";

export type CommentSingleProps = Comment & {
};

export default component$<CommentSingleProps>(
  ({
    id,
    website,
    avatarImage,
    authorName,
    commentDate,
    commentText,
    email,
    commenter_id,
    approved,
  }) => {
    useStyles$(styles);

    const theme = useContext(ThemeContext);
    const isCommenter = useSignal<boolean>(false);
    const isTruncated = useSignal<boolean>(false);
    const commentTextRef = useSignal<HTMLDivElement | undefined>();

    const toggleReadMore = $(() => {
      isTruncated.value = false;
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      if (getCookie("commenter_id") === commenter_id) {
        isCommenter.value = true;
      }

      if (commentTextRef.value) {
        const commentHeight = commentTextRef.value.scrollHeight;
        const lineHeight = parseInt(
          window.getComputedStyle(commentTextRef.value).lineHeight,
          10
        );
        const maxHeight = lineHeight * 3;

        if (commentHeight > maxHeight) {
          isTruncated.value = true;
        }
      }
    });

    const openDeleteDialog = $(() => {
      theme.deleteModalOpen = true;
      theme.deleteModalType = "comment";
      theme.deleteModalProps.commentId = id;
    });

    const openEditDialog = $(() => {
      theme.editModalOpen = true;
      theme.editModalProps = {
        commentId: id,
        commentText: commentText,
        authorName: authorName,
        email: email,
        website: website,
      };
    });

    return (
      <article class="comments-list-comment">
        <div class="comment-author-avatar-container">
          <a
            href={website}
            aria-label="clickable avatar for the comment author"
          >
            {avatarImage ? (
              <img
                width={60}
                height={60}
                src={avatarImage}
                alt="Comment author avatar"
              />
            ) : (
              <ImageWithFallback
                width={60}
                height={60}
                src="/comment-avatar.jpg"
                alt="Comment author avatar"
                loading="lazy"
                exactDimensions
              />
            )}
          </a>
        </div>
        <div class="comment-details">
          <div class="comment-author-name">
            <a href={website}>{authorName}</a>
          </div>
          <span title={formatDate(commentDate)} class="comment-date">
            {formatDate(commentDate)}
          </span>
          <div class="comment-text-container">
            <p
              ref={commentTextRef}
              class={`comment-text${isTruncated.value ? " truncated" : ""}`}
            >
              {commentText}
            </p>
            {isTruncated.value && (
              <span class="comment-text-read-more" onClick$={toggleReadMore}>
                Read more
              </span>
            )}
          </div>

          {!approved && (
            <p class="comment-awaiting-moderation">
              Your comment is awaiting moderation.
            </p>
          )}
          {isCommenter.value && (
            <div class="comment-footer-meta">
              <>
                <button class="comment-edit-button" onClick$={openEditDialog}>
                  Edit
                </button>
                <button
                  class="comment-delete-button"
                  aria-label="Delete comment"
                  onClick$={openDeleteDialog}
                >
                  Delete
                </button>
              </>
            </div>
          )}
        </div>
      </article>
    );
  }
);
