import { component$, Slot } from "@builder.io/qwik";

const ListCombine = component$(() => {
  return (
    <div class="combined_list">
      <Slot />
    </div>
  );
});

export default ListCombine;
