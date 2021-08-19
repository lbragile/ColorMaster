import { TInput, Irgba, TFormat, Ilaba } from "../types";
import { clamp } from "../utils/numeric";
import { isLABObject } from "../utils/typeGuards";
import { LABtoRGB } from "../conversions/lab";

/**
 * lab[a]( <number | percentage> <number> <number> [ / <alpha-value> ]? )
 * @see {@link https://www.w3.org/TR/css-color-4/#specifying-lab-lch}
 * @note a, b values are signed (allow both positive and negative values) and theoretically
 *       unbounded (but in practice do not exceed ±160). Thus, cannot use percentage
 */
const LABA_RE = /laba?\s*\(\s*(\d*\.?\d+%?),?\s*([+-]?\d*\.?\d+),?\s*([+-]?\d*\.?\d+),?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ l, a, b, alpha }: Ilaba): [Irgba, TFormat] {
  return [
    LABtoRGB({
      l: clamp(0, l, 100),
      a: clamp(-160, a, 160),
      b: clamp(-160, b, 160),
      alpha: alpha ? clamp(0, alpha, 1) : 1
    }),
    "lab"
  ];
}

export function labaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isLABObject(color)) {
    return createReturnArr(color as Ilaba);
  } else if (typeof color === "string") {
    LABA_RE.lastIndex = 0;

    const matches = LABA_RE.exec(color);
    if (matches) {
      const [l, a, b, alpha] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 3 ? 1 : 0.01) : +elem));
      return createReturnArr({ l, a, b, alpha });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
