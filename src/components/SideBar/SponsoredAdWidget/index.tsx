import { component$, useStyles$ } from "@builder.io/qwik";
import { Image } from "qwik-image";
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
        {/* <img
          src={props.imageUrl}
          alt="Advertisement"
          width="356"
          height="361"
        /> */}

        <Image
          layout="fullWidth"
          objectFit="cover"
          aspectRatio={356 / 361}
          width={356}
          height={361}
          alt="alt text"
          placeholder="#e6e6e6"
          src={props.imageUrl}
          loading="lazy"
        />
      </a>
    </div>
  );
});
