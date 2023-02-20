import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

const DisplayGenerique = component$(() => {
  useStyles$(style);
  return (
    <div class="generic_card">
      <Slot />
    </div>
  );
});

export default DisplayGenerique;