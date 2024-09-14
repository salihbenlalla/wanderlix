import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type RequestHandler } from "@builder.io/qwik-city";
import { handleAddMessage } from "./handleAddMessage";

export const onPost: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  const message = await ev.request.json();

  const dbResult = await handleAddMessage(message, ev);

  if (dbResult.failed) {
    ev.json(500, dbResult);
  }

  ev.json(200, dbResult);
};
