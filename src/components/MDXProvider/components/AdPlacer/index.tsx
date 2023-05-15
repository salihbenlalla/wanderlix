import { component$, useStyles$ } from "@builder.io/qwik";
import { Image } from "qwik-image";
import styles from "./style.css?inline";
// import adPlaceHolder from "./ad_placeholder.jpg";

export interface AdPlacerProps {
  kind: "1" | "2" | "3";
}

const AdPlacer = component$<AdPlacerProps>(({ kind }) => {
  useStyles$(styles);
  const adPlaceHolderUrl = "ad_placeholder_a3at3b";
  return (
    <div class="ad_placer">
      {kind === "1" ? (
        // <div>ad placer 1</div>
        //   <img width="250" height="250" src={adPlaceHolder} />
        <Image
          layout="fullWidth"
          objectFit="cover"
          aspectRatio={250 / 250}
          width={250}
          height={250}
          alt="alt text"
          placeholder="#e6e6e6"
          src={adPlaceHolderUrl}
          loading="lazy"
        />
      ) : kind === "2" ? (
        // <div>ad placer 2</div>
        // <img width="250" height="250" src={adPlaceHolder} />
        <Image
          layout="fullWidth"
          objectFit="cover"
          aspectRatio={250 / 250}
          width={250}
          height={250}
          alt="alt text"
          placeholder="#e6e6e6"
          src={adPlaceHolderUrl}
          loading="lazy"
        />
      ) : kind === "3" ? (
        // <div>ad placer 3</div>
        // <img width="250" height="250" src={adPlaceHolder} />
        <Image
          layout="fullWidth"
          objectFit="cover"
          aspectRatio={250 / 250}
          width={250}
          height={250}
          alt="alt text"
          placeholder="#e6e6e6"
          src={adPlaceHolderUrl}
          loading="lazy"
        />
      ) : (
        // <div>bannauto</div>
        // <img width="250" height="250" src={adPlaceHolder} />
        <Image
          layout="fullWidth"
          objectFit="cover"
          aspectRatio={250 / 250}
          width={250}
          height={250}
          alt="alt text"
          placeholder="#e6e6e6"
          src={adPlaceHolderUrl}
          loading="lazy"
        />
      )}
    </div>
  );
});

export default AdPlacer;
