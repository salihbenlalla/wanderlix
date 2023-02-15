import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import style from "./style.css?inline"

const HotelDisplay = component$(() => {
  useStyles$(style)
  return (
    <div class="hotel_card">
      <Slot />
    </div>
  );
});

export default HotelDisplay;