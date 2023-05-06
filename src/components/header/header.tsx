import { component$, useContext, useStyles$ } from "@builder.io/qwik";
// import { Travel2Logo } from "../icons/travel2_logo";
import SearchIcon from "~/assets/icomoon_svg/search.svg?component";
import styles from "./header.css?inline";
import { ThemeContext } from "~/routes/layout";

interface HeaderProps {
  hidden?: boolean;
  sticky?: boolean;
  isSmall?: boolean;
}

export default component$<HeaderProps>((props) => {
  useStyles$(styles);

  const theme = useContext(ThemeContext);

  const headerStyle = {
    padding: props.isSmall || props.sticky ? "25px 0" : "40px 0",
    position: props.sticky ? "fixed" : "relative",
    top: 0,
    transform: props.hidden
      ? "translate3d(0, -100%, 0)"
      : "translate3d(0, 0, 0)",
  };

  return (
    <header class="main-header" style={headerStyle}>
      <div class="container">
        <nav class="navbar">
          <div class="logo">
            <a href="https://travel2.ml/" target="_blank">
              {/* <Travel2Logo />{" "} */}
              <div>
                Travel<span class="logo-two">2</span>
              </div>
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
              <a class="nav-link active" href="#">
                Destinations
              </a>
            </li>
            <li>
              <a class="nav-link" href="#">
                Login
              </a>
            </li>
          </ul>
          <div class="header-buttons">
            <button onClick$={() => (theme.searchPopupOpen = true)}>
              <SearchIcon width="16" height="16" viewBox="0 0 20 20" />
            </button>
            <button onClick$={() => (theme.sideMenuOpen = true)}>
              <span class="burger-icon"></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
});
