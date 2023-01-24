import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
// import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";
import styles from "./style.css?inline";
// import path from "path";
// import fs from "fs";
// import yaml from "js-yaml";

// interface LinkObj {
//   id: number;
//   originalHref: string;
//   newHref: string;
//   use: string;
// }

export default component$(() => {
  useStylesScoped$(styles);
  // const linkObjs = useEndpoint<LinkObj[]>()
  return (
    <div class="post-content">
      <Slot />
    </div>
  );
});

// export const onGet: RequestHandler<LinkObj[]> = () => {
//   const yml = yaml.load(
//     fs.readFileSync(
//       path.join(process.cwd(), "/src/data", "linkIds.yml"),
//       "utf-8"
//     )
//   ) as LinkObj[];
//   return yml
// }
