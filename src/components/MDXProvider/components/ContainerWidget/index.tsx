import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export type ContainerWidgetProps = {};

const ContainerWidget = component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="container_widget">
      <Slot />
    </div>
  );
});

export default ContainerWidget;
