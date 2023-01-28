import type { AnchorProps } from "~/components/MDXProvider/components/Anchor";
import type { SrcObj, LinkObj } from "~/data/dataContext";

export const findSrc: (
  srcObjs: SrcObj[],
  href: string,
  use?: "none" | "originalSrc" | "newSrc"
) => string | undefined = (srcObjs, href, use) => {
  const foundLink = srcObjs.find(
    (o) => o.id === Number(href.replace("srcId:", ""))
  );

  //originalHref
  if (foundLink && foundLink.use === use) {
    return foundLink.originalSrc;
  }
  //newHref
  if (foundLink && foundLink.use === use) {
    return foundLink.newSrc;
  }
};

export const handleAnchorProps = (
  linkObjs: LinkObj[],
  props: AnchorProps,
  use?: "none" | "originalHref" | "newHref"
) => {
  const foundLink = props.href.startsWith("https://travel2.ml")
    ? undefined
    : linkObjs.find((o) => o.id === Number(props.href.replace("link_id:", "")));

  const iHref =
    use === "none"
      ? undefined
      : use
      ? foundLink?.[use]
      : foundLink?.use === "none"
      ? undefined
      : foundLink?.[foundLink.use];
  const iTitle =
    !props.href.startsWith("https://travel2.ml") && !iHref
      ? undefined
      : props.title;
  const iProps = props.href.startsWith("https://travel2.ml")
    ? props
    : {
        ...props,
        target: "_blank",
        rel: "nofollow noopener noreferrer",
        href: iHref,
        title: iTitle,
      };
  return iProps;
};
