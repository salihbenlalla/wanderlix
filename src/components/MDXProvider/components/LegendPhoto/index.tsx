import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

const LegendPhoto = component$(() => {
  useStyles$(styles);
  return (
    <div class="legend_photo">
      <Slot />
    </div>
  );
});

export default LegendPhoto;
