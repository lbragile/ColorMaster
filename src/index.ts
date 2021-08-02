import { ColorMaster } from "./colormaster";

const CM = new ColorMaster();
export default CM;

export {
  TNumArr,
  TStrArr,
  TOperator,
  IStringOpts,
  IA11yOpts,
  IReadable,
  IAlphaInvert,
  TChannel,
  TChannelHSL,
  TRGBAInput,
  THSLAInput,
  THEXAInput,
  TAllInput,
  TAllColors
} from "./types/common";

export { Irgb, Irgba } from "./types/rgb";
export { Ihex, Ihexa } from "./types/hex";
export { Ihsl, Ihsla } from "./types/hsl";
