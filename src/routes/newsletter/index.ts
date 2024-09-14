import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type RequestHandler } from "@builder.io/qwik-city";
import { handleAddSubscriber } from "./handleAddSubscriber";

export const onPost: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  const subscriber = await ev.request.json();

  const dbResult = await handleAddSubscriber(subscriber, ev);

  console.log("dbResult: ", dbResult);

  if (dbResult.failed) {
    ev.json(500, dbResult);
  } else {
    ev.json(200, dbResult);
  }
};
