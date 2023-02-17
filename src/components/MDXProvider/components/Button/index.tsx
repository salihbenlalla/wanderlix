import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";
import styles from "./style.css?inline";

interface ButtonProps {
  icon?: string;
  color?: "button_gray" | "button_orange" | "button_blue";
}

const Button = component$<ButtonProps>((props) => {
  useStyles$(styles);
  const SVGIcon = props.icon ? svgxImport(props.icon) : "";
  return (
    <div class={`button ${props.color}`}>
      <Slot />
      {SVGIcon && <SVGIcon width="26" height="26" viewBox="0 -6 36 36" />}
    </div>
  );
});

export default Button;
