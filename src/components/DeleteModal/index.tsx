import {
  type Signal,
  component$,
  useContext,
  // useStyles$,
  $,
} from "@builder.io/qwik";
import { ThemeContext } from "~/routes/layout";
import { Modal } from "../Modal";
import { type Comment } from "../PostCommentSection/commentHandlers";
import { ModalDialog } from "../Modal/ModalDialog";
import { deleteCookie } from "~/lib/helpers/cookies";
import { reset } from "@modular-forms/qwik";

interface DeleteModalProps {
  comments: Signal<Comment[]>;
}

export const DeleteModal = component$<DeleteModalProps>((props) => {
  const theme = useContext(ThemeContext);

  const closeDeleteModal = $(() => {
    theme.deleteModalOpen = false;
  });

  const handleDeleteComment = $(async () => {
    try {
      const deleteCommentResponse = await (
        await fetch("/comments", {
          method: "DELETE",
          body: JSON.stringify({
            commentId: theme.deleteModalProps.commentId,
          }),
        })
      ).json();

      theme.deleteModalOpen = false;

      if (deleteCommentResponse.failed) {
        theme.toast.message = deleteCommentResponse.message;
        theme.toast.type = "error";
        theme.toast.isVisible = true;
      } else {
        theme.toast.message = deleteCommentResponse.message;
        theme.toast.type = "success";
        theme.toast.isVisible = true;

        props.comments.value = props.comments.value.filter(
          (comment) => comment.id !== theme.deleteModalProps.commentId
        );

        theme.commentsCount = theme.commentsCount - 1;
      }
    } catch (error) {
      theme.toast.message = "Something went wrong.";
      theme.toast.type = "error";
      theme.toast.isVisible = true;
    }
  });

  const handleDeleteUserInfo = $(() => {
    try {
      deleteCookie("comment_author_email");
      deleteCookie("comment_author_name");
      deleteCookie("comment_author_website");
      if (theme.commentForm) {
        reset(theme.commentForm);
      }
      theme.userInfoRemembered = false;
      theme.deleteModalOpen = false;
      theme.toast.message = "Your info deleted successfully";
      theme.toast.type = "success";
      theme.toast.isVisible = true;
    } catch (error) {
      theme.toast.message = "Something went wrong.";
      theme.toast.type = "error";
      theme.toast.isVisible = true;
    }
  });

  const handleDeleteModalAction = $(() => {
    theme.deleteModalType === "comment"
      ? handleDeleteComment()
      : handleDeleteUserInfo();
  });

  if (theme.deleteModalOpen) {
    return (
      <Modal onClose={closeDeleteModal}>
        {
          <ModalDialog
            onClose={closeDeleteModal}
            message={
              theme.deleteModalType === "comment"
                ? "Are you sure you want to delete this comment?"
                : "Are you sure you want to delete your name, email and website from this browser ?"
            }
            onActionButtonClick={handleDeleteModalAction}
            actionButtonText="Delete"
          />
        }
      </Modal>
    );
  }
});
