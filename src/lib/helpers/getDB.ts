import {
  RequestEvent,
  RequestEventBase,
  type RequestEventAction,
  type RequestEventLoader,
} from "@builder.io/qwik-city";
import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";
import { type D1Database } from "@miniflare/d1";

// declare module "@builder.io/qwik-city/middleware/cloudflare-pages" {
//   interface PlatformCloudflarePages {
//     env: {
//       DB: D1Database;
//     }
//   }
// }

interface StaticOptions { static: boolean, node: string, env: Record<string, any> | undefined, DB: D1Database }

export const getDB = async (
  context?:
    | RequestEventLoader<PlatformCloudflarePages | StaticOptions>
    | RequestEventAction<PlatformCloudflarePages | StaticOptions>
    | RequestEvent<PlatformCloudflarePages | StaticOptions>
    | RequestEventBase<PlatformCloudflarePages | StaticOptions>
    | undefined
): Promise<D1Database | void> => {
  if (context?.platform.env?.DB) {
    return context.platform.env.DB;
  }

  // if (import.meta.env?.DEV){
  //   const createGetDevDB = (await import("./createGetDevDB")).default

  //   const getDevDb = await createGetDevDB();

  //   return getDevDb();
  // }
};
