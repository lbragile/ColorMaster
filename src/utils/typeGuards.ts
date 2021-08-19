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
  Ilaba,
  Ilab,
  Ilch,
  Ilcha,
  Ihwb,
  Ihwba,
  Icmyk,
  Icmyka
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
  return type.h !== undefined && type.s !== undefined && type.l !== undefined;
}

export function isHSVObject(type: TInput): type is Ihsv | Ihsva {
  type = type as Ihsv;
  return type.h !== undefined && type.s !== undefined && type.v !== undefined;
}

export function isHWBObject(type: TInput): type is Ihwb | Ihwba {
  type = type as Ihwb;
  return type.h !== undefined && type.w !== undefined && type.b !== undefined;
}

export function isLABObject(type: TInput): type is Ilab | Ilaba {
  type = type as Ilab;
  return type.l !== undefined && type.a !== undefined && type.b !== undefined;
}

export function isLCHObject(type: TInput): type is Ilch | Ilcha {
  type = type as Ilch;
  return type.l !== undefined && type.c !== undefined && type.h !== undefined;
}

export function isCMYKObject(type: TInput): type is Icmyk | Icmyka {
  type = type as Icmyk;
  return type.c !== undefined && type.m !== undefined && type.y !== undefined && type.k !== undefined;
}
