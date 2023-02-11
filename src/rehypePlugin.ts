import { visit } from "unist-util-visit";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import type { LinkObj, SrcObj } from "./data/dataContext";
import type { Root, Properties } from "hast";
import type { Plugin } from "unified";
import type { MdxJsxAttributeValueExpression } from "mdast-util-mdx-jsx";
import type { MdxJsxElementFields } from "mdast-util-mdx-jsx/lib/complex-types";

interface LinkProperties extends Properties {
  href?: string;
  title?: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
}

const handleLink = (
  linkObjs: LinkObj[],
  href?: string | null,
  title?: string,
  use?: "none" | "originalHref" | "newHref"
): LinkProperties => {
  if (href?.startsWith("https://travel2.ml")) return { href, title };

  if (!href?.startsWith("link_id:")) return { href: undefined };

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
  if (!iHref)
    return {
      href: iHref,
      title: iTitle,
    };

  return {
    href: iHref,
    title: iTitle,
    target: "_blank",
    rel: "noopener noreferrer",
  };
};

type FindSrcFunc = (
  srcObjs: SrcObj[],
  src?: string | MdxJsxAttributeValueExpression | null | undefined,
  use?: "none" | "originalSrc" | "newSrc"
) => string | MdxJsxAttributeValueExpression | null | undefined;

export const findSrc: FindSrcFunc = (srcObjs, src, use) => {
  if (typeof src === "object" || src?.startsWith("https://travel2.ml"))
    return src;
  const foundSrc = srcObjs.find(
    (o) => o.id === Number(src?.replace("srcId:", "").replace("src_id:", ""))
  );

  if (use === "none") return;

  if (use) return foundSrc?.[use];

  if (foundSrc?.use === "none") return;

  return foundSrc?.[foundSrc?.use];
};

const attributeExists = (
  attributesArr: MdxJsxElementFields["attributes"],
  attribute: string
): boolean => {
  for (const attr of attributesArr) {
    if (attr.type === "mdxJsxAttribute" && attr.name === attribute) return true;
  }
  return false;
};

const replaceLinkIds: Plugin<[], Root> = () => {
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
    visit(tree, (node) => {
      if (node?.type === "element" && node.tagName == "a") {
        const { href, title } = node.properties as LinkProperties;
        const newLinkProperties = handleLink(
          linkObjs,
          href,
          title,
          "originalHref"
        );

        node.properties = node.properties ?? {};
        node.properties.href = newLinkProperties.href;
        node.properties.title = newLinkProperties.title;
        node.properties.target = newLinkProperties.target;
        node.properties.rel = newLinkProperties.rel;
      }

      //components with linkId
      if (
        node?.type === "mdxJsxFlowElement" &&
        attributeExists(node.attributes, "linkId")
      ) {
        const newAttributes = node.attributes.map((attr) => {
          if (attr.type === "mdxJsxAttribute" && attr.name === "linkId") {
            const { href } =
              typeof attr.value !== "object"
                ? handleLink(linkObjs, attr.value, undefined, "originalHref")
                : { href: undefined };
            attr.value = href;
          }
          return attr;
        });
        node.attributes = newAttributes;
      }
      // components with SrcId
      if (node?.type === "mdxJsxFlowElement" && node.name == "Iframe") {
        const newAttributes = node.attributes.map((attr) => {
          if (attr.type === "mdxJsxAttribute" && attr.name === "src") {
            const src = attr.value;
            const newSrc = findSrc(srcObjs, src, "originalSrc");
            attr.value = newSrc;
          }
          return attr;
        });
        node.attributes = newAttributes;
      }

      // <a> tags
      if (node?.type === "mdxJsxFlowElement" && node.name == "a") {
        const newAttributes = node.attributes.map((attr) => {
          if (attr.type === "mdxJsxAttribute" && attr.name === "href") {
            const href = attr.value;
            const newHref = handleLink(
              linkObjs,
              href as string,
              undefined,
              "originalHref"
            );
            attr.value = newHref.href;
          }
          return attr;
        });
        newAttributes.push({
          type: "mdxJsxAttribute",
          name: "target",
          value: "_blank",
        });
        newAttributes.push({
          type: "mdxJsxAttribute",
          name: "rel",
          value: "noopener noreferrer",
        });
        node.attributes = newAttributes;
      }

      // <ImageAd aHref="link_id">
      if (node?.type === "mdxJsxFlowElement" && node.name == "ImageAd") {
        const newAttributes = node.attributes.map((attr) => {
          if (attr.type === "mdxJsxAttribute" && attr.name === "aHref") {
            const href = attr.value;
            const newHref = handleLink(
              linkObjs,
              href as string,
              undefined,
              "originalHref"
            );
            attr.value = newHref.href;
          }
          return attr;
        });
        node.attributes = newAttributes;
      }
    });
  };
};

export default replaceLinkIds;
