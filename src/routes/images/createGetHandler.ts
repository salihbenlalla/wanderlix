import { type RequestEvent, type RequestHandler } from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

// Common GET handler with a customizable asset formatter
const createGetHandler = (
  urlConverter: (url: URL) => string,
): RequestHandler<PlatformCloudflarePages> => {
  return async (event) => {
    const { request } = event;

    if (request.method !== "GET") {
      event.send(new Response("Method Not Allowed", { status: 405 }));
      return;
    }

    try {
      const response = await fetchImageAsset(event, urlConverter);
      if (!response.ok) {
        console.warn(
          `Asset not found: ${request.url}, status: ${response.status}`,
        );
        event.send(new Response("Image Not Found", { status: 404 }));
        return;
      }

      const imageBlob = await response.blob();
      const headers = {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000",
      };
      event.send(new Response(imageBlob, { status: 200, headers }));
    } catch (error) {
      console.error(`Failed to fetch image: ${request.url}`, error);
      event.send(new Response("Internal Server Error", { status: 500 }));
    }
  };
};

// Fetches the image from B2 cloud storage
async function fetchImageAsset(
  event: RequestEvent<PlatformCloudflarePages>,
  urlConverter: (url: URL) => string,
): Promise<Response> {
  const url = new URL(event.request.url);
  const b2Url = urlConverter(url);

  return fetch(b2Url);
}

export default createGetHandler;
