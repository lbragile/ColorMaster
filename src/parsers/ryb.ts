import { TInput, Irgba, TFormat, Iryba } from "../types";
import { adjustAlpha, clamp } from "../utils/numeric";
import { isRYBObject } from "../utils/typeGuards";
import { RYBtoRGB } from "../conversions/ryb";

/**
 * color(ryb[a] <number | percentage>{3} [ / <alpha-value> ]? )
 * @see https://www.w3.org/TR/css-color-4/#rgb-functions
 */
const RYBA_RE =
  /color\s*\(\s*ryba?\s*(\d*\.?\d+%?)\s*,?\s*(\d*\.?\d+%?)\s*,?\s*(\d*\.?\d+%?)\s*,?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ r, y, b, a }: Iryba): [Irgba, TFormat] {
  return [RYBtoRGB({ r: clamp(0, r, 255), y: clamp(0, y, 255), b: clamp(0, b, 255), a: adjustAlpha(a) }), "ryb"];
}

export function rybaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isRYBObject(color)) {
    return createReturnArr(color as Iryba);
  } else if (typeof color === "string") {
    RYBA_RE.lastIndex = 0;

    const matches = RYBA_RE.exec(color);
    if (matches) {
      const [r, y, b, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 3 ? 2.55 : 0.01) : +elem));
      return createReturnArr({ r, y, b, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
