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
  const percentage = useSignal<number>(0);
  useOnWindow(
    "scroll",
    $(() => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      percentage.value = (scrollTop / (scrollHeight - clientHeight)) * 100;
    })
  );
  return (
    <div class="reading-bar-wrapper">
      <div class="reading-bar" style={{ width: `${percentage.value}%` }}></div>
    </div>
  );
});
