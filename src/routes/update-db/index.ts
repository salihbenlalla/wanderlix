import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import type { RequestHandler } from "@builder.io/qwik-city";
import { getDB } from "~/lib/helpers/getDB";
import { type D1Result } from "@miniflare/d1";

export const onGet: RequestHandler<PlatformCloudflarePages> = async (ev) => {
  const DB = await getDB(ev);
  if (DB) {
    const { results: rows } = (await DB.prepare(
      `SELECT id, image FROM posts`,
    ).all()) as D1Result<{ id: number; image: string }>;
    if (rows) {
      const imageNames = [];
      for (const row of rows) {
        const { image, id } = row;
        // Extract the image name from the path
        const imageName = image.split("/").pop();

        // Update the image path in the database
        if (imageName) {
          await DB.prepare(`UPDATE posts SET image = ? WHERE id = ?`)
            .bind(imageName, id)
            .run();
          imageNames.push(imageName);
        }
      }
      console.log(imageNames.length);
      ev.json(200, imageNames);
    }
  }
};
