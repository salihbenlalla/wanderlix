import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export type TableCarre2Props = {
  header?: string;
};

const TableCarre2 = component$((props: TableCarre2Props) => {
  useStylesScoped$(styles);
  return (
    <div class="tb_cr">
      <p class="tb_cr__header">{props.header}</p>
      <Slot />
    </div>
  );
});

export default TableCarre2;
