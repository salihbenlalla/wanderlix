import {
  noSerialize,
  NoSerialize,
  useMount$,
  useStore,
} from "@builder.io/qwik";

import type {
  FunctionComponent,
  QwikIntrinsicElements,
} from "@builder.io/qwik";

export const importSVG = (iconPath: string) => {
  const modules = import.meta.glob("../../assets/icomoon_svg/*.svg", {
    import: "default",
  });

  const myIcon = iconPath.replace("icon-", "").replace("idea", "light-bulb");

  const component = modules[
    `../../assets/icomoon_svg/${myIcon}.svg`
  ]() as Promise<FunctionComponent<QwikIntrinsicElements["svg"]>>;
  return component;
};

export const useImportSVG = (icon?: string) => {
  if (!icon) return;
  const state = useStore<{
    SVGIcon: NoSerialize<FunctionComponent<QwikIntrinsicElements["svg"]>>;
  }>({
    SVGIcon: undefined,
  });

  useMount$(async () => {
    console.log("from useMount");
    try {
      const importedSVG = await importSVG(icon);
      state.SVGIcon = noSerialize(importedSVG);
    } catch (error) {
      console.log("useImportSVG error: ", error);
      state.SVGIcon = noSerialize(() => <span>hi</span>);
    }
  });
  const SVGIcon = state.SVGIcon;
  return SVGIcon;
};
