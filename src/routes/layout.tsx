import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import MainOverlay from "~/components/MainOverlay";
import ReadingBar from "~/components/ReadingBar";
import SideMenu from "~/components/SideMenu";
import Header from "../components/header";

interface ThemeStore {
  sideMenuOpen: boolean;
}

export const ThemeContext = createContextId<ThemeStore>("theme-context");

export default component$(() => {
  const themeStore = useStore<ThemeStore>({ sideMenuOpen: false });
  useContextProvider(ThemeContext, themeStore);
  return (
    <>
      <main>
        <ReadingBar />
        <MainOverlay />
        <SideMenu />
        <Header />
        {/* <section> */}
        <Slot />
        {/* </section> */}
      </main>
      <footer>
        <p>Copyright travel2.ml © 2022</p>
      </footer>
    </>
  );
});
