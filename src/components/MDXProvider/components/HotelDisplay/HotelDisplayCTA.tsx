import { component$, Slot } from "@builder.io/qwik";

const HotelDisplayCTA = component$(() => {
  return (
    <span class="hotel_cta">
      <Slot />
    </span>
  );
});

export default HotelDisplayCTA;
