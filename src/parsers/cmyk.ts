import { TInput, Irgba, TFormat, Icmyka } from "../types";
import { clamp } from "../utils/numeric";
import { isCMYKObject } from "../utils/typeGuards";
import { CMYKtoRGB } from "../conversions/cmyk";

/**
 * device-cmyk( <number | percentage>{4} [ / <alpha-value> ]? )
 * @see {@link https://www.w3.org/TR/css-color-4/#device-cmyk}
 */
const CMYKA_RE =
  /cmyka?\s*\(\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ c, m, y, k, a }: Icmyka): [Irgba, TFormat] {
  return [
    CMYKtoRGB({
      c: clamp(0, c, 100),
      m: clamp(0, m, 100),
      y: clamp(0, y, 100),
      k: clamp(0, k, 100),
      a: a ? clamp(0, a, 1) : 1
    }),
    "cmyk"
  ];
}

export function cmykaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isCMYKObject(color)) {
    return createReturnArr(color as Icmyka);
  } else if (typeof color === "string") {
    CMYKA_RE.lastIndex = 0;

    const matches = CMYKA_RE.exec(color);
    if (matches) {
      const [c, m, y, k, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 4 ? 1 : 0.01) : +elem));
      return createReturnArr({ c, m, y, k, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
