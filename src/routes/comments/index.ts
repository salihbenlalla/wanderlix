import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { RequestHandler } from "@builder.io/qwik-city";
import { handleGetComments } from "~/lib/handlers/handleGetComments";

export const onGet: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  const comments = await handleGetComments(ev);
  console.log("comments: ", comments);
  console.log(process.env.NODE_ENV);

  ev.json(200, comments ?? []);
};
// export {};
