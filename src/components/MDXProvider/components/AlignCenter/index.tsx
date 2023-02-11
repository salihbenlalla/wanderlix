import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

const AlignCenter = component$(() => {
  useStyles$(styles);
  return (
    <div class="align_center">
      <Slot />
    </div>
  );
});

export default AlignCenter;
