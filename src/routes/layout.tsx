import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { type ImageTransformerProps, useImageProvider } from "qwik-image";
import MainOverlay from "~/components/MainOverlay";
import ReadingBar from "~/components/ReadingBar";
import SearchPopup from "~/components/SearchPopup";
import SideMenu from "~/components/SideMenu";
import Header from "../components/header";
import { type RequestHandler } from "@builder.io/qwik-city";

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

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      // Here you can set your favourite image loaders service
      return `/images/${src}-${width}x${height}.webp`;
      //   return `https://res.cloudinary.com/dlzx1x20u/image/upload/w_${width},h_${height},c_lfill,f_auto/v1684082099/travel2/${src}.webp`;
    }
  );

  useImageProvider({
    // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
    resolutions: [1280, 960, 640, 320, 160],
    imageTransformer$,
  });

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

export const onGet: RequestHandler = (request) => {
  request.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'  'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; frame-src 'self'; child-src 'self'; form-action 'self';"
  );
};
