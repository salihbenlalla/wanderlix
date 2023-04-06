import { component$, useContext, useStyles$ } from "@builder.io/qwik";
import CloseButton from "~/assets/icomoon_svg/close.svg?component";
import { ThemeContext } from "~/routes/layout";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);
  return (
    <div
      class="side-menu"
      style={{
        transform: `translate3d(${theme.sideMenuOpen ? 0 : 100}%, 0, 0)`,
      }}
    >
      <button
        type="button"
        class="btn-close "
        aria-label="Close"
        onClick$={() => (theme.sideMenuOpen = false)}
      >
        <CloseButton width="18" height="18" viewBox="0 0 20 20" />
      </button>
      <div class="side-menu-logo">
        <a>
          Travel<span class="logo-two">2</span>
        </a>
      </div>
      <nav>
        <ul>
          <li>Home</li>
          <li>Lifestyle</li>
          <li>Culture</li>
          <li>Features</li>
          <li>Shop</li>
        </ul>
      </nav>
    </div>
  );
});
