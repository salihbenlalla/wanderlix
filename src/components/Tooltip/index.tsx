import { $, component$, Slot, useContext, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { ThemeContext } from "~/routes/layout";

interface ButtonProps {
  isCheckbox?: boolean;
}

const Tooltip = component$<ButtonProps>((props) => {
  useStyles$(styles);

  const theme = useContext(ThemeContext);

  const handleDeleteClick = $(() => {
    theme.deleteModalType = "userInfo";
    theme.deleteModalOpen = true;
  });
  return (
    <div class="tooltip-container">
      <Slot />
      {theme.userInfoRemembered && (
        <div class={`tooltip-text${props.isCheckbox ? " is-checkbox" : ""}`}>
          Your info are saved in this browser,{" "}
          <span class="tooltip-link" onClick$={handleDeleteClick}>
            click here if you want to delete them
          </span>
        </div>
      )}
    </div>
  );
});

export default Tooltip;
