import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

const DisplayGeneriqueBody = component$(() => {
  useStyles$(style);
  return (
    <div class="generic_card_body">
      <Slot />
    </div>
  );
});

export default DisplayGeneriqueBody;