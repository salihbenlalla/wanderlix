import { type RequestEvent, type RequestHandler } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
// import fetch from "node-fetch";

export const onGet: RequestHandler<PlatformCloudflarePages> = async (event) => {
  //   request.headers.set("Cache-Control", "no-cache");
  //   console.log(event.request.url);
  const response = await handleRequest(event);

  event.send(response);
};

const cache: any = {};
async function serveAsset(event: RequestEvent<PlatformCloudflarePages>) {
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  const headers = {
    "Content-Type": "image/jpeg",
    "timing-allow-origin": "*",
    "cache-control": "public, max-age=31536000",
  };

  if (cache[pathname]) {
    const response = new Response(cache[pathname], {
      status: 200,
      headers,
    });

    return response;
  }

  try {
    const response = await fetchImage(url);

    if (!response.ok) {
      return new Response("Image not found", { status: 404 });
    }

    const imageBlob = await response.blob();
    cache[pathname] = imageBlob;
  } catch (error) {
    console.error("error from fetchAsset: fetch failed, url: ", url.href);
  }

  const response = new Response(cache[pathname], {
    status: 200,
    headers,
  });

  return response;

  // try {
  //   if (import.meta.env.DEV) {
  //     response = cache[event.request.url];
  //     if (!response) {
  //       console.log("******************************************");
  //       console.log(Object.keys(cache));
  //       response = await fetchImage(url);
  //       cache[event.request.url] = response;
  //     }
  //   } else {
  //     //@ts-ignore
  //     cache = caches.default;
  //     response = await cache.match(event.request);
  //   }
  //   if (!response) {
  //     response = await fetchImage(url);
  //     event.platform.ctx.waitUntil(cache.put(event.request, response.clone()));
  //   }
  // } catch (error) {
  //   response = await fetchImage(url);
  // }

  // return response;
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
  const response = await fetch(cloudinaryURL);

  // const imageBuffer = await response.arrayBuffer();

  // const headers = {
  //   "Content-Type": "image/jpeg",
  //   "timing-allow-origin": "*",
  //   "cache-control": "public, max-age=31536000",
  // };

  // const imageBlob = await response.blob();
  // const imageBlob = response.clone();

  // Create the response with the image data and appropriate headers
  // response = new Response(imageBlob.body, {
  //   status: 200,
  //   headers,
  // });
  //@ts-ignore
  // response = new Response(response.body, { ...response, headers });
  // return response;
  return response;
};

const convertUrl = (url: URL) => {
  const imagePath = url.pathname.split("/");
  const imageWidth = imagePath[2];
  //   const imageHeight = imagePath[3];
  const imageName = imagePath[4];

  return `https://f004.backblazeb2.com/file/travel22/${imageWidth}/${imageName}`;
};
