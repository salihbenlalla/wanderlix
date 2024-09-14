import { component$, useStyles$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./style.css?inline";

interface SingleTagProps {
  url: string;
  tagName: string;
}

export default component$<SingleTagProps>((props) => {
  useStyles$(styles);

  return (
    <Link href={`/tag/${props.url}`} class="tag-cloud__tag">
      #{props.tagName}
    </Link>
  );
});
