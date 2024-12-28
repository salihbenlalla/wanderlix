import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./VerticalRule.css?inline";

export const VerticalRule = component$(() => {
  useStyles$(styles);
  return (
    <div class="vertical-rule">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 4"
        height="24px"
        viewBox="0 0 24 4"
        width="24px"
        fill="#dedede"
        stroke-width="1px"
      >
        <g>
          <rect fill="none" fill-rule="evenodd" height="1" width="24" />
          <g>
            <rect fill-rule="evenodd" height="1" width="24" x="4" y="11" />
          </g>
        </g>
      </svg>
    </div>
  );
});
