import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { ImageWithFallback } from "~/components/ImageWithFallback";

export interface SponsoredAdWidgetProps {
  imageUrl: string;
  adUrl: string;
}

export default component$<SponsoredAdWidgetProps>((props) => {
  useStyles$(styles);
  return (
    <div class="ad-widget">
      <span class="ads-title">- Sponsored Ad -</span>
      <a href={props.adUrl} class="widget-ads">
        <ImageWithFallback
          src={props.imageUrl}
          alt="Advertisement"
          width={356}
          height={361}
          aspectRatio={356 / 361}
          loading="lazy"
        />
      </a>
    </div>
  );
});
