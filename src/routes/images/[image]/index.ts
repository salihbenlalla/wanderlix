import { type RequestEvent, type RequestHandler } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

export const onGet: RequestHandler<PlatformCloudflarePages> = async (event) => {
  //   request.headers.set("Cache-Control", "no-cache");
  //   console.log(event.request.url);
  const response = await handleRequest(event);

  event.send(response);
};

async function serveAsset(event: RequestEvent<PlatformCloudflarePages>) {
  const url = new URL(event.request.url);

  let cache: any, response: any;
  try {
    //@ts-ignore
    cache = caches.default;
    response = await cache.match(event.request);
    if (!response) {
      response = await fetchImage(url);
      event.platform.ctx.waitUntil(cache.put(event.request, response.clone()));
    }
  } catch (error) {
    response = await fetchImage(url);
  }

  return response;
}

async function handleRequest(event: RequestEvent<PlatformCloudflarePages>) {
  if (event.request.method === "GET") {
    let response = await serveAsset(event);
    if (response.status > 399) {
      response = new Response(response.statusText, { status: response.status });
    }
    return response;
  }
  return new Response("Method not allowed", { status: 405 });
}

const fetchImage = async (url: URL) => {
  const cloudinaryURL = convertUrl(url);
  let response = await fetch(cloudinaryURL);
  const headers = {
    "timing-allow-origin": "*",
    "cache-control": "public, max-age=31536000",
  };
  response = new Response(response.body, { ...response, headers });
  return response;
};

const convertUrl = (url: URL) => {
  //   console.log("image url: ", url);
  const fullImageName = url.pathname.split("/")[2];
  const parts = fullImageName.split("-");
  const partsLen = parts.length;
  const imageName = parts.slice(0, partsLen - 1).join("-");
  const width = parts[partsLen - 1].split(".")[0].split("x")[0];
  const height = parts[partsLen - 1].split(".")[0].split("x")[1];
  const format = parts[partsLen - 1].split(".")[1];

  return `https://res.cloudinary.com/dlzx1x20u/image/upload/w_${width},ar_${width}:${height},c_lfill,f_auto,q_auto:low/v1684082099/travel2/${imageName}.${format}`;
};
