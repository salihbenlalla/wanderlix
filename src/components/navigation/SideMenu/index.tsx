import { component$, useContext, useStyles$, $ } from "@builder.io/qwik";
import CloseButton from "~/assets/icomoon_svg/close.svg?component";
import { ThemeContext } from "~/routes/layout";
import styles from "./style.css?inline";
import navigationLinks from "../navigationLinksData";
import { useLocation } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";
import { Logo } from "~/components/Logo";
import { cn } from "~/lib/helpers/cn";

export default component$(() => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);

  const loc = useLocation();
  const activeRoute = loc.url.pathname.replace(
    /^\/(post|destination)\/.*/,
    "/destinations/",
  );

  const toggleMenu = $(() => (theme.sideMenuOpen = false));

  return (
    <div
      class={cn("side-menu", {
        "translate-x-0": theme.sideMenuOpen,
        "translate-x-full": !theme.sideMenuOpen,
      })}
    >
      <button
        type="button"
        class="btn-close "
        aria-label="Close"
        onClick$={toggleMenu}
      >
        <CloseButton width="18" height="18" viewBox="0 0 20 20" />
      </button>
      <div class="side-menu-logo">
        <Logo />
      </div>
      <nav>
        <ul>
          {navigationLinks.map((link) => (
            <li key={uuidv4()}>
              <a
                class={`${activeRoute === link.href ? " active" : ""}`}
                href={link.href}
                onClick$={toggleMenu}
              >
                {link.text}
              </a>
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
