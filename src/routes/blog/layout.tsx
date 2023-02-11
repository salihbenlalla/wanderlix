import { component$, Slot, useStyles$ } from "@builder.io/qwik";

import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);

  return (
    <div class="post-content">
      <Slot />
    </div>
  );
});
