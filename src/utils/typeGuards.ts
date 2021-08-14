import { TInput, TNumArr, TStrArr, Ihex, Ihexa, Ihsl, Ihsla, Irgb, Irgba } from "../types/colormaster";

export function isHEXObject(type: TInput | TNumArr | TStrArr): type is Ihex | Ihexa {
  return (type as Ihex).r !== undefined && typeof (type as Ihex).r === "string";
}

export function isHSLObject(type: TInput | TNumArr | TStrArr): type is Ihsl | Ihsla {
  type = type as Ihsl;
  return type.h !== undefined && type.l !== undefined;
}

export function isRGBObject(type: TInput | TNumArr | TStrArr): type is Irgb | Irgba {
  return (type as Irgb).r !== undefined && typeof (type as Ihex).r === "number";
}
