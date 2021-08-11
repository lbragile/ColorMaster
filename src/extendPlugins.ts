import { ColorMaster } from "./colormaster";
import { TPlugin } from "./types/colormaster";

export function extendPlugins(plugins: TPlugin[]): void {
  // filter unique plugins
  plugins = plugins.filter((x, i, arr) => arr.indexOf(x) === i);
  plugins.forEach((plugin) => plugin(ColorMaster));
}
