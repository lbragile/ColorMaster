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
  Ilcha,
  Ihwb,
  Ihwba,
  Icmyk,
  Icmyka,
  Iluv,
  Iluva,
  Iryb,
  Iryba,
  Iuvw,
  Iuvwa
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
export function isHWBObject(type: TInput): type is Ihwb | Ihwba {
  type = type as Ihwb;
  return type.h !== undefined && type.w !== undefined;
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

// TODO
/* istanbul ignore next */
export function isLUVObject(type: TInput): type is Iluv | Iluva {
  type = type as Iluv;
  return type.l !== undefined && type.u !== undefined;
}

// TODO
/* istanbul ignore next */
export function isUVWObject(type: TInput): type is Iuvw | Iuvwa {
  type = type as Iuvw;
  return type.v !== undefined && type.w !== undefined;
}

// TODO
/* istanbul ignore next */
export function isRYBObject(type: TInput): type is Iryb | Iryba {
  type = type as Iryb;
  return type.r !== undefined && type.y !== undefined;
}

// TODO
/* istanbul ignore next */
export function isCMYKObject(type: TInput): type is Icmyk | Icmyka {
  type = type as Icmyk;
  return type.c !== undefined && type.m !== undefined;
}
