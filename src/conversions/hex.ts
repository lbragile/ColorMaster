import { Ihexa, Irgba } from "../types/colormaster";

export function HEXtoRGB(obj: Ihexa): Irgba {
  const [r, g, b, a] = Object.values(obj).map((part) => parseInt(part, 16));
  return { r, g, b, a: a ? a / 255 : 1 };
}
