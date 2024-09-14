import { component$, useStyles$ } from "@builder.io/qwik";
// import { Image } from "qwik-image";
import styles from "./style.css?inline";
// import adPlaceHolder from "./ad_placeholder.jpg";

export interface AdPlacerProps {
  kind: "1" | "2" | "3";
}

const AdPlacer = component$<AdPlacerProps>(({ kind }) => {
  useStyles$(styles);
  const adPlaceHolderUrl = "/images/etc/ad_placeholder.jpg";
  return (
    <div class="ad_placer">
      {kind === "1" ? (
        <img
          width="250"
          height="250"
          src={adPlaceHolderUrl}
          alt="Advertisement"
          loading="lazy"
        />
      ) : // <Image
      //   layout="constrained"
      //   objectFit="cover"
      //   // aspectRatio={250 / 250}
      //   width={250}
      //   height={250}
      //   alt="ad"
      //   placeholder="#e6e6e6"
      //   src={adPlaceHolderUrl}
      //   loading="lazy"
      // />
      kind === "2" ? (
        <img
          width="250"
          height="250"
          src={adPlaceHolderUrl}
          alt="Advertisement"
          loading="lazy"
        />
      ) : (
        // <Image
        //   layout="constrained"
        //   objectFit="cover"
        //   // aspectRatio={250 / 250}
        //   width={250}
        //   height={250}
        //   alt="ad"
        //   placeholder="#e6e6e6"
        //   src={adPlaceHolderUrl}
        //   loading="lazy"
        // />
        <img
          width="250"
          height="250"
          src={adPlaceHolderUrl}
          alt="Advertisement"
          loading="lazy"
        />
        // <Image
        //   layout="constrained"
        //   objectFit="cover"
        //   // aspectRatio={250 / 250}
        //   width={250}
        //   height={250}
        //   alt="ad"
        //   placeholder="#e6e6e6"
        //   src={adPlaceHolderUrl}
        //   loading="lazy"
        // />
      )}
    </div>
  );
});

export default AdPlacer;
