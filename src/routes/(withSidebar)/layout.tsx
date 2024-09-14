import { component$, Slot, useStyles$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type RequestEventLoader,
  type Loader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import styles from "./style.css?inline";
import SideBar, { type SideBarProps } from "~/components/SideBar";
import { getSidebarData } from "./getSidebarData";

export const useSidebarData: Loader<
  Omit<SideBarProps, "newsletterFormLoader">
> = routeLoader$(async (ev: RequestEventLoader<PlatformCloudflarePages>) => {
  return await getSidebarData(ev);
});

export default component$(() => {
  useStyles$(styles);

  const sidebarData = useSidebarData().value;
  return (
    <>
      <div class="main-content">
        <Slot />
        <div class="sidebar-container">
          <SideBar {...sidebarData} />
        </div>
      </div>
    </>
  );
});

// export const onGet: RequestHandler = (request) => {
//   request.headers.set("Cache-Control", "no-cache");
// };
