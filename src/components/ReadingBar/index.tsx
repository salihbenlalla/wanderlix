import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);
  const barRef = useSignal<HTMLElement>();
  useOnWindow(
    "scroll",
    $(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (barRef.value) {
        barRef.value.style.width = `${(scrollTop / (scrollHeight - clientHeight)) * 100}%`;
      }
    }),
  );
  return (
    <div class="reading-bar-wrapper">
      <div class="reading-bar" ref={barRef}></div>
    </div>
  );
});
