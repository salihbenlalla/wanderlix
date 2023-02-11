import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";

export type SearchWidgetProps = {
  icon: string;
  text: string;
};

const SearchWidget = component$<SearchWidgetProps>((props) => {
  useStyles$(styles);

  const SVGIcon = svgxImport(props.icon);

  return (
    <div class="widget_search">
      {SVGIcon && <SVGIcon width="32" height="32" />}
      {props.text}
    </div>
  );
});

export default SearchWidget;
