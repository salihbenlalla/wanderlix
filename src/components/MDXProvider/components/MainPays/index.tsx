import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import svgxImport from "@svgx-dir:/src/assets/icomoon_svg";

export interface MainPaysProps {
  title?: string;
  link?: string;
  imgSrc?: string;
}

const MainPays = component$<MainPaysProps>((props) => {
  useStyles$(styles);
  const SVGIcon = svgxImport("cheveron-right");
  return (
    <div class="read_more_card">
      <div class="read_more_card_title">{props.title}</div>
      <a href={props.link}>
        <img src={props.imgSrc} />
        <span class="read_more_card_content">
          <Slot />
        </span>
        <span class="read_more_card_svg_wrapper">
          <SVGIcon class="icon_svg" viewBox="2 3 16 16" />
        </span>
      </a>
    </div>
  );
});

export default MainPays;
