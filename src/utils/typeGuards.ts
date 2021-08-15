import {
  TInput,
  Ihex,
  Ihexa,
  Ihsl,
  Ihsla,
  Ihsv,
  Ihsva,
  Irgb,
  Irgba,
  Ixyz,
  Ixyza,
  Ilaba,
  Ilab,
  Ilch,
  Ilcha
} from "../types";

export function isRGBObject(type: TInput): type is Irgb | Irgba {
  type = type as Irgb;
  return type.r !== undefined && typeof type.r === "number";
}

export function isHEXObject(type: TInput): type is Ihex | Ihexa {
  type = type as Ihex;
  return type.r !== undefined && typeof type.r === "string";
}

export function isHSLObject(type: TInput): type is Ihsl | Ihsla {
  type = type as Ihsl;
  return type.h !== undefined && type.l !== undefined;
}

// TODO
/* istanbul ignore next */
export function isHSVObject(type: TInput): type is Ihsv | Ihsva {
  type = type as Ihsv;
  return type.h !== undefined && type.v !== undefined;
}

// TODO
/* istanbul ignore next */
export function isXYZObject(type: TInput): type is Ixyz | Ixyza {
  type = type as Ixyz;
  return type.x !== undefined;
}

// TODO
/* istanbul ignore next */
export function isLABObject(type: TInput): type is Ilab | Ilaba {
  type = type as Ilab;
  return type.l !== undefined && type.b !== undefined;
}

// TODO
/* istanbul ignore next */
export function isLCHObject(type: TInput): type is Ilch | Ilcha {
  type = type as Ilch;
  return type.c !== undefined && type.h !== undefined;
}
