import { component$, useContext, useStyles$ } from "@builder.io/qwik";
import CloseButton from "~/assets/icomoon_svg/close.svg?component";
import { ThemeContext } from "~/routes/layout";
import styles from "./style.css?inline";
import navigationLinks from "../navigationLinksData";
import { Link, useLocation } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";

export default component$(() => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);

  const loc = useLocation();
  const activeRoute = loc.url.pathname.replace(
    /^\/(post|destination)\/.*/,
    "/destinations/"
  );

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
        <a href="https://travel2.ml">
          Travel<span class="logo-two">2</span>
        </a>
      </div>
      <nav>
        <ul>
          {navigationLinks.map((link) => (
            <li key={uuidv4()}>
              <Link
                class={`${activeRoute === link.href ? " active" : ""}`}
                href={link.href}
              >
                {link.text}
              </Link>
            </li>
          ))}
          {/* <li>
            <a href="#">Home</a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
});
