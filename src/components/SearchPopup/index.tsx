import {
  component$,
  useContext,
  useSignal,
  useStyles$,
} from "@builder.io/qwik";
import { ThemeContext } from "~/routes/layout";
import SearchIcon from "~/assets/icomoon_svg/search.svg?component";
import CloseButton from "~/assets/icomoon_svg/close.svg?component";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);
  const inputValue = useSignal("");

  return (
    <div
      class={`search-popup${theme.searchPopupOpen === true ? " active" : ""}`}
    >
      <button
        type="button"
        class="btn-close "
        aria-label="Close"
        onClick$={() => (theme.searchPopupOpen = false)}
      >
        <CloseButton width="18" height="18" viewBox="0 0 20 20" />
      </button>
      <div class="search-content">
        <h3>Press ESC to close</h3>
        <form method="GET" action="/search">
          <input
            type="text"
            name="q"
            id="search"
            placeholder="What do you want to search for ?"
            value={inputValue.value}
          />
          <button type="submit">
            <SearchIcon width="16" height="16" viewBox="0 0 20 20" />
          </button>
        </form>
      </div>
    </div>
  );
});
