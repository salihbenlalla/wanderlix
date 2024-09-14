import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { Link } from "@builder.io/qwik-city";

export interface AnchorProps {
  href?: string;
  [key: string]: any;
}

const Anchor = component$((props: AnchorProps) => {
  useStyles$(styles);

  if (!props.href) {
    return <Slot />;
  }

  if (props.href.startsWith("/post/")) {
    return (
      <Link {...props}>
        <Slot />
      </Link>
    );
  }

  return (
    <a {...props} aria-label="clickable link">
      <Slot />
    </a>
  );
});

export default Anchor;
