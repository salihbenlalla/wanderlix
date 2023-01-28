import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";
import styles from "./style.css?inline";

interface ButtonSectionProps {
  icon?: string;
}

const ButtonSection = component$<ButtonSectionProps>((props) => {
  useStylesScoped$(styles);
  const SVGIcon = props.icon
    ? svgxImport(props.icon.replace("icon-", "").replace("idea", "light-bulb"))
    : "";
  return (
    <div class="button_section">
      <Slot />
      {SVGIcon && <SVGIcon width="32" />}
    </div>
  );
});

export default ButtonSection;
