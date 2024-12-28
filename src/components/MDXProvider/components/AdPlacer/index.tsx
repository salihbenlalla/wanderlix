import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
// import { ImageWithFallback } from "~/components/ImageWithFallback";
// import adPlaceHolder from "./ad_placeholder.jpg";

export interface AdPlacerProps {
  kind: "1" | "2" | "3";
}

const AdPlacer = component$<AdPlacerProps>((/*{ kind }*/) => {
  useStyles$(styles);
  // const adPlaceHolderUrl = "/images/etc/ad_placeholder.jpg";
  return <></>;
  // return (
  //   <div class="ad_placer">
  //     {kind === "1" ? (
  //       <ImageWithFallback
  //         width={250}
  //         height={250}
  //         src={adPlaceHolderUrl}
  //         alt="Advertisement"
  //         loading="lazy"
  //       />
  //     ) : kind === "2" ? (
  //       <ImageWithFallback
  //         width={250}
  //         height={250}
  //         src={adPlaceHolderUrl}
  //         alt="Advertisement"
  //         loading="lazy"
  //       />
  //     ) : (
  //       <ImageWithFallback
  //         width={250}
  //         height={250}
  //         src={adPlaceHolderUrl}
  //         alt="Advertisement"
  //         loading="lazy"
  //       />
  //     )}
  //   </div>
  // );
});

export default AdPlacer;
