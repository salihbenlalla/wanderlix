import { component$, Slot, useStore, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { formatImageAlt } from "~/lib/helpers/formatImageAlt";
import { ImageWithFallback } from "~/components/ImageWithFallback";

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
  useStyles$(styles);
  const state = useStore<Store>({ showCTA: true });

  const imageAlt = formatImageAlt(props.activityImage);

  return (
    <div class="activity_list">
      <div class="activity_header">{props.activityHeader}</div>
      <div class="activity_body">
        <div class="activity_image">
          <ImageWithFallback
            loading="lazy"
            src={props.activityImage}
            alt={imageAlt}
            width={200}
            height={150}
          // aspectRatio={200 / 150}
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
