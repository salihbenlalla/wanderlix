import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export interface AnchorProps {
  [key: string]: any;
}

const Anchor = component$((props: AnchorProps) => {
  useStyles$(styles);

  return (
    <a {...props}>
      <Slot />
    </a>
  );
});

export default Anchor;
