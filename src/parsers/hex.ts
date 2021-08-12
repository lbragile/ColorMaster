import { TInput, Irgba, TFormat, Ihexa, THexStr } from "../types/colormaster";
import { isHEXObject } from "../utils/typeGuards";

const HEXA_RE = /^#?([\da-f])([\da-f])([\da-f])([\da-f])?$|^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})?([\da-f]{2})?$/gi;

export function hexaParser(color: TInput): [Irgba, TFormat] {
  if (color.constructor.name.toLowerCase() === "object" && isHEXObject(color)) {
    return [HEXtoRGB(color as Ihexa), "hex"];
  } else if (typeof color === "string") {
    HEXA_RE.lastIndex = 0;

    const matches = HEXA_RE.exec(color);
    if (matches) {
      const [r, g, b, a] = matches
        .filter((val) => val !== undefined)
        .slice(1)
        .map((elem) => (elem.length === 1 ? elem.repeat(2) : elem) as THexStr);
      return [HEXtoRGB({ r, g, b, a: a ?? "FF" }), "hex"];
    }
  }

  return [{ r: 0, g: 0, b: 0, a: 1 }, "invalid"];
}

export function HEXtoRGB(obj: Ihexa): Irgba {
  const [r, g, b, a] = Object.values(obj).map((part) => parseInt(part, 16));
  return { r, g, b, a: a / 255 ?? 1 } as Irgba;
}
