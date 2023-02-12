import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export interface TextContainerProps {
  title: string;
}

const TextContainer = component$<TextContainerProps>((props) => {
  useStyles$(styles);
  return (
    <div class="text_container">
      {props.title && <span class="text_container__title">{props.title}</span>}
      <Slot />
    </div>
  );
});

export default TextContainer;
