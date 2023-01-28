import {
  component$,
  Slot,
  // useContext,
  // useStore,
  useStylesScoped$,
  // useTask$,
} from "@builder.io/qwik";
// import { isServer } from "@builder.io/qwik/build";
import styles from "./style.css?inline";
// import { dataContext } from "~/data/dataContext";
// import { handleAnchorProps } from "~/data/utils";

export interface AnchorProps {
  [key: string]: any;
}

const Anchor = component$((props: AnchorProps) => {
  useStylesScoped$(styles);
  // const context = useContext(dataContext);
  // const store = useStore<{ iProps: AnchorProps }>({
  //   iProps: {},
  // });

  // useTask$(() => {
  //   if (isServer) {
  //     const iProps = handleAnchorProps(context.links, props, "originalHref");
  //     store.iProps = iProps;
  //   }
  // });

  return (
    <a {...props}>
      <Slot />
    </a>
  );
});

export default Anchor;
