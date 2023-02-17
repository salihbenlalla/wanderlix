import { component$, Slot } from "@builder.io/qwik";

const ListCombineContainer = component$(() => {
  return (
    <div class="combined_list_container">
      <Slot />
    </div>
  );
});

export default ListCombineContainer;
