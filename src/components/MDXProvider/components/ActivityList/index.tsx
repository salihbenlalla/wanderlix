import { component$, Slot, useStore, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import { loader$ } from "@builder.io/qwik-city";

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

export const findLink: (
  linkObjs: LinkObj[],
  href: string,
  use: string
) => string | undefined = (linkObjs, href, use) => {
  const foundLink = linkObjs.find(
    (o) => o.id === Number(href.replace("link_id:", ""))
  );

  //originalHref
  if (foundLink && foundLink.use === use) {
    return foundLink.originalHref;
  }
  //newHref
  if (foundLink && foundLink.use === use) {
    return foundLink.newHref;
  }
};

export type ActivityListProps = {
  activityHeader: string;
  activityImage: string;
  CTALink: string;
  CTAText: string;
  activityPrice: string;
};

const ActivityList = component$((props: ActivityListProps) => {
  useStylesScoped$(styles);
  const state = useStore({ showCTA: false });
  const links = linkObjs.use().value;
  const CTALink = findLink(links, props.CTALink, "originalHref");
  return (
    <div class="activity_list">
      <div class="activity_header">{props.activityHeader}</div>
      <div class="activity_body">
        <div class="activity_image">
          <img
            loading="lazy"
            src={props.activityImage}
            alt={props.activityImage
              .replace("https://cdn.travel2.ml/", "")
              .replace("-", " ")
              .slice(0, props.activityImage.length - 4)}
            width="200"
            height="150"
          />
        </div>
        <div class="activity_description">
          <Slot />
        </div>
        <div class="clear"></div>
        {state.showCTA && (
          <div class="cta">
            <div class="activity_price">{props.activityPrice}</div>
            <a
              class="activity_button"
              href={CTALink}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {props.CTAText}
            </a>
          </div>
        )}
      </div>
    </div>
  );
});

export default ActivityList;
