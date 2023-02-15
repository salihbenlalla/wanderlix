import { component$, Slot } from "@builder.io/qwik";

const HotelDisplayTitle = component$(() => {
  return (
    <span class="hotel_price">
      <Slot />
    </span>
  );
});

export default HotelDisplayTitle;
