import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import styles from "./style.css?inline";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

type ElementProps = {
  [key: string]: any;
};

interface LinkObj {
  id: number;
  originalHref: string;
  newHref: string;
  use: string;
}

export const linkObjs = loader$<unknown, LinkObj[]>(() => {
  const yml = yaml.load(
    fs.readFileSync(
      path.join(process.cwd(), "/src/data", "linkIds.yml"),
      "utf-8"
    )
  ) as LinkObj[];
  return yml;
});

const Anchor = component$((props: ElementProps) => {
  useStylesScoped$(styles);
  const links = linkObjs.use().value;
  if (props.href.startsWith("https://travel2.ml")) {
    return <a {...props} />;
  }
  const foundLink = links.find(
    (o) => o.id === Number(props.href.replace("link_id:", ""))
  );

  //originalHref
  if (foundLink && foundLink.use === "none") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, ...rest } = props;
    return (
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={foundLink.originalHref}
        {...rest}
      >
        <Slot />
      </a>
    );
  }
  if (foundLink && foundLink.use === "newHref") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href, ...rest } = props;
    return (
      <a
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={foundLink.newHref}
        {...rest}
      >
        <Slot />
      </a>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { href, title, ...rest } = props;
  return (
    <a
      target="_blank"
      rel="nofollow noopener noreferrer"
      href={props.href}
      {...rest}
    >
      <Slot />
    </a>
  );
});

export default Anchor;
