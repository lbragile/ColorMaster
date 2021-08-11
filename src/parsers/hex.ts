import { Irgba, Ihexa, THexStr } from "../types/common";

const HEXA_RE = /^#?(([\da-f])([\da-f])([\da-f])([\da-f])?)$|^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})?([\da-f]{2})?$/gi;

export function hexaParser(color: string): Irgba {
  const matches = HEXA_RE.exec(color);
  if (matches) {
    const [r, g, b, a] = matches
      .filter((val) => val !== undefined)
      .slice(1)
      .map((elem) => (elem.length === 1 ? elem.repeat(2) : elem) as THexStr);
    return HEXtoRGB({ r, g, b, a: a ?? "FF" });
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}

export function HEXtoRGB(obj: Ihexa): Irgba {
  const [r, g, b, a] = Object.values(obj).map((part) => parseInt(part, 16));
  return { r, g, b, a: a / 255 ?? 1 } as Irgba;
}
