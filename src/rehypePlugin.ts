import type { RootContent } from "hast";
import type { Properties } from "hast";
import type { MdxJsxAttributeValueExpression } from "mdast-util-mdx-jsx";
import type { MdxJsxFlowElement, MdxJsxTextElement } from "mdast-util-mdx-jsx";
import { type D1Database } from "@miniflare/d1";
import { getLink } from "./lib/helpers/getLinks";
import { getIframeSrc } from "./lib/helpers/getIframeSrcs";
import { getSiteName } from "./lib/helpers/getSiteName";
import { getOrigin } from "./lib/helpers/getOrigin";
import { getDomainName } from "./lib/helpers/getDomainName";

type VisitorAsync = (node: RootContent, parent?: RootContent) => Promise<void>;
async function visit(
  node: RootContent,
  visitor: VisitorAsync,
  parent?: RootContent,
): Promise<void> {
  await visitor(node, parent);

  if ("children" in node) {
    const parentForChildren = node;
    const children = parentForChildren.children;

    if (children.length) {
      for (const child of children) {
        await visit(child, visitor, parentForChildren);
      }
    }
  }
}

type MdxJsxElementFields = MdxJsxFlowElement | MdxJsxTextElement;

interface LinkProperties extends Properties {
  href?: string;
  title?: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
}

const handleLink = async (
  DB: D1Database,
  href?: string | null,
  title?: string,
  use?: "none" | "originalHref" | "newHref",
): Promise<LinkProperties> => {
  const origin = getOrigin();
  if (
    href?.startsWith("/post") ||
    href?.startsWith("/author") ||
    href?.startsWith("/destination") ||
    href?.startsWith("/tag") ||
    href?.startsWith(origin)
  ) {
    if (!href?.endsWith("/")) {
      return { href: `${href}/`, title };
    }
    return { href, title };
  }

  if (href?.startsWith("@@SITE_ORIGIN@@")) {
    const pathname = href.replace("@@SITE_ORIGIN@@", "");
    const siteOrigin = getOrigin();
    return { href: `${siteOrigin}${pathname}` };
  }

  if (!href?.startsWith("link_id:")) return { href: undefined };

  const linkId = Number(href.replace("link_id:", ""));

  const foundLink = await getLink(DB, linkId);

  const iHref =
    use === "none"
      ? undefined
      : use
        ? foundLink?.[use]
        : foundLink?.use === "none"
          ? undefined
          : foundLink?.[foundLink.use];

  const iTitle = !href.startsWith("/post") && !iHref ? undefined : title;
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
  DB: D1Database,
  src?: string | MdxJsxAttributeValueExpression | null | undefined,
  use?: "none" | "originalSrc" | "newSrc",
) => Promise<string | MdxJsxAttributeValueExpression | null | undefined>;

export const findSrc: FindSrcFunc = async (DB, src, use) => {
  if (typeof src === "object" || src?.startsWith("/post")) return src;

  const srcId = Number(src?.replace("srcId:", "").replace("src_id:", ""));

  const foundSrc = await getIframeSrc(DB, srcId);

  if (use === "none") return;

  if (use) return foundSrc?.[use];

  if (foundSrc?.use === "none") return;

  return foundSrc?.[foundSrc.use];
};

const attributeExists = (
  attributesArr: MdxJsxElementFields["attributes"],
  attribute: string,
): boolean => {
  for (const attr of attributesArr) {
    if (attr.type === "mdxJsxAttribute" && attr.name === attribute) return true;
  }
  return false;
};

// const replaceLinkIds: Plugin<[D1Database], RootContent> = (DB: D1Database) => {
const replaceLinkIds = (DB: D1Database) => {
  return async (tree: RootContent) => {
    await visit(tree, async (node) => {
      if (node.type === "element" && node.tagName == "a") {
        const { href, title } = node.properties as LinkProperties;
        const newLinkProperties = await handleLink(DB, href, title);

        node.properties = {};
        node.properties.href = newLinkProperties.href;
        node.properties.title = newLinkProperties.title;
        node.properties.target = newLinkProperties.target;
        node.properties.rel = newLinkProperties.rel;
      }

      //components with linkId
      if (
        node.type === "mdxJsxFlowElement" &&
        attributeExists(node.attributes, "linkId")
      ) {
        const newAttributes = await Promise.all(
          node.attributes.map(async (attr: any) => {
            if (attr.type === "mdxJsxAttribute" && attr.name === "linkId") {
              const returnedObj = await handleLink(DB, attr.value, undefined);
              const { href } =
                typeof attr.value !== "object"
                  ? returnedObj
                  : { href: undefined };
              attr.value = href;
            }
            return attr;
          }),
        );
        node.attributes = newAttributes;
      }
      // components with SrcId
      if (node.type === "mdxJsxFlowElement" && node.name == "Iframe") {
        const newAttributes = await Promise.all(
          node.attributes.map(async (attr: any) => {
            if (attr.type === "mdxJsxAttribute" && attr.name === "src") {
              const src = attr.value;
              const newSrc = await findSrc(DB, src);

              attr.value = newSrc;
            }
            return attr;
          }),
        );
        node.attributes = newAttributes;
      }

      // <a> tags
      if (node.type === "mdxJsxFlowElement" && node.name == "a") {
        const newAttributes = await Promise.all(
          node.attributes.map(async (attr: any) => {
            if (attr.type === "mdxJsxAttribute" && attr.name === "href") {
              const href = attr.value;
              const newHref = await handleLink(DB, href as string, undefined);
              attr.value = newHref.href;
            }
            return attr;
          }),
        );
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
      if (node.type === "mdxJsxFlowElement" && node.name == "ImageAd") {
        const newAttributes = await Promise.all(
          node.attributes.map(async (attr: any) => {
            if (attr.type === "mdxJsxAttribute" && attr.name === "aHref") {
              const href = attr.value;
              const newHref = await handleLink(DB, href as string, undefined);
              attr.value = newHref.href;
            }
            return attr;
          }),
        );
        node.attributes = newAttributes;
      }

      if (node.type === "text" && node.value.includes("@@SITE_DOMAIN_NAME@@")) {
        const domainName = getDomainName();
        node.value = node.value.replaceAll("@@SITE_DOMAIN_NAME@@", domainName);
      }

      if (node.type === "text" && node.value.includes("@@SITE_NAME@@")) {
        const domainName = getSiteName();
        node.value = node.value.replaceAll("@@SITE_NAME@@", domainName);
      }

      if (node.type === "text" && node.value.includes("@@SITE_ORIGIN@@")) {
        const domainName = getOrigin();
        node.value = node.value.replaceAll("@@SITE_ORIGIN@@", domainName);
      }
    });
  };
};

export default replaceLinkIds;
