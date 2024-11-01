import {
  type CSSProperties,
  component$,
  useContext,
  useStyles$,
} from "@builder.io/qwik";
import SearchIcon from "~/assets/icomoon_svg/search.svg?component";
import styles from "./header.css?inline";
import { ThemeContext } from "~/routes/layout";
import { useLocation } from "@builder.io/qwik-city";
import { v4 as uuidv4 } from "uuid";
import navigationLinks from "../navigationLinksData";
import { Logo } from "~/components/Logo";

interface HeaderProps {
  hidden?: boolean;
  sticky?: boolean;
  isSmall?: boolean;
}

export default component$<HeaderProps>((props) => {
  useStyles$(styles);

  const theme = useContext(ThemeContext);

  const loc = useLocation();
  const activeRoute = loc.url.pathname.replace(
    /^\/(post|destination)\/.*/,
    "/destinations/"
  );

  const headerStyle: CSSProperties = {
    padding: props.isSmall || props.sticky ? "25px 0" : "40px 0",
    position: props.sticky ? "fixed" : "relative",
    top: 0,
    transform: props.hidden
      ? "translate3d(0, -100%, 0)"
      : "translate3d(0, 0, 0)",
    borderBottom: props.sticky ? "solid 1px #ebebeb" : "none",
  };

  return (
    <header class="main-header" style={headerStyle}>
      <div class="container">
        <nav class="navbar">
          <Logo />
          <ul>
            {navigationLinks.map((link) => (
              <li key={uuidv4()}>
                <a
                  class={`nav-link${activeRoute === link.href ? " active" : ""}`}
                  href={link.href}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
          <div class="header-buttons">
            <button
              onClick$={() => (theme.searchPopupOpen = true)}
              aria-label="Search"
            >
              <SearchIcon width="16" height="16" viewBox="0 0 20 20" />
            </button>
            <button
              onClick$={() => (theme.sideMenuOpen = true)}
              aria-label="Navigation Menu"
            >
              <span class="burger-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
});
