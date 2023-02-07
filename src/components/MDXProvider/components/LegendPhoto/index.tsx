import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

const LegendPhoto = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="legend_photo">
      <Slot />
    </div>
  );
});

export default LegendPhoto;
