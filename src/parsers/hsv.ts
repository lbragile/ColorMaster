import { TInput, Irgba, TFormat, Ihsva } from "../types";
import { adjustAlpha, adjustHue, clamp } from "../utils/numeric";
import { isHSVObject } from "../utils/typeGuards";
import { HSVtoRGB } from "../conversions/hsv";

/**
 * hsv[a]( <number | percentage | angle> <number | percentage> <number | percentage> [ / <alpha-value> ]? )
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 */
const HSVA_RE =
  /hsva?\s*\(\s*([+-]?\d*\.?\d+%?)\s*,?\s*(\d*\.?\d+%?)\s*,?\s*(\d*\.?\d+%?)\s*,?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ h, s, v, a }: Ihsva): [Irgba, TFormat] {
  return [HSVtoRGB({ h: adjustHue(h), s: clamp(0, s, 100), v: clamp(0, v, 100), a: adjustAlpha(a) }), "hsv"];
}

export function hsvaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isHSVObject(color)) {
    return createReturnArr(color as Ihsva);
  } else if (typeof color === "string") {
    HSVA_RE.lastIndex = 0;

    const matches = HSVA_RE.exec(color);
    if (matches) {
      const [h, s, v, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i === 0 ? 3.59 : i < 3 ? 1 : 0.01) : +elem));
      return createReturnArr({ h, s, v, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
