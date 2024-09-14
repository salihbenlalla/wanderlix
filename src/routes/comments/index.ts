import { type RequestHandler } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import {
  handleAddComment,
  handleDeleteComment,
  handleEditComment,
} from "~/components/PostCommentSection/commentHandlers";

export const onPost: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  // const postSlug = ev.params.postSlug;
  const comment = await ev.request.json();

  const addCommentResponse = await handleAddComment(comment, ev);

  if (addCommentResponse.failed) {
    ev.json(500, addCommentResponse);
  } else {
    ev.json(200, addCommentResponse);
  }
};

export const onPut: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  const comment = await ev.request.json();

  const editCommentResponse = await handleEditComment(comment, ev);

  if (editCommentResponse.failed) {
    ev.json(500, editCommentResponse);
  } else {
    ev.json(200, editCommentResponse);
  }
};

export const onDelete: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  const reqBody = await ev.request.json();

  const deleteCommentResponse = await handleDeleteComment(
    reqBody.commentId,
    ev
  );
  if (deleteCommentResponse.failed) {
    ev.json(500, deleteCommentResponse);
  } else {
    ev.json(200, deleteCommentResponse);
  }
};
