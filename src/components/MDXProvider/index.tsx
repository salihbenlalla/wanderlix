import { createContext } from "@builder.io/qwik";
import { MDXComponents } from "mdx/types";
import { contextComponents } from "./contextComponents";

type MergeComponents = (components: MDXComponents) => MDXComponents;

export const MDXContext = createContext<MDXComponents>("mdx-context");

export const useMDXComponents = (
  components: MDXComponents | MergeComponents | undefined
): MDXComponents => {
  if (typeof components === "undefined") {
    return contextComponents;
  }

  // Custom merge via a function prop
  if (typeof components === "function") {
    return components(contextComponents);
  }

  return { ...contextComponents, ...components };
};
