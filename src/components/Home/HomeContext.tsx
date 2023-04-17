import { createContextId, type Signal } from "@builder.io/qwik";

export const homeContext = createContextId<Signal<number>>("home-context");
