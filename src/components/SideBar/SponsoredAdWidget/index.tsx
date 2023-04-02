import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export interface SponsoredAdWidgetProps {
  imageUrl: string;
  adUrl: string;
}

export default component$<SponsoredAdWidgetProps>((props) => {
  useStyles$(styles);
  return (
    <div class="textwidget custom-html-widget">
      <span class="ads-title">- Sponsored Ad -</span>
      <a href={props.adUrl} class="widget-ads">
        <img
          src={props.imageUrl}
          alt="Advertisement"
          width="356"
          height="361"
        />
      </a>
    </div>
  );
});
