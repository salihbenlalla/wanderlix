import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
} from "@builder.io/qwik";
import { type MDXComponents } from "mdx/types";
import { contextComponents } from "./contextComponents";
// import {h} from '@builder.io/qwik'

type MergeComponents = (components: MDXComponents) => MDXComponents;

export const MDXContext = createContextId<MDXComponents>("mdx-context");

export const useMDXComponents = (
  components?: MDXComponents | MergeComponents | undefined
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

interface MdxProviderProps {
  components?: MDXComponents | MergeComponents | undefined;
  disableParentContext: boolean;
}

export const MDXProvider = component$<MdxProviderProps>(
  ({ components, disableParentContext }) => {
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
  }
);

export default MDXProvider;
