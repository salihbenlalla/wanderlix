import { component$, useContext, useStyles$, $ } from "@builder.io/qwik";
import styles from "./style.css?inline";
import { Link } from "@salihbenlalla/qwik-city";
import { ThemeContext } from "~/routes/layout";
import { getSiteName } from "~/lib/helpers/getSiteName";

export const Logo = component$(() => {
  useStyles$(styles);
  const siteName = getSiteName() || "Logo";
  const mainText = siteName.slice(0, -1);
  const lastLetter = siteName.slice(-1);

  const theme = useContext(ThemeContext);

  const toggleMenu = $(() => (theme.sideMenuOpen = false));

  return (
    <div class="logo">
      <Link href="/" onClick$={toggleMenu}>
        <span >{mainText}</span>
        <span class="logo-two" >{lastLetter}</span>
      </Link>
    </div>
  );
});
