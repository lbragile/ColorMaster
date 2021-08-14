import CM, { ColorMaster, random } from "../src/colormaster";
import { TNumArr } from "../src/types/colormaster";

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";
const precision: TNumArr = [0, 1, 1, 1];

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("String Formation", () => {
  test("rgba", () => expect(cm.stringRGB()).toBe(TEST_COLOR));
  test("rgb", () => expect(cm.stringRGB({ alpha: false })).toBe("rgb(200, 150, 100)"));
  test("hsla", () => expect(cm.stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("hsl", () => expect(cm.stringHSL({ precision, alpha: false })).toBe("hsl(30, 47.6%, 58.8%)"));
  test("hexa", () => expect(cm.stringHEX()).toBe("#C89664B3"));
  test("hex", () => expect(cm.stringHEX({ alpha: false })).toBe("#C89664"));
});

describe("Converters", () => {
  test("rgba", () => expect(cm.rgba()).toStrictEqual({ r: 200, g: 150, b: 100, a: 0.7 }));
  test("hsla", () =>
    expect(cm.hsla()).toStrictEqual({ h: 30.000000000000007, s: 47.61904761904762, l: 58.82352941176471, a: 0.7 }));
  test("hexa", () => expect(cm.hexa({ round: true })).toStrictEqual({ r: "C8", g: "96", b: "64", a: "B3" }));
});

describe("hueTo", () => {
  test("< 0", () => expect(cm.hueTo(-1).stringHSL({ precision })).toBe("hsla(359, 47.6%, 58.8%, 0.7)"));
  test("= 0", () => expect(cm.hueTo(0).stringHSL({ precision })).toBe("hsla(0, 47.6%, 58.8%, 0.7)"));
  test("> 0 & < 360", () => expect(cm.hueTo(180).stringHSL({ precision })).toBe("hsla(180, 47.6%, 58.8%, 0.7)"));
  test("= 360", () => expect(cm.hueTo(360).stringHSL({ precision })).toBe("hsla(0, 47.6%, 58.8%, 0.7)"));
  test("> 360", () => expect(cm.hueTo(361).stringHSL({ precision })).toBe("hsla(1, 47.6%, 58.8%, 0.7)"));
});

describe("hueBy", () => {
  test("< 0", () => expect(cm.hueBy(-1).stringHSL({ precision })).toBe("hsla(29, 47.6%, 58.8%, 0.7)"));
  test("= 0", () => expect(cm.hueBy(0).stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("> 0", () => expect(cm.hueBy(1).stringHSL({ precision })).toBe("hsla(31, 47.6%, 58.8%, 0.7)"));
});

describe("alphaTo", () => {
  test("< 0", () => expect(cm.alphaTo(-0.01).stringRGB()).toBe("rgba(200, 150, 100, 0)"));
  test("= 0", () => expect(cm.alphaTo(0).stringRGB()).toBe("rgba(200, 150, 100, 0)"));
  test("> 0 & < 1", () => expect(cm.alphaTo(0.5).stringRGB()).toBe("rgba(200, 150, 100, 0.5)"));
  test("= 1", () => expect(cm.alphaTo(1).stringRGB()).toBe("rgba(200, 150, 100, 1)"));
  test("> 1", () => expect(cm.alphaTo(1.01).stringRGB()).toBe("rgba(200, 150, 100, 1)"));
});

describe("alphaBy", () => {
  test("< 0", () => expect(cm.alphaBy(-0.2).stringRGB()).toBe("rgba(200, 150, 100, 0.5)"));
  test("= 0", () => expect(cm.alphaBy(0).stringRGB()).toBe("rgba(200, 150, 100, 0.7)"));
  test("> 0", () => expect(cm.alphaBy(0.2).stringRGB()).toBe("rgba(200, 150, 100, 0.9)"));
});

describe("Invert", () => {
  test("alpha", () => expect(cm.invert({ alpha: true }).stringRGB()).toBe("rgba(55, 105, 155, 0.3)"));
  test("no alpha", () => expect(cm.invert().stringRGB()).toBe("rgba(55, 105, 155, 0.7)"));
});

describe("saturateBy", () => {
  test("< 0", () => expect(cm.saturateBy(-20).stringHSL({ precision })).toBe("hsla(30, 27.6%, 58.8%, 0.7)"));
  test("= 0", () => expect(cm.saturateBy(0).stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("> 0", () => expect(cm.saturateBy(20).stringHSL({ precision })).toBe("hsla(30, 67.6%, 58.8%, 0.7)"));
  test(">= 100", () => expect(cm.saturateBy(100).stringHSL({ precision })).toBe("hsla(30, 100%, 58.8%, 0.7)"));
});

describe("desaturateBy", () => {
  test("< 0", () => expect(cm.desaturateBy(-20).stringHSL({ precision })).toBe("hsla(30, 67.6%, 58.8%, 0.7)"));
  test("= 0", () => expect(cm.desaturateBy(0).stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("> 0", () => expect(cm.desaturateBy(20).stringHSL({ precision })).toBe("hsla(30, 27.6%, 58.8%, 0.7)"));
  test(">= 100", () => expect(cm.desaturateBy(100).stringHSL({ precision })).toBe("hsla(0, 0%, 58.8%, 0.7)"));
});

describe("lighterBy", () => {
  test("< 0", () => expect(cm.lighterBy(-20).stringHSL({ precision })).toBe("hsla(30, 47.6%, 38.8%, 0.7)"));
  test("= 0", () => expect(cm.lighterBy(0).stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("> 0", () => expect(cm.lighterBy(20).stringHSL({ precision })).toBe("hsla(30, 47.6%, 78.8%, 0.7)"));
  test(">= 100", () => expect(cm.lighterBy(100).stringHSL({ precision })).toBe("hsla(0, 0%, 100%, 0.7)"));
});

describe("darkerBy", () => {
  test("< 0", () => expect(cm.darkerBy(-20).stringHSL({ precision })).toBe("hsla(30, 47.6%, 78.8%, 0.7)"));
  test("= 0", () => expect(cm.darkerBy(0).stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("> 0", () => expect(cm.darkerBy(20).stringHSL({ precision })).toBe("hsla(30, 47.6%, 38.8%, 0.7)"));
  test(">= 100", () => expect(cm.darkerBy(100).stringHSL({ precision })).toBe("hsla(0, 0%, 0%, 0.7)"));
});

describe("getters", () => {
  test("array", () => expect(cm.array).toEqual([200, 150, 100, 0.7]));
  test("format", () => expect(cm.format).toBe("rgb"));
  test("format - invalid", () => expect(CM("magic").format).toBe("invalid"));
  test("format - name", () => expect(CM("red").format).toBe("invalid")); // name plugin is not defined
  test("red", () => expect(cm.red).toBe(200));
  test("green", () => expect(cm.green).toBe(150));
  test("blue", () => expect(cm.blue).toBe(100));
  test("alpha", () => expect(cm.alpha).toBe(0.7));
  test("hue", () => expect(+cm.hue.toFixed(1)).toBe(30.0));
  test("saturation", () => expect(+cm.saturation.toFixed(1)).toBe(47.6));
  test("lightness", () => expect(+cm.lightness.toFixed(1)).toBe(58.8));
});

describe("isValid", () => {
  test("valid", () => expect(cm.isValid()).toBeTruthy());
  test("invalid", () => expect(CM("magic").isValid()).toBeFalsy());
});

describe("grayscale", () => {
  test("black", () => expect(CM("#012").grayscale().stringRGB()).toBe("rgba(17, 17, 17, 1)"));
  test("current", () => expect(cm.grayscale().stringRGB()).toBe("rgba(150, 150, 150, 0.7)"));
  test("white", () => expect(CM("#fed").grayscale().stringRGB()).toBe("rgba(238, 238, 238, 1)"));
});

describe("rotate", () => {
  test("< 0", () => expect(cm.rotate(-10).stringHSL({ precision })).toBe("hsla(20, 47.6%, 58.8%, 0.7)"));
  test("= 0", () => expect(cm.rotate(0).stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("> 0 & < 360", () => expect(cm.rotate(180).stringHSL({ precision })).toBe("hsla(210, 47.6%, 58.8%, 0.7)"));
  test("= 360", () => expect(cm.rotate(360).stringHSL({ precision })).toBe("hsla(30, 47.6%, 58.8%, 0.7)"));
  test("> 360", () => expect(cm.rotate(361).stringHSL({ precision })).toBe("hsla(31, 47.6%, 58.8%, 0.7)"));
});

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("mix", () => {
  test("opposite", () =>
    expect(CM("rgba(255, 255, 255, 1)").mix("rgba(0, 0, 0, 1)", 0.5).stringRGB()).toBe("#777777FF"));
});

test("random generation", () => {
  jest
    .spyOn(global.Math, "random")
    .mockReturnValueOnce(200 / 255) // red   → 200
    .mockReturnValueOnce(150 / 255) // green → 150
    .mockReturnValueOnce(100 / 255) // blue  → 100
    .mockReturnValueOnce(0.7); // alpha → 0.7

  expect(random().stringRGB()).toBe(TEST_COLOR);
});
