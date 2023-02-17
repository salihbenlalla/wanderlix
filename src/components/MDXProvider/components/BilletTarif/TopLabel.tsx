import { component$, Slot } from "@builder.io/qwik";

export interface TopLabelProps {
  color: "red" | "blue";
}

const TopLabel = component$<TopLabelProps>((props) => {
  const color = `ticket_tarifs_top_label ${props.color}`;
  return (
    <span class={color}>
      <Slot />
    </span>
  );
});

export default TopLabel;
