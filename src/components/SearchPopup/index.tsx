import { component$, useContext, useStyles$ } from "@builder.io/qwik";
import { ThemeContext } from "~/routes/layout";
import SearchIcon from "~/assets/icomoon_svg/search.svg?component";
import CloseButton from "~/assets/icomoon_svg/close.svg?component";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);
  const theme = useContext(ThemeContext);

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
        <h3 class="mb-4 mt-0">Press ESC to close</h3>
        <form method="get" action="#">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="What do you want to search for ?"
          />
          <button>
            <SearchIcon width="16" height="16" viewBox="0 0 20 20" />
          </button>
        </form>
      </div>
    </div>
  );
});
