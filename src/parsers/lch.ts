import { TInput, Irgba, TFormat, Ilcha } from "../types";
import { adjustAlpha, adjustHue, clamp } from "../utils/numeric";
import { isLCHObject } from "../utils/typeGuards";
import { LCHtoRGB } from "../conversions/lch";

/**
 * lcha[a]( <number | percentage> <number | percentage> <number | percentage | angle> [ / <alpha-value> ]? )
 * @see https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 * @note Lightness is interpreted identically to the LAB lightness (maximum 100)
 *       Chroma minimum useful value is 0, while its maximum is theoretically unbounded (but in practice does not exceed 230)
 */
const LCHA_RE =
  /lcha?\s*\(\s*(\d*\.?\d+%?)\s*,?\s*(\d*\.?\d+%?)\s*,?\s*([+-]?\d*\.?\d+%?)\s*,?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ l, c, h, a }: Ilcha): [Irgba, TFormat] {
  return [
    LCHtoRGB({
      l: clamp(0, l, 100),
      c: clamp(0, c, 230),
      h: adjustHue(h),
      a: adjustAlpha(a)
    }),
    "lch"
  ];
}

export function lchaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isLCHObject(color)) {
    return createReturnArr(color as Ilcha);
  } else if (typeof color === "string") {
    LCHA_RE.lastIndex = 0;

    const matches = LCHA_RE.exec(color);
    if (matches) {
      const [l, c, h, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) =>
          elem.includes("%") ? +elem.slice(0, -1) * (i === 0 ? 1 : i === 1 ? 2.3 : i === 2 ? 3.59 : 0.01) : +elem
        );
      return createReturnArr({ l, c, h, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
