import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import Icon from "../Icon";
import styles from "./style.css?inline";

export interface MainPaysProps {
  title?: string;
  link?: string;
  imgSrc?: string;
}

const MainPays = component$<MainPaysProps>((props) => {
  useStyles$(styles);
  return (
    <div class="read_more_card">
      <div class="read_more_card_title">{props.title}</div>
      <a href={props.link}>
        <img src={props.imgSrc} />
        <span>
          <Slot />
        </span>
        <Icon icon="cheveron-right" />
      </a>
    </div>
  );
});

export default MainPays;
