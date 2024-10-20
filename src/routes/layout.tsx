import {
  $,
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { type ImageTransformerProps, useImageProvider } from "qwik-image";
import MainOverlay from "../components/MainOverlay";
import ReadingBar from "../components/ReadingBar";
import SearchPopup from "../components/SearchPopup";
import SideMenu from "../components/navigation/SideMenu";
import Header from "../components/navigation/header";
import { Toast } from "../components/Toast";
import { type FormStore } from "@modular-forms/qwik";
import { type CommentFormInput } from "~/components/PostCommentSection/CommentForm";
import { useLocation } from "@salihbenlalla/qwik-city";
import { getDomainName } from "~/lib/helpers/getDomainName";

interface Toast {
  type: "success" | "error";
  isVisible: boolean;
  message: string;
}

interface EditModalProps {
  commentId: number | null;
  commentText: string;
  authorName: string;
  email: string;
  website: string;
}

interface DeleteModalProps {
  commentId: number | null;
}

interface ThemeStore {
  sideMenuOpen: boolean;
  searchPopupOpen: boolean;
  editModalOpen: boolean;
  editModalProps: EditModalProps;
  deleteModalOpen: boolean;
  deleteModalType: "comment" | "userInfo";
  deleteModalProps: DeleteModalProps;
  toast: Toast;
  commentsCount: number;
  userInfoRemembered: boolean;
  commentForm: FormStore<CommentFormInput, undefined> | undefined;
}

export const ThemeContext = createContextId<ThemeStore>("theme-context");

export default component$(() => {
  const themeStore = useStore<ThemeStore>({
    sideMenuOpen: false,
    searchPopupOpen: false,
    editModalOpen: false,
    editModalProps: {
      commentId: null,
      commentText: "",
      authorName: "",
      email: "",
      website: "",
    },
    deleteModalOpen: false,
    deleteModalType: "comment",
    deleteModalProps: {
      commentId: null,
    },
    toast: {
      type: "success",
      isVisible: false,
      message: "",
    },
    commentsCount: 0,
    userInfoRemembered: false,
    commentForm: undefined,
  });
  useContextProvider(ThemeContext, themeStore);

  const imageTransformer$ = $(
    ({ src, width, height }: ImageTransformerProps): string => {
      const newSrc = src.split("/")[4];

      // Here you can set your favourite image loaders service
      return `/images/${width}/${height}/${newSrc}`;
    }
  );

  useImageProvider({
    // You can set this prop to overwrite default values [3840, 1920, 1280, 960, 640]
    resolutions: [1280, 960, 640, 320, 160],
    imageTransformer$,
  });

  const loc = useLocation();
  const isHomePage = loc.url.pathname === "/";

  return (
    <div style={{ width: "100%" }}>
      <ReadingBar />
      <SearchPopup />
      <MainOverlay />
      <Toast />
      <SideMenu />
      <Header />
      <main>
        <Slot />
      </main>

      {
        !isHomePage && <footer class="site-footer">
          <p>Copyright {getDomainName()} © 2022</p>
        </footer>
      }
    </div>
  );
});

// export const onGet: RequestHandler = (request) => {
//   request.headers.set(
//     "Content-Security-Policy",
//     "default-src 'self'; script-src 'self' 'unsafe-inline' 'sha256-g2wSyi3TrUzxFZ5KKm9Ls/e37jmA4yH9o9YUs+UhQGY=' 'sha256-Ce2y3UxMxDQ2YwcA9RP+kV6CR9Zk/zxDES+WO5tn2UY=' 'sha256-6SEQUPC2k3K33z7byFDZZc7XSx0BQse8a6eRbu+yl4Q=' 'sha256-xAsnfAjBo+mB8c67j0jB7DVC2AN7A7wNVJq1TCfGI5c=' 'sha256-vi61YlUtCWKrrJSLDkNFNZCP/OHuROPnQXbhZrMqEDE=' 'sha256-LQ/b4wVdtWOgTe3uoea7Lr4hIJKEyP8UpO0LHRZ+z2w=' ; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; frame-src 'self'; child-src 'self'; form-action 'self';"
//   );
// };
