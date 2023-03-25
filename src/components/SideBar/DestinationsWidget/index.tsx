import { component$, useStyles$ } from "@builder.io/qwik";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import CheveronRight from "/src/assets/icomoon_svg/cheveron-right.svg?component";

export interface Destination {
  name: string;
  url: string;
  count: number;
}

export interface DestinationsWidgetProps {
  title?: string;
  destinations: Destination[];
}

export default component$<DestinationsWidgetProps>((props) => {
  useStyles$(styles);
  return (
    <WidgetContainer title={props.title}>
      {props.destinations.length && (
        <ul class="dest-list">
          {props.destinations.map((destination, index) => {
            return (
              <>
                <li key={`destination-${index}`} class="dest-item">
                  <CheveronRight fill="#fe4f70" />
                  <a href={destination.url}>{destination.name}</a>
                  <span class="widget-count">({destination.count})</span>
                </li>
                {/* {index < props.posts.length - 1 && (
                  <div class="popular-posts-list-separator"></div>
                )} */}
              </>
            );
          })}
        </ul>
      )}
    </WidgetContainer>
  );
});
