import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import SquiglyLine from "./SquiglyLine";

export interface WidgetProps {
  title?: string;
}

export default component$<WidgetProps>((props) => {
  useStyles$(styles);
  return (
    <div class="widget-container">
      <div class="widget-header">
        {props.title && (
          <>
            <h3 class="widget-title">{props.title}</h3>
            <SquiglyLine />
          </>
        )}
      </div>
      <Slot />
    </div>
  );
});
