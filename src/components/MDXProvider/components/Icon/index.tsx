import { component$, useStyles$ } from "@builder.io/qwik";
import type {
  FunctionComponent,
  QwikIntrinsicElements,
} from "@builder.io/qwik";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";
import style from "./style.css?inline";

export interface IconProps {
  icon?: string;
  svgProps?: FunctionComponent<QwikIntrinsicElements["svg"]>;
}

const Icon = component$<IconProps>((props) => {
  useStyles$(style);
  const SVGIcon = props.icon ? svgxImport(props.icon) : undefined;
  return <>{SVGIcon && <SVGIcon {...props.svgProps} />}</>;
});

export default Icon;
