// import path from "path";
import { type Plugin } from "vite";

export default function postsPlugin(): Plugin {
  return {
    name: "posts-plugin",
    enforce: "pre",
    resolveId(id: string) {
      if (id.includes("qwik-city")) {
        console.log("from posts-plugin: ", id);
      }
      return null;
    },
  };
}

// function generateFileContent(slug: string) {
//   // Generate content dynamically or fetch from a database based on the slug
//   // return `export const message = "Content for ${slug}";`;
//   return `Content for ${slug}`;
// }
