import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";

interface SingleTagProps {
  url: string;
  tagName: string;
}

export default component$<SingleTagProps>((props) => {
  useStyles$(styles);

  return (
    <a href={`/tag/${props.url}`} class="tag-cloud__tag">
      #{props.tagName}
    </a>
  );
});
