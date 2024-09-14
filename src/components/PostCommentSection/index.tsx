import {
  $,
  component$,
  useContext,
  useStyles$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import styles from "./style.css?inline";
import { ThemeContext } from "~/routes/layout";
import { Modal } from "../Modal";
import { useLocation } from "@builder.io/qwik-city";
import { type Comment } from "./commentHandlers";
import { DeleteModal } from "../DeleteModal";

interface PostCommentSectionProps {
  postSlug: string;
}

export default component$<PostCommentSectionProps>((props) => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);

  const loc = useLocation();
  const postSlug = loc.params.slug;

  const comments = useSignal<Comment[]>([]);
  const commentsStatus = useSignal<"loaded" | "loading" | "error">("loading");

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    try {
      const response = await fetch("/comments/" + postSlug + "/", {
        method: "GET",
      });
      if (response.status === 200) {
        comments.value = await response.json();
        theme.commentsCount = comments.value.length;
        commentsStatus.value = "loaded";
      } else {
        comments.value = [];
        theme.commentsCount = 0;
        commentsStatus.value = "error";
      }
    } catch (error) {
      commentsStatus.value = "error";
      comments.value = [];
      theme.commentsCount = 0;
      console.error("error getting comments: ", error);
    }
  });

  const closeEditModal = $(() => {
    theme.editModalOpen = false;
  });

  return (
    <div class="post-comment-section">
      <>
        <h3>Comments ({theme.commentsCount})</h3>
        <CommentsList
          commentsSignal={comments}
          commentsStatusSignal={commentsStatus}
        />
      </>
      <h3>Leave a Reply </h3>
      <CommentForm
        action="add"
        postSlug={props.postSlug}
        commentsSignal={comments}
      />
      {theme.editModalOpen && (
        <Modal onClose={closeEditModal}>
          <CommentForm
            action="edit"
            postSlug={props.postSlug}
            commentsSignal={comments}
            commentId={theme.editModalProps.commentId}
            commentText={theme.editModalProps.commentText}
            authorName={theme.editModalProps.authorName}
            email={theme.editModalProps.email}
            website={theme.editModalProps.website}
          />
        </Modal>
      )}
      <DeleteModal comments={comments} />
    </div>
  );
});
