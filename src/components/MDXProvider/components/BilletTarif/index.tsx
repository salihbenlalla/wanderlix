import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

const BilletTarif = component$(() => {
  useStyles$(styles);
  return (
    <div class="ticket_tarifs">
      <Slot />
    </div>
  );
});

export default BilletTarif;
