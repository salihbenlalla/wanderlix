import {
  component$,
  // useSignal,
  useStyles$,
  // useVisibleTask$,
} from "@builder.io/qwik";
import Section2Content from "./Section2Content";
import styles from "./style.css?inline";

const Section2 = component$(() => {
  useStyles$(styles);

  // const heroHeight = useSignal<number | string>("calc(100vh - 87px)");

  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(() => {
  //   heroHeight.value = `${document.documentElement.clientHeight - 87}px`;
  // });

  return (
    <div class="section2-container">
      <Section2Content />
    </div>
  );
});

export default Section2;
