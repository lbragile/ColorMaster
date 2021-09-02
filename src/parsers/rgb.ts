import { TInput, Irgba, TFormat } from "../types";
import { adjustAlpha, clamp } from "../utils/numeric";
import { isRGBObject } from "../utils/typeGuards";

/**
 * rgb[a]( <number | percentage>{3} [ / <alpha-value> ]? )
 * @see https://www.w3.org/TR/css-color-4/#rgb-functions
 */
const RGBA_RE =
  /rgba?\s*\(\s*(\d*\.?\d+%?)\s*,?\s*(\d*\.?\d+%?)\s*,?\s*(\d*\.?\d+%?)\s*,?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ r, g, b, a }: Irgba): [Irgba, TFormat] {
  return [{ r: clamp(0, r, 255), g: clamp(0, g, 255), b: clamp(0, b, 255), a: adjustAlpha(a) }, "rgb"];
}

export function rgbaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isRGBObject(color)) {
    return createReturnArr(color as Irgba);
  } else if (typeof color === "string") {
    RGBA_RE.lastIndex = 0;

    const matches = RGBA_RE.exec(color);
    if (matches) {
      const [r, g, b, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 3 ? 2.55 : 0.01) : +elem));
      return createReturnArr({ r, g, b, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
