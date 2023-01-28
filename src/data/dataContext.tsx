import { createContext } from "@builder.io/qwik";
// import type { ResourceReturn } from "@builder.io/qwik";

export interface LinkObj {
  id: number;
  originalHref: string;
  newHref: string;
  use: "none" | "originalHref" | "newHref";
}

export interface SrcObj {
  id: number;
  originalSrc: string;
  newSrc: string;
  use: "none" | "originalSrc" | "newSrc";
}

export interface DataContext {
  links: LinkObj[];
  srcs: SrcObj[];
}

export const dataContext = createContext<DataContext>("data-context");
