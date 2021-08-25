import { HSLtoRGB } from "../conversions/hsl";
import { TInput, Irgba, TFormat, Ihsla } from "../types";
import { adjustAlpha, adjustHue, clamp } from "../utils/numeric";
import { isHSLObject } from "../utils/typeGuards";

/**
 * hsl[a]( <number | percentage | angle> <number | percentage> <number | percentage> [ / <alpha-value> ]? )
 * @see https://www.w3.org/TR/css-color-4/#the-hsl-notation
 */
const HSLA_RE = /hsla?\s*\(\s*([+-]?\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ h, s, l, a }: Ihsla): [Irgba, TFormat] {
  return [HSLtoRGB({ h: adjustHue(h), s: clamp(0, s, 100), l: clamp(0, l, 100), a: adjustAlpha(a) }), "hsl"];
}

export function hslaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isHSLObject(color)) {
    return createReturnArr(color as Ihsla);
  } else if (typeof color === "string") {
    HSLA_RE.lastIndex = 0;

    const matches = HSLA_RE.exec(color);
    if (matches) {
      const [h, s, l, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i === 0 ? 3.59 : i < 3 ? 1 : 0.01) : +elem));
      return createReturnArr({ h, s, l, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
