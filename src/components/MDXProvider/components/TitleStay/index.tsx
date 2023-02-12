import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

const TitleStay = component$(() => {
  useStyles$(styles);
  return (
    <div class="title_stay">
      <Slot />
    </div>
  );
});

export default TitleStay;
