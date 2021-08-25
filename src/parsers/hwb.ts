import { TInput, Irgba, TFormat, Ihwba } from "../types";
import { adjustAlpha, adjustHue, clamp } from "../utils/numeric";
import { isHWBObject } from "../utils/typeGuards";
import { HWBtoRGB } from "../conversions/hwb";

/**
 * hwb( <number | percentage | angle> <number | percentage> <number | percentage> [ / <alpha-value> ]? )
 * @see https://www.w3.org/TR/css-color-4/#the-hwb-notation
 */
const HWBA_RE = /hwba?\s*\(\s*([+-]?\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ h, w, b, a }: Ihwba): [Irgba, TFormat] {
  return [HWBtoRGB({ h: adjustHue(h), w: clamp(0, w, 100), b: clamp(0, b, 100), a: adjustAlpha(a) }), "hwb"];
}

export function hwbaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isHWBObject(color)) {
    return createReturnArr(color as Ihwba);
  } else if (typeof color === "string") {
    HWBA_RE.lastIndex = 0;

    const matches = HWBA_RE.exec(color);
    if (matches) {
      const [h, w, b, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i === 0 ? 3.59 : i < 3 ? 1 : 0.01) : +elem));
      return createReturnArr({ h, w, b, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
