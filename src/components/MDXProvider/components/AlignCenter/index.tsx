import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

const AlignCenter = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="align_center">
      <Slot />
    </div>
  );
});

export default AlignCenter;
