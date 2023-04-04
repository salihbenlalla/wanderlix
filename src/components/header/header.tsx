import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Travel2Logo } from "../icons/travel2_logo";
import SearchIcon from "~/assets/icomoon_svg/search.svg?component";
import styles from "./header.css?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <header class="main-header">
      <div class="container">
        <nav class="navbar">
          <div class="logo">
            <a href="https://travel2.ml/" target="_blank">
              <Travel2Logo /> <div>Travel2</div>
            </a>
          </div>
          <ul>
            <li>
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Traveler Tools
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Destinations
              </a>
            </li>
            <li>
              <a class="nav-link active" href="#">
                Login
              </a>
            </li>
          </ul>
          <div class="header-buttons">
            <button>
              <SearchIcon width="16" height="16" viewBox="0 0 20 20" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
});
