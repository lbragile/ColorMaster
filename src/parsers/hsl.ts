import { HSLtoRGB } from "../conversions/hsl";
import { TInput, Irgba, TFormat, Ihsla } from "../types/colormaster";
import { adjustHue } from "../utils/numeric";
import { isHSLObject } from "../utils/typeGuards";

const HSLA_RE =
  /hsla?\s*\(\s*([+-]?\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(0\.?\d*%?|1\.?0*%?)?\s*\)/gi;

export function hslaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isHSLObject(color)) {
    const { h, s, l, a } = color as Ihsla;
    return [HSLtoRGB({ h: adjustHue(h), s, l, a }), "hsl"];
  } else if (typeof color === "string") {
    HSLA_RE.lastIndex = 0;

    const matches = HSLA_RE.exec(color);
    if (matches) {
      const [h, s, l, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i === 0 ? 3.59 : 1) : +elem));
      return [HSLtoRGB({ h: adjustHue(h), s, l, a: a ?? 1 }), "hsl"];
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
