import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";
import styles from "./style.css?inline";

interface AffButtonProps {
  icon?: string;
}

const AffButton = component$<AffButtonProps>((props) => {
  console.log("props.icon : ", props.icon);
  const SVGIcon = props.icon ? svgxImport(props.icon) : undefined;
  useStylesScoped$(styles);
  return (
    <div class="aff_button">
      <Slot />
      {SVGIcon && <SVGIcon width={32} />}
    </div>
  );
});

export default AffButton;
