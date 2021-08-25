import { XYZtoRGB } from "../conversions/xyz";
import { D50Ref } from "../enums/cie";
import { TInput, TFormat, Ixyza, Irgba } from "../types";
import { adjustAlpha, clamp } from "../utils/numeric";
import { isXYZObject } from "../utils/typeGuards";

/**
 * color(xyz[a] <number | percentage>{3} [ / <alpha-value> ]? )
 * @note Percentages are not allowed (for non alpha channels)
 * @see https://en.wikipedia.org/wiki/CIE_1931_color_space
 * @see https://www.w3.org/TR/css-color-4/#predefined
 */
const XYZA_RE = /color\s*\(\s*xyza?\s*(\d*\.?\d+),?\s*(\d*\.?\d+),?\s*(\d*\.?\d+),?\s*\/?\s*?(\d*\.?\d+%?)?\s*\)/gi;

function createReturnArr({ x, y, z, a }: Ixyza): [Irgba, TFormat] {
  return [
    XYZtoRGB({
      x: clamp(0, x, D50Ref.x * 100),
      y: clamp(0, y, D50Ref.y * 100),
      z: clamp(0, z, D50Ref.z * 100),
      a: adjustAlpha(a)
    }),
    "xyz"
  ];
}

export function xyzaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isXYZObject(color)) {
    return createReturnArr(color as Ixyza);
  } else if (typeof color === "string") {
    XYZA_RE.lastIndex = 0;

    const matches = XYZA_RE.exec(color);
    if (matches) {
      const [x, y, z, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem) => (elem.includes("%") ? +elem.slice(0, -1) * 0.01 : +elem));
      return createReturnArr({ x, y, z, a });
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}
