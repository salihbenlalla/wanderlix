import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline";

const Stay22Container = component$(() => {
  useStyles$(style);
  return (
    <div class="stay22_container">
      <Slot />
    </div>
  );
});

export default Stay22Container;
