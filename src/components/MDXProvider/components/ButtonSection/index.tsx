import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";
import styles from "./style.css?inline";

interface ButtonSectionProps {
  icon?: string;
  color?: "button_section_gray" | "button_section_orange";
}

const ButtonSection = component$<ButtonSectionProps>((props) => {
  useStyles$(styles);
  const SVGIcon = props.icon ? svgxImport(props.icon) : "";
  return (
    <div class={`button_section ${props.color}`}>
      <Slot />
      {SVGIcon && <SVGIcon width="26" height="26" viewBox="0 -6 36 36" />}
    </div>
  );
});

export default ButtonSection;
