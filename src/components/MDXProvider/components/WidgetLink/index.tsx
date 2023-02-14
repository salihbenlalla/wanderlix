import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

export interface WidgetLinkProps {
  title?: string;
  searchTerm?: string;
}

const WidgetLink = component$<WidgetLinkProps>((props) => {
  useStyles$(styles);
  return <span class="widget_link">{props.title}</span>;
});

export default WidgetLink;
