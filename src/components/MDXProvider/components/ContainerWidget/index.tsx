import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export type ContainerWidgetProps = {};

const ContainerWidget = component$(() => {
  useStyles$(styles);

  return (
    <div class="container_widget">
      <Slot />
    </div>
  );
});

export default ContainerWidget;
