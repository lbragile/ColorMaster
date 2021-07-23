import { rgb } from "../src/index";
import RGBColors from "../src/models/rgb";

let cm: RGBColors;

beforeEach(() => {
  cm = rgb(128, 128, 128);
});

test("getter", () => {
  expect(cm.rgbaObj).toMatchObject({ r: 128, g: 128, b: 128 });
});

describe("string formation", () => {
  test("no args", () => {
    expect(cm.string()).toBe("'rgb(128, 128, 128)'");
  });

  test("with alpha", () => {
    expect(cm.string({ withAlpha: true })).toBe("'rgb(128, 128, 128, 1)'");
  });

  test("single quotes", () => {
    expect(cm.string({ quotes: "single" })).toBe("'rgb(128, 128, 128)'");
  });

  test("with alpha && double quotes", () => {
    expect(cm.string({ withAlpha: true, quotes: "double" })).toBe('"rgb(128, 128, 128, 1)"');
  });
});

test("alphaTo", () => {
  expect(cm.alphaTo(0.5).string({ withAlpha: true })).toBe("'rgb(128, 128, 128, 0.5)'");
});

test("set object directly", () => {
  cm.rgbaObj = { ...cm.rgbaObj, r: 100 };
  expect(cm.string()).toBe("'rgb(100, 128, 128)'");
});

describe("set object via helper function", () => {
  test("no clamping", () => {
    expect(cm.channelValueTo("red", 100).string({ withAlpha: true })).toBe("'rgb(100, 128, 128, 1)'");
    expect(cm.channelValueTo("green", 100).string({ withAlpha: true })).toBe("'rgb(100, 100, 128, 1)'");
    expect(cm.channelValueTo("blue", 100).string({ withAlpha: true })).toBe("'rgb(100, 100, 100, 1)'");
    expect(cm.channelValueTo("alpha", 0.5).string({ withAlpha: true })).toBe("'rgb(100, 100, 100, 0.5)'");
  });

  test("clamping", () => {
    expect(cm.channelValueTo("red", 256).string({ withAlpha: true })).toBe("'rgb(255, 128, 128, 1)'");
    expect(cm.channelValueTo("red", -1).string({ withAlpha: true })).toBe("'rgb(0, 128, 128, 1)'");

    expect(cm.channelValueTo("green", 256).string({ withAlpha: true })).toBe("'rgb(0, 255, 128, 1)'");
    expect(cm.channelValueTo("green", -1).string({ withAlpha: true })).toBe("'rgb(0, 0, 128, 1)'");

    expect(cm.channelValueTo("blue", 256).string({ withAlpha: true })).toBe("'rgb(0, 0, 255, 1)'");
    expect(cm.channelValueTo("blue", -1).string({ withAlpha: true })).toBe("'rgb(0, 0, 0, 1)'");

    expect(cm.channelValueTo("alpha", 1.01).string({ withAlpha: true })).toBe("'rgb(0, 0, 0, 1)'");
    expect(cm.channelValueTo("alpha", -0.01).string({ withAlpha: true })).toBe("'rgb(0, 0, 0, 0)'");
  });
});

test.todo("channelValueBy");
test.todo("alphaBy");
test.todo("test instantiation with overloaded rgb function, with and without alpha");
