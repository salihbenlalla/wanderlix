import { createContextId, Slot, useContextProvider } from "@builder.io/qwik";
import type { MDXComponents } from "mdx/types";
import { contextComponents } from "./contextComponents";
// import {h} from '@builder.io/qwik'

type MergeComponents = (components: MDXComponents) => MDXComponents;

export const MDXContext = createContextId<MDXComponents>("mdx-context");

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

const emptyObject = {};

export const MDXProvider: (props: any) => any = ({
  components,
  disableParentContext,
}) => {
  let allComponents = useMDXComponents(components);

  if (disableParentContext) {
    allComponents = components || emptyObject;
  }

  useContextProvider(MDXContext, allComponents);
  return (
    <>
      <Slot />
    </>
  );
};
