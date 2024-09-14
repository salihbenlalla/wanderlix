const fileRegex = /\.mdx$/;

let i = 0;

export default function inspectPlugin() {
  return {
    name: "inspect-plugin",

    transform(src: string, id: string) {
      if (fileRegex.test(id)) {
        i++;
        console.log(`${i}: from inspect-plugin, id: `, id);
      }
    },
  };
}
