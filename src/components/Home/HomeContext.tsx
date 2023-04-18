import { createContextId } from "@builder.io/qwik";
import { type HomeContextStore } from ".";

export const homeContext = createContextId<HomeContextStore>("home-context");
