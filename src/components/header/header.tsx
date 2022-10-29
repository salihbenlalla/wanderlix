import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Travel2Logo } from "../icons/travel2_logo";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header>
      <div class="header container">
        <div class="logo">
          <a href="https://travel2.ml/" target="_blank">
            <Travel2Logo /> <div>Travel2</div>
          </a>
        </div>
        <ul>
          <li>
            <a href="#">Traveler Tools</a>
          </li>
          <li>
            <a href="#">Destinations</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
        </ul>
      </div>
    </header>
  );
});
