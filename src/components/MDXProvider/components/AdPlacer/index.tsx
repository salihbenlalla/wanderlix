import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export interface AdPlacerProps {
  kind: "1" | "2" | "3";
}

const AdPlacer = component$<AdPlacerProps>(({ kind }) => {
  useStylesScoped$(styles);
  return (
    <div class="ad_placer">
      {kind === "1" ? (
        <div>ad placer 1</div>
      ) : kind === "2" ? (
        <div>ad placer 2</div>
      ) : kind === "3" ? (
        <div>ad placer 3</div>
      ) : (
        <div>bannauto</div>
      )}
    </div>
  );
});

export default AdPlacer;
