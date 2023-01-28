import {
  component$,
  Slot,
  // useContext,
  useStore,
  useStylesScoped$,
  // useTask$,
} from "@builder.io/qwik";
// import { isServer } from "@builder.io/qwik/build";
import styles from "./style.css?inline";
// import { dataContext } from "~/data/dataContext";
// import { findSrc } from "~/data/utils";

export type ActivityListProps = {
  activityHeader: string;
  activityImage: string;
  CTALink: string;
  CTAText: string;
  activityPrice: string;
};

interface Store {
  showCTA: boolean;
}

const ActivityList = component$((props: ActivityListProps) => {
  useStylesScoped$(styles);
  // const links = useContext(dataContext).srcs;
  const state = useStore<Store>({ showCTA: false });

  // useTask$(() => {
  //   if (isServer) {
  //     const CTALink = findSrc(links, props.CTALink, "originalSrc");
  //     state.CTALink = CTALink;
  //   }
  // });

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
              href={props.CTALink}
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
