import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import adPlaceHolder from "./ad_placeholder.jpg";

export interface AdPlacerProps {
  kind: "1" | "2" | "3";
}

const AdPlacer = component$<AdPlacerProps>(({ kind }) => {
  useStyles$(styles);
  return (
    <div class="ad_placer">
      {kind === "1" ? (
        // <div>ad placer 1</div>
        <img width="250" height="250" src={adPlaceHolder} />
      ) : kind === "2" ? (
        // <div>ad placer 2</div>
        <img width="250" height="250" src={adPlaceHolder} />
      ) : kind === "3" ? (
        // <div>ad placer 3</div>
        <img width="250" height="250" src={adPlaceHolder} />
      ) : (
        // <div>bannauto</div>
        <img width="250" height="250" src={adPlaceHolder} />
      )}
    </div>
  );
});

export default AdPlacer;
