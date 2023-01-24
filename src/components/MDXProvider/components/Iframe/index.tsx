import path from "path";
import fs from "fs";
import { component$ } from "@builder.io/qwik";
import yaml from "js-yaml";

type ElementProps = {
  [key: string]: any;
};

interface IframeObj {
  id: number;
  originalSrc: string;
  newSrc: string;
  use: string;
}

function loadYaml<T>(ymlFile: string): T[] {
  const yml = yaml.load(
    fs.readFileSync(path.join(process.cwd(), "/src/data", ymlFile), "utf-8")
  );
  return yml as T[];
}

export const iframeSrcs: IframeObj[] = loadYaml<IframeObj>("iframeSrcs.yml");

const Iframe = component$((props: ElementProps) => {
  if (props.src.startsWith("https://travel2.ml")) {
    return <iframe {...props} />;
  }
  const foundSrc = iframeSrcs.find(
    (o) => o.id === Number(props.src.replace("src_id:", ""))
  );

  //originalHref
  if (foundSrc && foundSrc.use === "originalHref") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { src, ...rest } = props;
    return <iframe src={foundSrc.originalSrc} {...rest} />;
  }
  if (foundSrc && foundSrc.use === "newHref") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { src, ...rest } = props;
    return <iframe src={foundSrc.newSrc} {...rest} />;
  }
  const { src, ...rest } = props; // eslint-disable-line @typescript-eslint/no-unused-vars
  return <iframe {...rest} />;
})

export default Iframe