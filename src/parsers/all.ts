import { TParser } from "../types/colormaster";
import { hexaParser } from "./hex";
import { hslaParser } from "./hsl";
import { rgbaParser } from "./rgb";

const Parsers: TParser[] = [rgbaParser, hexaParser, hslaParser];

export default Parsers;
