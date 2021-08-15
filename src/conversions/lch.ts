import { Ilcha, Irgba } from "../types";
import { LABtoRGB } from "./lab";

export function LCHtoRGB(obj: Ilcha): Irgba {
  const { l, c, h } = obj;

  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);

  return LABtoRGB({ l, a, b, alpha: obj.a });
}
