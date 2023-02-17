import { component$, Slot } from "@builder.io/qwik";

const ListBlockQuote = component$(() => {
  return (
    <div class="combined_list_blockquote">
      <Slot />
    </div>
  );
});

export default ListBlockQuote;
