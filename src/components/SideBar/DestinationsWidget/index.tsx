import { component$, useStyles$ } from "@builder.io/qwik";
import WidgetContainer from "../WidgetContainer";
import styles from "./style.css?inline";
import CheveronRight from "/src/assets/icomoon_svg/cheveron-right.svg?component";
import { v4 as uuidv4 } from "uuid";
import { Link } from "@builder.io/qwik-city";

export interface Destination {
  countryName: string;
  countryParam: string;
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
          {props.destinations.map((destination) => {
            return (
              <li class="dest-item" key={uuidv4()}>
                <CheveronRight fill="#fe4f70" />
                <Link href={`/destination/${destination.countryParam}`}>
                  {destination.countryName}
                </Link>
                <span class="widget-count">({destination.count})</span>
              </li>
            );
          })}
        </ul>
      )}
    </WidgetContainer>
  );
});
