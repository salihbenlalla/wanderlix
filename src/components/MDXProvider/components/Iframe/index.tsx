import { component$ } from "@builder.io/qwik";

type ElementProps = {
  [key: string]: any;
};

const Iframe = component$((props: ElementProps) => {
  return <iframe {...props} />;
});

export default Iframe;
