import CM, { extendPlugins } from "../../src/index";
import MixPlugin from "../../src/plugins/mix";

extendPlugins([MixPlugin]);

test("opposite", () => expect(CM("#FFFF").mix("#000F").stringHEX()).toBe("#777777FF"));
test("opposite with different opacity", () => expect(CM("#FFFA").mix("#000B").stringHEX()).toBe("#777777B3"));
test("opposite with instance", () => expect(CM("#FFFA").mix(CM("#000B")).stringHEX()).toBe("#777777B3"));
test("red & yellow → orange", () => expect(CM("#F00").mix("#FF0").stringHEX()).toBe("#FFA000FF")); // #FFA500FF (perfect)
test("yellow & blue → green", () => expect(CM("#FF0").mix("#00F").stringHEX()).toBe("#00C2DEFF")); // #008000FF (perfect)
test("blue & red → magenta", () => expect(CM("#00F").mix("#F00").stringHEX()).toBe("#008240FF")); // #FF00FFFF (perfect)
test("green & magenta → blue", () => expect(CM("#008000FF").mix("#F0F").stringHEX()).toBe("#009AF8FF")); // #0000FFFF (perfect)
test("magenta & orange → red", () => expect(CM("#F0F").mix("#FFA500").stringHEX()).toBe("#00CBDCFF")); // #FF0000FF (perfect)
test("orange & green → yellow", () => expect(CM("#FFA500").mix("#008000FF").stringHEX()).toBe("#8F9A00FF")); // #FFFF00FF (perfect)
test("ratio < 0", () => expect(CM("#F00").mix("#ABC", -1).stringHEX()).toBe("#FF0000FF"));
test("ratio = 0", () => expect(CM("#ABC").mix("#F00F", 1).stringHEX()).toBe("#FF0000FF"));
test("ratio = 1", () => expect(CM("#F00").mix("#ABC", 0).stringHEX()).toBe("#FF0000FF"));
test("ratio > 1", () => expect(CM("#ABC").mix("#F00F", 2).stringHEX()).toBe("#FF0000FF"));
