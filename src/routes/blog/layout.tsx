import {
  component$,
  Slot,
  // useContextProvider,
  // useStore,
  useStylesScoped$,
  // useTask$,
} from "@builder.io/qwik";
// import { isServer } from "@builder.io/qwik/build";
// import { dataContext } from "~/data/dataContext";
// import { linkObjs } from "~/data/linkIds";
// import { srcObjs } from "~/data/iframeSrcs";
// import type { DataContext } from "~/data/dataContext";
import styles from "./style.css?inline";

export default component$(() => {
  useStylesScoped$(styles);
  // const store = useStore<DataContext>({ links: [], srcs: [] });
  // useTask$(async () => {
  //   if (isServer) {
  // const yaml = (await import("js-yaml")).default;
  // const fs = (await import("fs")).default;
  // const path = (await import("path")).default;
  // const linkObjs = yaml.load(
  //   fs.readFileSync(
  //     path.join(process.cwd(), "/src/data", "linkIds.yml"),
  //     "utf-8"
  //   )
  // ) as LinkObj[];
  // // lsd,cl,ls
  // fs.writeFileSync(
  //   path.join(process.cwd(), "/src/data", "linkIds.json"),
  //   JSON.stringify(linkObjs),
  //   "utf-8"
  // );
  // const srcObjs = yaml.load(
  //   fs.readFileSync(
  //     path.join(process.cwd(), "/src/data", "iframeSrcs.yml"),
  //     "utf-8"
  //   )
  // ) as SrcObj[];
  // // jksndl,l
  // fs.writeFileSync(
  //   path.join(process.cwd(), "/src/data", "iframeSrcs.json"),
  //   JSON.stringify(srcObjs),
  //   "utf-8"
  // );
  //     store.links = linkObjs;
  //     store.srcs = srcObjs;
  //   }
  // });
  // useContextProvider(dataContext, store);
  return (
    <div class="post-content">
      <Slot />
    </div>
  );
});

// export const onGet: RequestHandler<LinkObj[]> = async () => {
//   const yaml = (await import("js-yaml")).default;
//   const fs = (await import("fs")).default;
//   const path = (await import("path")).default;
//   const yml = yaml.load(
//     fs.readFileSync(
//       path.join(process.cwd(), "/src/data", "linkIds.yml"),
//       "utf-8"
//     )
//   ) as LinkObj[];
//   return yml;
// };
