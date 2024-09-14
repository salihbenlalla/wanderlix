import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

interface AuthorTooltipProps {
  socialMedia: string;
}

const AuthorTooltip = component$<AuthorTooltipProps>((props) => {
  useStyles$(styles);

  return (
    <div class="author-tooltip-container">
      <Slot />
      <span class="author-tooltip-text">
        This author has no{" "}
        {props.socialMedia +
          (props.socialMedia === "website" ? "" : " account")}
      </span>
    </div>
  );
});

export default AuthorTooltip;
