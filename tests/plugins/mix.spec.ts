import CM, { extendPlugins } from "../../src/index";
import MixPlugin from "../../src/plugins/mix";

extendPlugins([MixPlugin]);

test("default opts", () => expect(CM("#000").mix().stringHEX()).toBe("#777777FF"));

describe("rgb", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "rgb", color: "#000F" }).stringHEX()).toBe("#808080FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "rgb", color: "#000B" }).stringHEX()).toBe("#808080B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "rgb", color: CM("#000B") })
        .stringHEX()
    ).toBe("#808080B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "rgb", color: "#FF0" }).stringHEX()).toBe("#FF8000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "rgb", color: "#00F" }).stringHEX()).toBe("#808080FF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "rgb", color: "#F00" }).stringHEX()).toBe("#800080FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "rgb", color: "#F0F" }).stringHEX()).toBe("#804080FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "rgb", color: "#FFA500" }).stringHEX()).toBe("#FF5380FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "rgb", color: "#008000FF" }).stringHEX()).toBe("#809300FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "rgb", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "rgb", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "rgb", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "rgb", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("hex", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "hex", color: "#000F" }).stringHEX()).toBe("#808080FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "hex", color: "#000B" }).stringHEX()).toBe("#808080B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "hex", color: CM("#000B") })
        .stringHEX()
    ).toBe("#808080B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "hex", color: "#FF0" }).stringHEX()).toBe("#FF8000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "hex", color: "#00F" }).stringHEX()).toBe("#808080FF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "hex", color: "#F00" }).stringHEX()).toBe("#800080FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "hex", color: "#F0F" }).stringHEX()).toBe("#804080FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "hex", color: "#FFA500" }).stringHEX()).toBe("#FF5380FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "hex", color: "#008000FF" }).stringHEX()).toBe("#809300FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hex", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hex", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hex", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hex", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("hsl", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "hsl", color: "#000F" }).stringHEX()).toBe("#808080FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "hsl", color: "#000B" }).stringHEX()).toBe("#808080B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "hsl", color: CM("#000B") })
        .stringHEX()
    ).toBe("#808080B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "hsl", color: "#FF0" }).stringHEX()).toBe("#FF8000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "hsl", color: "#00F" }).stringHEX()).toBe("#00FF80FF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "hsl", color: "#F00" }).stringHEX()).toBe("#00FF00FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "hsl", color: "#F0F" }).stringHEX()).toBe("#0060C0FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "hsl", color: "#FFA500" }).stringHEX()).toBe("#00FFD2FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "hsl", color: "#008000FF" }).stringHEX()).toBe("#82C000FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hsl", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hsl", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hsl", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hsl", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("hsv", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "hsv", color: "#000F" }).stringHEX()).toBe("#808080FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "hsv", color: "#000B" }).stringHEX()).toBe("#808080B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "hsv", color: CM("#000B") })
        .stringHEX()
    ).toBe("#808080B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "hsv", color: "#FF0" }).stringHEX()).toBe("#FF8000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "hsv", color: "#00F" }).stringHEX()).toBe("#00FF80FF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "hsv", color: "#F00" }).stringHEX()).toBe("#00FF00FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "hsv", color: "#F0F" }).stringHEX()).toBe("#0060C0FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "hsv", color: "#FFA500" }).stringHEX()).toBe("#00FFD2FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "hsv", color: "#008000FF" }).stringHEX()).toBe("#82C000FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hsv", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hsv", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hsv", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hsv", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("hwb", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "hwb", color: "#000F" }).stringHEX()).toBe("#808080FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "hwb", color: "#000B" }).stringHEX()).toBe("#808080B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "hwb", color: CM("#000B") })
        .stringHEX()
    ).toBe("#808080B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "hwb", color: "#FF0" }).stringHEX()).toBe("#FF8000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "hwb", color: "#00F" }).stringHEX()).toBe("#00FF80FF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "hwb", color: "#F00" }).stringHEX()).toBe("#00FF00FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "hwb", color: "#F0F" }).stringHEX()).toBe("#0060C0FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "hwb", color: "#FFA500" }).stringHEX()).toBe("#00FFD2FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "hwb", color: "#008000FF" }).stringHEX()).toBe("#82C000FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hwb", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "hwb", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hwb", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "hwb", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("lab", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "lab", color: "#000F" }).stringHEX()).toBe("#777777FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "lab", color: "#000B" }).stringHEX()).toBe("#777777B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "lab", color: CM("#000B") })
        .stringHEX()
    ).toBe("#777777B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "lab", color: "#FF0" }).stringHEX()).toBe("#FFA200FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "lab", color: "#00F" }).stringHEX()).toBe("#C189ACFF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "lab", color: "#F00" }).stringHEX()).toBe("#C10088FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "lab", color: "#F0F" }).stringHEX()).toBe("#A2708AFF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "lab", color: "#FFA500" }).stringHEX()).toBe("#FF7198FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "lab", color: "#008000FF" }).stringHEX()).toBe("#989700FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "lab", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "lab", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "lab", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "lab", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("lch", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "lch", color: "#000F" }).stringHEX()).toBe("#777777FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "lch", color: "#000B" }).stringHEX()).toBe("#777777B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "lch", color: CM("#000B") })
        .stringHEX()
    ).toBe("#777777B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "lch", color: "#FF0" }).stringHEX()).toBe("#FFA000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "lch", color: "#00F" }).stringHEX()).toBe("#00C2DEFF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "lch", color: "#F00" }).stringHEX()).toBe("#008240FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "lch", color: "#F0F" }).stringHEX()).toBe("#009AF8FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "lch", color: "#FFA500" }).stringHEX()).toBe("#00CBDCFF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "lch", color: "#008000FF" }).stringHEX()).toBe("#8F9A00FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "lch", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "lch", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "lch", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "lch", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("luv", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ color: "#000F" }).stringHEX()).toBe("#777777FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ color: "#000B" }).stringHEX()).toBe("#777777B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ color: CM("#000B") })
        .stringHEX()
    ).toBe("#777777B3"));
  test("red & yellow → orange", () => expect(CM("#F00").mix({ color: "#FF0" }).stringHEX()).toBe("#FF9F00FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () => expect(CM("#FF0").mix({ color: "#00F" }).stringHEX()).toBe("#9898B4FF")); // #008000FF (perfect)
  test("blue & red → magenta", () => expect(CM("#00F").mix({ color: "#F00" }).stringHEX()).toBe("#B70097FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () => expect(CM("#008000FF").mix({ color: "#F0F" }).stringHEX()).toBe("#9E709EFF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () => expect(CM("#F0F").mix({ color: "#FFA500" }).stringHEX()).toBe("#FB78B5FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ color: "#008000FF" }).stringHEX()).toBe("#A29400FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () => expect(CM("#ABC").mix({ color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () => expect(CM("#ABC").mix({ color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () => expect(CM("#ABC").mix({ color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () => expect(CM("#ABC").mix({ color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("ryb", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "ryb", color: "#000F" }).stringHEX()).toBe("#808080FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "ryb", color: "#000B" }).stringHEX()).toBe("#808080B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "ryb", color: CM("#000B") })
        .stringHEX()
    ).toBe("#808080B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "ryb", color: "#FF0" }).stringHEX()).toBe("#804000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "ryb", color: "#00F" }).stringHEX()).toBe("#008000FF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "ryb", color: "#F00" }).stringHEX()).toBe("#800080FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "ryb", color: "#F0F" }).stringHEX()).toBe("#8040C0FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "ryb", color: "#FFA500" }).stringHEX()).toBe("#C58080FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "ryb", color: "#008000FF" }).stringHEX()).toBe("#C0BA40FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "ryb", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "ryb", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "ryb", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "ryb", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("uvw", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "uvw", color: "#000F" }).stringHEX()).toBe("#BCBCBCFF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "uvw", color: "#000B" }).stringHEX()).toBe("#BCBCBCB3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "uvw", color: CM("#000B") })
        .stringHEX()
    ).toBe("#BCBCBCB3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "uvw", color: "#FF0" }).stringHEX()).toBe("#FFBC00FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "uvw", color: "#00F" }).stringHEX()).toBe("#BCBCBCFF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "uvw", color: "#F00" }).stringHEX()).toBe("#BC00BCFF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "uvw", color: "#F0F" }).stringHEX()).toBe("#BC5CBCFF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "uvw", color: "#FFA500" }).stringHEX()).toBe("#FF78BCFF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "uvw", color: "#008000FF" }).stringHEX()).toBe("#BC9400FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "uvw", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "uvw", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "uvw", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "uvw", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("xyz", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "xyz", color: "#000F" }).stringHEX()).toBe("#BCBCBCFF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "xyz", color: "#000B" }).stringHEX()).toBe("#BCBCBCB3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "xyz", color: CM("#000B") })
        .stringHEX()
    ).toBe("#BCBCBCB3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "xyz", color: "#FF0" }).stringHEX()).toBe("#FFBC00FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "xyz", color: "#00F" }).stringHEX()).toBe("#BCBCBCFF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "xyz", color: "#F00" }).stringHEX()).toBe("#BC00BCFF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "xyz", color: "#F0F" }).stringHEX()).toBe("#BC5CBCFF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "xyz", color: "#FFA500" }).stringHEX()).toBe("#FF78BCFF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "xyz", color: "#008000FF" }).stringHEX()).toBe("#BC9400FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "xyz", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "xyz", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "xyz", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "xyz", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});

describe("cmyk", () => {
  test("opposite", () => expect(CM("#FFFF").mix({ colorspace: "cmyk", color: "#000F" }).stringHEX()).toBe("#808080FF"));
  test("opposite with different opacity", () =>
    expect(CM("#FFFA").mix({ colorspace: "cmyk", color: "#000B" }).stringHEX()).toBe("#808080B3"));
  test("opposite with instance", () =>
    expect(
      CM("#FFFA")
        .mix({ colorspace: "cmyk", color: CM("#000B") })
        .stringHEX()
    ).toBe("#808080B3"));
  test("red & yellow → orange", () =>
    expect(CM("#F00").mix({ colorspace: "cmyk", color: "#FF0" }).stringHEX()).toBe("#FF8000FF")); // #FFA500FF (perfect)
  test("yellow & blue → green", () =>
    expect(CM("#FF0").mix({ colorspace: "cmyk", color: "#00F" }).stringHEX()).toBe("#808080FF")); // #008000FF (perfect)
  test("blue & red → magenta", () =>
    expect(CM("#00F").mix({ colorspace: "cmyk", color: "#F00" }).stringHEX()).toBe("#800080FF")); // #FF00FFFF (perfect)
  test("green & magenta → blue", () =>
    expect(CM("#008000FF").mix({ colorspace: "cmyk", color: "#F0F" }).stringHEX()).toBe("#606060FF")); // #0000FFFF (perfect)
  test("magenta & orange → red", () =>
    expect(CM("#F0F").mix({ colorspace: "cmyk", color: "#FFA500" }).stringHEX()).toBe("#FF5380FF")); // #FF0000FF (perfect)
  test("orange & green → yellow", () =>
    expect(CM("#FFA500").mix({ colorspace: "cmyk", color: "#008000FF" }).stringHEX()).toBe("#609E00FF")); // #FFFF00FF (perfect)
  test("ratio < 0", () =>
    expect(CM("#ABC").mix({ colorspace: "cmyk", color: "#F00F", ratio: -1 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 0", () =>
    expect(CM("#ABC").mix({ colorspace: "cmyk", color: "#F00F", ratio: 0 }).stringHEX()).toBe("#AABBCCFF"));
  test("ratio = 1", () =>
    expect(CM("#ABC").mix({ colorspace: "cmyk", color: "#F00F", ratio: 1 }).stringHEX()).toBe("#FF0000FF"));
  test("ratio > 1", () =>
    expect(CM("#ABC").mix({ colorspace: "cmyk", color: "#F00F", ratio: 2 }).stringHEX()).toBe("#FF0000FF"));
});
