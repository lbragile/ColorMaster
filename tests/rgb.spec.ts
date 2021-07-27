import { rgb } from "../src/index";
import RGBColors from "../src/models/rgb";

let cm: RGBColors;

beforeEach(() => (cm = rgb(128, 128, 128, 0.7)));

describe("object instantiation with overloaded helper", () => {
  test("object", () => {
    expect(rgb({ r: 128, g: 128, b: 128, a: 0.5 }).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
    expect(rgb({ r: 128, g: 128, b: 128 }).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 1)'");
  });

  test("array", () => {
    expect(rgb([128, 128, 128, 0.5]).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
    expect(rgb([128, 128, 128]).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 1)'");
  });

  test("values", () => {
    expect(rgb(128, 128, 128, 0.5).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
    expect(rgb(128, 128, 128).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 1)'");
  });

  test("string with just values", () => {
    expect(rgb("128, 128, 128, 0.5").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
    expect(rgb("128, 128, 128, 1").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 1)'");
  });

  test("string with prefix(s)", () => {
    expect(rgb("rgb(128, 128, 128, 0.5)").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
    expect(rgb("rgb(128, 128, 128, 1)").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 1)'");
    expect(rgb("rgba(128, 128, 128, 0.5)").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
    expect(rgb("rgba(128, 128, 128, 1)").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 1)'");
    expect(rgb("(128, 128, 128, 0.5)").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
    expect(rgb("(128, 128, 128, 1)").string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 1)'");
  });

  it("handles invalid input by throwing errors when needed", () => {
    const CHANNEL_ERR_MSG = "red, green, and blue channel values must be provided";

    expect(() => rgb("128, 128").string()).toThrow(CHANNEL_ERR_MSG);
    expect(() => rgb("128, 128, 128, 128, 128").string()).not.toThrow(CHANNEL_ERR_MSG);
    expect(() => rgb({ r: 128, g: 128, b: 128, a: 128 }).string()).not.toThrow(CHANNEL_ERR_MSG);
    expect(() => rgb([128, 128, 128, 128]).string()).not.toThrow(CHANNEL_ERR_MSG);
  });
});

test("getter", () => {
  expect(cm.rgbaObj).toMatchObject({ r: 128, g: 128, b: 128, a: 0.7 });
});

test("setter", () => {
  cm.rgbaObj = { ...cm.rgbaObj, r: 100 };
  expect(cm.string()).toBe("'rgb(100, 128, 128)'");
});

describe("string formation", () => {
  test("no args", () => {
    expect(cm.string()).toBe("'rgb(128, 128, 128)'");
  });

  test("with alpha", () => {
    expect(cm.string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.7)'");
  });

  test("single quotes", () => {
    expect(cm.string({ quotes: "single" })).toBe("'rgb(128, 128, 128)'");
  });

  test("with alpha && double quotes", () => {
    expect(cm.string({ withAlpha: true, quotes: "double" })).toBe('"rgba(128, 128, 128, 0.7)"');
  });
});

describe("channelValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel    | value  | expected
      ${"red"}   | ${100} | ${"'rgba(100, 128, 128, 0.7)'"}
      ${"green"} | ${100} | ${"'rgba(128, 100, 128, 0.7)'"}
      ${"blue"}  | ${100} | ${"'rgba(128, 128, 100, 0.7)'"}
      ${"alpha"} | ${0.5} | ${"'rgba(128, 128, 128, 0.5)'"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.channelValueTo(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value     | expected
      ${"red"}   | ${255.01} | ${"'rgba(255, 128, 128, 0.7)'"}
      ${"red"}   | ${-0.01}  | ${"'rgba(0, 128, 128, 0.7)'"}
      ${"green"} | ${255.01} | ${"'rgba(128, 255, 128, 0.7)'"}
      ${"green"} | ${-0.01}  | ${"'rgba(128, 0, 128, 0.7)'"}
      ${"blue"}  | ${255.01} | ${"'rgba(128, 128, 255, 0.7)'"}
      ${"blue"}  | ${-0.01}  | ${"'rgba(128, 128, 0, 0.7)'"}
      ${"alpha"} | ${1.01}   | ${"'rgba(128, 128, 128, 1)'"}
      ${"alpha"} | ${-0.01}  | ${"'rgba(128, 128, 128, 0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.channelValueTo(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });
});

describe("channelValueBy", () => {
  describe("no clamping", () => {
    test.each`
      channel    | delta   | expected
      ${"red"}   | ${5}    | ${"'rgba(133, 128, 128, 0.7)'"}
      ${"red"}   | ${-5}   | ${"'rgba(123, 128, 128, 0.7)'"}
      ${"green"} | ${5}    | ${"'rgba(128, 133, 128, 0.7)'"}
      ${"green"} | ${-5}   | ${"'rgba(128, 123, 128, 0.7)'"}
      ${"blue"}  | ${5}    | ${"'rgba(128, 128, 133, 0.7)'"}
      ${"blue"}  | ${-5}   | ${"'rgba(128, 128, 123, 0.7)'"}
      ${"alpha"} | ${0.2}  | ${"'rgba(128, 128, 128, 0.9)'"}
      ${"alpha"} | ${-0.2} | ${"'rgba(128, 128, 128, 0.5)'"}
    `("change $channel channel", ({ channel, delta, expected }) => {
      expect(cm.channelValueBy(channel, delta).string({ withAlpha: true })).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value                       | expected
      ${"red"}   | ${Number.POSITIVE_INFINITY} | ${"'rgba(255, 128, 128, 0.7)'"}
      ${"red"}   | ${Number.NEGATIVE_INFINITY} | ${"'rgba(0, 128, 128, 0.7)'"}
      ${"green"} | ${Number.POSITIVE_INFINITY} | ${"'rgba(128, 255, 128, 0.7)'"}
      ${"green"} | ${Number.NEGATIVE_INFINITY} | ${"'rgba(128, 0, 128, 0.7)'"}
      ${"blue"}  | ${Number.POSITIVE_INFINITY} | ${"'rgba(128, 128, 255, 0.7)'"}
      ${"blue"}  | ${Number.NEGATIVE_INFINITY} | ${"'rgba(128, 128, 0, 0.7)'"}
      ${"alpha"} | ${1}                        | ${"'rgba(128, 128, 128, 1)'"}
      ${"alpha"} | ${-1}                       | ${"'rgba(128, 128, 128, 0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.channelValueBy(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });
});

describe("alpha", () => {
  test("alphaTo", () => {
    expect(cm.alphaTo(0.5).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.5)'");
  });

  test("alphaBy", () => {
    expect(cm.alphaBy(0.1).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.8)'");
    expect(cm.alphaBy(-0.2).string({ withAlpha: true })).toBe("'rgba(128, 128, 128, 0.6)'");
  });
});

describe("invert", () => {
  test("include alpha", () => {
    expect(cm.invert({ includeAlpha: true }).string({ withAlpha: true })).toBe("'rgba(127, 127, 127, 0.3)'");
  });

  test("exclude alpha", () => {
    expect(cm.invert({ includeAlpha: false }).string({ withAlpha: true })).toBe("'rgba(127, 127, 127, 0.7)'");
  });
});
