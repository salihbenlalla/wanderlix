import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { RequestHandler } from "@builder.io/qwik-city";
import { handleGetComments } from "~/components/PostCommentSection/commentHandlers";

export const onGet: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  const postSlug = ev.params.postSlug;
  const comments = await handleGetComments(ev, postSlug);
  ev.json(200, comments);
};
