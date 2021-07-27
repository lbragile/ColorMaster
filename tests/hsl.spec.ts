import HSLColors from "../src/models/hsl";

let cm: HSLColors;

beforeEach(() => (cm = new HSLColors(190, 60, 60, 0.6)));

test("getter", () => {
  expect(cm.hslaObj).toMatchObject({ h: 190, s: 60, l: 60, a: 0.6 });
});

test("setter", () => {
  cm.hslaObj = { ...cm.hslaObj, h: 120 };
  expect(cm.string()).toBe("'hsl(120, 60%, 60%)'");
});

describe("string formation", () => {
  test("no args", () => {
    expect(cm.string()).toBe("'hsl(190, 60%, 60%)'");
  });

  test("with alpha", () => {
    expect(cm.string({ withAlpha: true })).toBe("'hsla(190, 60%, 60%, 0.6)'");
  });

  test("single quotes", () => {
    expect(cm.string({ quotes: "single" })).toBe("'hsl(190, 60%, 60%)'");
  });

  test("with alpha && double quotes", () => {
    expect(cm.string({ withAlpha: true, quotes: "double" })).toBe('"hsla(190, 60%, 60%, 0.6)"');
  });
});

describe("channelValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel         | value  | expected
      ${"hue"}        | ${120} | ${"'hsla(120, 60%, 60%, 0.6)'"}
      ${"saturation"} | ${70}  | ${"'hsla(190, 70%, 60%, 0.6)'"}
      ${"lightness"}  | ${70}  | ${"'hsla(190, 60%, 70%, 0.6)'"}
      ${"alpha"}      | ${0.7} | ${"'hsla(190, 60%, 60%, 0.7)'"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.channelValueTo(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel         | value    | expected
      ${"hue"}        | ${360}   | ${"'hsla(0, 60%, 60%, 0.6)'"}
      ${"hue"}        | ${-360}  | ${"'hsla(0, 60%, 60%, 0.6)'"}
      ${"saturation"} | ${101}   | ${"'hsla(190, 100%, 60%, 0.6)'"}
      ${"saturation"} | ${-1}    | ${"'hsla(190, 0%, 60%, 0.6)'"}
      ${"lightness"}  | ${101}   | ${"'hsla(190, 60%, 100%, 0.6)'"}
      ${"lightness"}  | ${-1}    | ${"'hsla(190, 60%, 0%, 0.6)'"}
      ${"alpha"}      | ${1.01}  | ${"'hsla(190, 60%, 60%, 1)'"}
      ${"alpha"}      | ${-0.01} | ${"'hsla(190, 60%, 60%, 0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.channelValueTo(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });
});

describe("channelValueBy", () => {
  describe("no clamping", () => {
    test.each`
      channel         | value   | expected
      ${"hue"}        | ${60}   | ${"'hsla(250, 60%, 60%, 0.6)'"}
      ${"hue"}        | ${-60}  | ${"'hsla(130, 60%, 60%, 0.6)'"}
      ${"saturation"} | ${10}   | ${"'hsla(190, 70%, 60%, 0.6)'"}
      ${"saturation"} | ${-10}  | ${"'hsla(190, 50%, 60%, 0.6)'"}
      ${"lightness"}  | ${10}   | ${"'hsla(190, 60%, 70%, 0.6)'"}
      ${"lightness"}  | ${-10}  | ${"'hsla(190, 60%, 50%, 0.6)'"}
      ${"alpha"}      | ${0.1}  | ${"'hsla(190, 60%, 60%, 0.7)'"}
      ${"alpha"}      | ${-0.1} | ${"'hsla(190, 60%, 60%, 0.5)'"}
    `("change $channel channel → value $value", ({ channel, value, expected }) => {
      expect(cm.channelValueBy(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel         | value   | expected
      ${"hue"}        | ${360}  | ${"'hsla(190, 60%, 60%, 0.6)'"}
      ${"hue"}        | ${-360} | ${"'hsla(190, 60%, 60%, 0.6)'"}
      ${"saturation"} | ${100}  | ${"'hsla(190, 100%, 60%, 0.6)'"}
      ${"saturation"} | ${-100} | ${"'hsla(190, 0%, 60%, 0.6)'"}
      ${"lightness"}  | ${100}  | ${"'hsla(190, 60%, 100%, 0.6)'"}
      ${"lightness"}  | ${-100} | ${"'hsla(190, 60%, 0%, 0.6)'"}
      ${"alpha"}      | ${1}    | ${"'hsla(190, 60%, 60%, 1)'"}
      ${"alpha"}      | ${-1}   | ${"'hsla(190, 60%, 60%, 0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.channelValueBy(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });
});

describe("alpha", () => {
  test("alphaTo", () => {
    expect(cm.alphaTo(0.95).string({ withAlpha: true })).toBe("'hsla(190, 60%, 60%, 0.95)'");
  });

  test("alphaBy", () => {
    expect(cm.alphaBy(0.2).string({ withAlpha: true })).toBe("'hsla(190, 60%, 60%, 0.8)'");
    expect(cm.alphaBy(-0.4).string({ withAlpha: true })).toBe("'hsla(190, 60%, 60%, 0.4)'");
  });
});

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("invert", () => {
  test("include alpha", () => {
    expect(cm.invert({ includeAlpha: true }).string({ withAlpha: true })).toBe("'hsla(170, 40%, 40%, 0.4)'");
  });

  test("exclude alpha", () => {
    expect(cm.invert({ includeAlpha: false }).string({ withAlpha: true })).toBe("'hsla(170, 40%, 40%)'");
  });
});
