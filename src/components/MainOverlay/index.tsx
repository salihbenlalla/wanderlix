import { component$, useContext, useStyles$ } from "@builder.io/qwik";
import { ThemeContext } from "~/routes/layout";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);

  return (
    <div
      class={`main-overlay${theme.sideMenuOpen === true ? " active" : ""}`}
      onClick$={() => {
        console.log(theme.sideMenuOpen);
      }}
    ></div>
  );
});
