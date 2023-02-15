import { component$, Slot } from "@builder.io/qwik";

const HotelDisplayTitle = component$(() => {
  return (
    <div class="hotel_title">
      <Slot />
    </div>
  );
});

export default HotelDisplayTitle;
