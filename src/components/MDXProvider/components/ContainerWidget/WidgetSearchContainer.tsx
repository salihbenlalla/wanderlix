import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export type WidgetSearchContainerProps = {};

const WidgetSearchContainer = component$(() => {
  useStyles$(styles);

  return (
    <div class="widget_search_container">
      <Slot />
    </div>
  );
});

export default WidgetSearchContainer;
