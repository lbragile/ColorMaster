import { TInput, Irgba, TFormat } from "../types/colormaster";
import { clamp } from "../utils/numeric";
import { isRGBObject } from "../utils/typeGuards";

const RGBA_RE = /rgba?\s*\(\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

export function rgbaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isRGBObject(color)) {
    return [color as Irgba, "rgb"];
  } else if (typeof color === "string") {
    RGBA_RE.lastIndex = 0;

    const matches = RGBA_RE.exec(color);
    if (matches) {
      const [r, g, b, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 3 ? 2.55 : 0.01) : +elem));
      return [{ r: clamp(0, r, 255), g: clamp(0, g, 255), b: clamp(0, b, 255), a: a ? clamp(0, a, 1) : 1 }, "rgb"];
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
