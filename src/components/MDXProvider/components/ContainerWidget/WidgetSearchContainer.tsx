import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export type WidgetSearchContainerProps = {};

const WidgetSearchContainer = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="widget_search_container">
      <Slot />
    </div>
  );
});

export default WidgetSearchContainer;
