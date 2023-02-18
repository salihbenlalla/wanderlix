import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

const GiftBlock = component$(() => {
  useStyles$(style);
  return (
    <div class="gift_block">
      <Slot />
    </div>
  );
});

export default GiftBlock;
