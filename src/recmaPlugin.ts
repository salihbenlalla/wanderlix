import { visit } from "estree-util-visit";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import type { LinkObj, SrcObj } from "./data/dataContext";
import type { Root, Properties } from "hast";
import type { Plugin } from "unified";
import type { Program } from "estree-jsx";

interface LinkProperties extends Properties {
  href?: string;
  title?: string;
}

const handleLink = (
  linkObjs: LinkObj[],
  href?: string,
  title?: string,
  use?: "none" | "originalHref" | "newHref"
): LinkProperties => {
  if (href?.startsWith("https://travel2.ml")) return { href, title };
  const foundLink = linkObjs.find(
    (o) => o.id === Number(href?.replace("link_id:", ""))
  );

  const iHref =
    use === "none"
      ? undefined
      : use
      ? foundLink?.[use]
      : foundLink?.use === "none"
      ? undefined
      : foundLink?.[foundLink.use];
  const iTitle =
    !href?.startsWith("https://travel2.ml") && !iHref ? undefined : title;
  return {
    href: iHref,
    title: iTitle,
  };
};

export const findSrc: (
  srcObjs: SrcObj[],
  src?: string | null,
  use?: "none" | "originalSrc" | "newSrc"
) => string | undefined = (srcObjs, src, use) => {
  if (src?.startsWith("https://travel2.ml")) return src;
  const foundLink = srcObjs.find(
    (o) => o.id === Number(src?.replace("srcId:", ""))
  );

  if (use === "none") return;

  if (use) return foundLink?.[use];

  if (foundLink?.use === "none") return;

  return foundLink?.[foundLink?.use];
};

const replaceLinkIds: Plugin<[], Program> = () => {
  const linkObjs = yaml.load(
    fs.readFileSync(
      path.join(process.cwd(), "/src/data", "linkIds.yml"),
      "utf-8"
    )
  ) as LinkObj[];

  const srcObjs = yaml.load(
    fs.readFileSync(
      path.join(process.cwd(), "/src/data", "iframeSrcs.yml"),
      "utf-8"
    )
  ) as SrcObj[];

  return (tree) => {
    fs.writeFileSync(
      path.join(process.cwd(), "/src/data", "tree.json"),
      JSON.stringify(tree),
      "utf-8"
    );
    visit(tree, (node) => {
      console.log("node: ", node);
      if (node?.type === "JSXElement") {
        // const { href, title } = node.properties as LinkProperties;
        // const newLinkProperties = handleLink(
        //   linkObjs,
        //   href,
        //   title,
        //   "originalHref"
        // );
        // node.properties = node.properties ?? {};
        // node.properties.href = newLinkProperties.href;
        // node.properties.title = newLinkProperties.title;
      }

      //   console.log("node: ", node);
      //   if (node?.type === "element" && node.tagName == "iframe") {
      //     const src = node.properties?.src as string | undefined | null;
      //     const newSrc = findSrc(srcObjs, src);
      //     node.properties = node.properties ?? {};
      //     node.properties.src = newSrc;
      //   }
    });
  };
};

export default replaceLinkIds;
