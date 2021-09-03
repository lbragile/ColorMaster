import { TInput, Irgba, TFormat, Iuvwa } from "../types";
import { adjustAlpha, clamp } from "../utils/numeric";
import { isUVWObject } from "../utils/typeGuards";
import { UVWtoRGB } from "../conversions/uvw";
import { D50Ref } from "../enums/cie";

/**
 * color(uvw[a] <number>{3} [ / <alpha-value> ]? )
 * @note Percentages are not allowed (for non alpha channels)
 * @see http://cs.haifa.ac.il/hagit/courses/ist/Lectures/IST05_ColorLABx4.pdf
 */
const UVWA_RE =
  /color\s*\(\s*uvwa?\s*(\d*\.?\d+)\s*,?\s*([+-]?\d*\.?\d+)\s*,?\s*([+-]?\d*\.?\d+)\s*,?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ u, v, w, a }: Iuvwa): [Irgba, TFormat] {
  // Values are clamped based on matrix M (theoretical min/max in each case)
  return [
    UVWtoRGB({
      u: clamp(0, u, (200 / 3) * D50Ref.x),
      v: clamp(0, v, 100 * D50Ref.y),
      w: clamp(-50 * D50Ref.x, w, 150 * D50Ref.y + 50 * D50Ref.z),
      a: adjustAlpha(a)
    }),
    "uvw"
  ];
}

export function uvwaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isUVWObject(color)) {
    return createReturnArr(color as Iuvwa);
  } else if (typeof color === "string") {
    UVWA_RE.lastIndex = 0;

    const matches = UVWA_RE.exec(color);
    if (matches) {
      const [u, v, w, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem) => (elem.includes("%") ? +elem.slice(0, -1) * 0.01 : +elem));
      return createReturnArr({ u, v, w, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
