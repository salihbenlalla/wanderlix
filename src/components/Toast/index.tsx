import {
  component$,
  useStyles$,
  useContext,
  $,
  useTask$,
} from "@builder.io/qwik";
import CloseIcon from "~/assets/icomoon_svg/closex.svg";
import styles from "./style.css?inline";
import { ThemeContext } from "~/routes/layout";

// write a modal component
export const Toast = component$(() => {
  const theme = useContext(ThemeContext);
  useStyles$(styles);

  // eslint-disable-next-line qwik/no-use-visible-task
  useTask$(({ track }) => {
    track(() => theme.toast.isVisible);
    if (theme.toast.isVisible) {
      delay(3000).then(() => {
        theme.toast.isVisible = false;
      });
    }
  });

  const handleHideToast = $(() => {
    theme.toast.isVisible = false;
  });

  return (
    <>
      {theme.toast.isVisible && (
        <div class={`toast ${theme.toast.type}`}>
          <span class="toast-text">{theme.toast.message}</span>
          <span class="toast-close-button" onClick$={handleHideToast}>
            <CloseIcon />
          </span>
        </div>
      )}
    </>
  );
});

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
