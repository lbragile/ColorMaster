import { TInput, Irgba, TFormat, Iuvwa } from "../types";
import { clamp } from "../utils/numeric";
import { isUVWObject } from "../utils/typeGuards";
import { UVWtoRGB } from "../conversions/uvw";
import { D50Ref } from "../enums/cie";

/**
 * @see {@link http://cs.haifa.ac.il/hagit/courses/ist/Lectures/IST05_ColorLABx4.pdf}
 */
const UVWA_RE = /uvwa?\s*\(\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*(\d*\.?\d+%?),?\s*\/?\s*?(\d*\.?\d+)?\s*\)/gi;

// Values are clamped based on matrix M (theoretical max in each case)
// Last is intentionally the y reference
const UPPER_BOUNDS = [(D50Ref.x * 200) / 3, D50Ref.y * 100, D50Ref.y * 150];

function createReturnArr({ u, v, w, a }: Iuvwa): [Irgba, TFormat] {
  return [
    UVWtoRGB({
      u: clamp(0, u, UPPER_BOUNDS[0]),
      v: clamp(0, v, UPPER_BOUNDS[1]),
      w: clamp(0, w, UPPER_BOUNDS[2]),
      a: a ? clamp(0, a, 1) : 1
    }),
    "xyz"
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
        .map((elem, i) => (elem.includes("%") ? +elem.slice(0, -1) * (i < 3 ? UPPER_BOUNDS[i] : 0.01) : +elem));
      return createReturnArr({ u, v, w, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
