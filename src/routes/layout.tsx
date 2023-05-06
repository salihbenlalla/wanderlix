import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import MainOverlay from "~/components/MainOverlay";
import ReadingBar from "~/components/ReadingBar";
import SearchPopup from "~/components/SearchPopup";
import SideMenu from "~/components/SideMenu";
import Header from "../components/header";
// import { useLocation } from "@builder.io/qwik-city";

interface ThemeStore {
  sideMenuOpen: boolean;
  searchPopupOpen: boolean;
}

export const ThemeContext = createContextId<ThemeStore>("theme-context");

export default component$(() => {
  const themeStore = useStore<ThemeStore>({
    sideMenuOpen: false,
    searchPopupOpen: false,
  });
  useContextProvider(ThemeContext, themeStore);

  //   const location = useLocation();

  //   const mainStyles =
  //     location.url.pathname === "/"
  //       ? {
  //           height: "100vh",
  //         }
  //       : {};
  return (
    <>
      <div>
        <main>
          <ReadingBar />
          <SearchPopup />
          <MainOverlay />
          <SideMenu />
          <Header />
          {/* <section> */}
          <Slot />
          {/* </section> */}
        </main>
        <footer class="site-footer">
          <p>Copyright travel2.ml © 2022</p>
        </footer>
      </div>
    </>
  );
});
