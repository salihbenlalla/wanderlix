import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

const PartenaireTop = component$(() => {
  useStyles$(style);
  return (
    <div class="partner_card">
      <Slot />
    </div>
  );
});

export default PartenaireTop;
