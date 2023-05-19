import { type RequestHandler } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

export const onGet: RequestHandler<PlatformCloudflarePages> = async (event) => {
  //   request.headers.set("Cache-Control", "no-cache");
  //   console.log(event.request.url);
  const response = await handleRequest(event.request);

  event.send(response);
};

async function serveAsset(request: Request) {
  const url = new URL(request.url);
  const fullImageName = url.pathname.split("/")[2];
  const parts = fullImageName.split("-");
  const partsLen = parts.length;
  const imageName = parts.slice(0, partsLen - 1).join("-");
  const width = parts[partsLen - 1].split(".")[0].split("x")[0];
  const height = parts[partsLen - 1].split(".")[0].split("x")[1];
  const format = parts[partsLen - 1].split(".")[1];

  const cloudinaryURL = `https://res.cloudinary.com/dlzx1x20u/image/upload/w_${width},h_${height},c_lfill,f_auto/v1684082099/travel2/${imageName}.${format}`;
  //   const cloudinaryURL = `${CLOUD_URL}${url.pathname}`;
  let response = await fetch(cloudinaryURL);
  const headers = {
    "timing-allow-origin": "*",
  };
  response = new Response(response.body, { ...response, headers });
  return response;
}

async function handleRequest(request: Request) {
  if (request.method === "GET") {
    let response = await serveAsset(request);
    if (response.status > 399) {
      response = new Response(response.statusText, { status: response.status });
    }
    return response;
  }
  return new Response("Method not allowed", { status: 405 });
}
