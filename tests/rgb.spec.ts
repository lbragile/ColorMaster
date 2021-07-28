import CM from "../src/index";
import RGBColors from "../src/models/rgb";

let cm: RGBColors;

beforeEach(() => (cm = CM.RGBAFrom(128, 64, 32, 0.7)));

describe("object instantiation with overloaded helper", () => {
  const FULL_OPACITY = "rgba(128, 64, 32, 1.0)";
  const LOWER_OPACITY = "rgba(128, 64, 32, 0.5)";

  test("object", () => {
    expect(CM.RGBAFrom({ r: 128, g: 64, b: 32, a: 0.5 }).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.RGBAFrom({ r: 128, g: 64, b: 32 }).string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("array", () => {
    expect(CM.RGBAFrom([128, 64, 32, 0.5]).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.RGBAFrom([128, 64, 32]).string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("values", () => {
    expect(CM.RGBAFrom(128, 64, 32, 0.5).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.RGBAFrom(128, 64, 32).string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("string with just values", () => {
    expect(CM.RGBAFrom("128, 64, 32, 0.5").string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.RGBAFrom("128, 64, 32, 1").string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("string with prefix(s)", () => {
    expect(CM.RGBAFrom("rgb(128, 64, 32, 0.5)").string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.RGBAFrom("rgb(128, 64, 32)").string()).toBe(`'${FULL_OPACITY}'`);
    expect(CM.RGBAFrom(LOWER_OPACITY).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.RGBAFrom("rgba(128, 64, 32)").string()).toBe(`'${FULL_OPACITY}'`);
    expect(CM.RGBAFrom("(128, 64, 32, 0.5)").string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.RGBAFrom("(128, 64, 32, 1)").string()).toBe(`'${FULL_OPACITY}'`);
  });

  it("handles invalid input by throwing errors when needed", () => {
    expect(CM.RGBAFrom("128, 64").rgbaObj).toMatchObject({ r: 128, g: 64, b: 0, a: 1 });
    expect(CM.RGBAFrom("128, 64, 32, 5, 5").rgbaObj).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
    expect(CM.RGBAFrom({ r: 128, g: 64, b: 32, a: 5 }).rgbaObj).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
    expect(CM.RGBAFrom([128, 64, 32, 5]).rgbaObj).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
  });
});

describe("getters & setters", () => {
  test("object getter", () => {
    expect(cm.rgbaObj).toMatchObject({ r: 128, g: 64, b: 32, a: 0.7 });
  });

  test("object setter", () => {
    cm.rgbaObj = { ...cm.rgbaObj, r: 100 };
    expect(cm.string({ withAlpha: false })).toBe("'rgb(100, 64, 32)'");
  });

  test("array getter", () => {
    expect(cm.rgbaArr).toEqual([128, 64, 32, 0.7]);
  });

  test("array setter", () => {
    const currArr = cm.rgbaArr;
    currArr[0] = 48;
    cm.rgbaArr = currArr;
    expect(cm.string({ withAlpha: false })).toBe("'rgb(48, 64, 32)'");
  });
});

describe("string formation", () => {
  test("no args", () => {
    expect(cm.string({ withAlpha: false })).toBe("'rgb(128, 64, 32)'");
  });

  test("with alpha", () => {
    expect(cm.string()).toBe("'rgba(128, 64, 32, 0.7)'");
  });

  test("single quotes", () => {
    expect(cm.string({ withAlpha: false, quotes: "single" })).toBe("'rgb(128, 64, 32)'");
  });

  test("with alpha && double quotes", () => {
    expect(cm.string({ quotes: "double" })).toBe('"rgba(128, 64, 32, 0.7)"');
  });
});

describe("changeValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel    | value  | expected
      ${"red"}   | ${100} | ${"'rgba(100, 64, 32, 0.7)'"}
      ${"green"} | ${100} | ${"'rgba(128, 100, 32, 0.7)'"}
      ${"blue"}  | ${100} | ${"'rgba(128, 64, 100, 0.7)'"}
      ${"alpha"} | ${0.5} | ${"'rgba(128, 64, 32, 0.5)'"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value     | expected
      ${"red"}   | ${255.01} | ${"'rgba(255, 64, 32, 0.7)'"}
      ${"red"}   | ${-0.01}  | ${"'rgba(0, 64, 32, 0.7)'"}
      ${"green"} | ${255.01} | ${"'rgba(128, 255, 32, 0.7)'"}
      ${"green"} | ${-0.01}  | ${"'rgba(128, 0, 32, 0.7)'"}
      ${"blue"}  | ${255.01} | ${"'rgba(128, 64, 255, 0.7)'"}
      ${"blue"}  | ${-0.01}  | ${"'rgba(128, 64, 0, 0.7)'"}
      ${"alpha"} | ${1.01}   | ${"'rgba(128, 64, 32, 1.0)'"}
      ${"alpha"} | ${-0.01}  | ${"'rgba(128, 64, 32, 0.0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });
});

describe("changeValueBy", () => {
  describe("no clamping", () => {
    test.each`
      channel    | delta   | expected
      ${"red"}   | ${5}    | ${"'rgba(133, 64, 32, 0.7)'"}
      ${"red"}   | ${-5}   | ${"'rgba(123, 64, 32, 0.7)'"}
      ${"green"} | ${5}    | ${"'rgba(128, 69, 32, 0.7)'"}
      ${"green"} | ${-5}   | ${"'rgba(128, 59, 32, 0.7)'"}
      ${"blue"}  | ${5}    | ${"'rgba(128, 64, 37, 0.7)'"}
      ${"blue"}  | ${-5}   | ${"'rgba(128, 64, 27, 0.7)'"}
      ${"alpha"} | ${0.2}  | ${"'rgba(128, 64, 32, 0.9)'"}
      ${"alpha"} | ${-0.2} | ${"'rgba(128, 64, 32, 0.5)'"}
    `("change $channel channel", ({ channel, delta, expected }) => {
      expect(cm.changeValueBy(channel, delta).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value                       | expected
      ${"red"}   | ${Number.POSITIVE_INFINITY} | ${"'rgba(255, 64, 32, 0.7)'"}
      ${"red"}   | ${Number.NEGATIVE_INFINITY} | ${"'rgba(0, 64, 32, 0.7)'"}
      ${"green"} | ${Number.POSITIVE_INFINITY} | ${"'rgba(128, 255, 32, 0.7)'"}
      ${"green"} | ${Number.NEGATIVE_INFINITY} | ${"'rgba(128, 0, 32, 0.7)'"}
      ${"blue"}  | ${Number.POSITIVE_INFINITY} | ${"'rgba(128, 64, 255, 0.7)'"}
      ${"blue"}  | ${Number.NEGATIVE_INFINITY} | ${"'rgba(128, 64, 0, 0.7)'"}
      ${"alpha"} | ${1}                        | ${"'rgba(128, 64, 32, 1.0)'"}
      ${"alpha"} | ${-1}                       | ${"'rgba(128, 64, 32, 0.0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueBy(channel, value).string()).toBe(expected);
    });
  });
});

describe("alpha", () => {
  test("alphaTo", () => {
    expect(cm.alphaTo(0.5).string()).toBe("'rgba(128, 64, 32, 0.5)'");
  });

  test("alphaBy", () => {
    expect(cm.alphaBy(0.1).string()).toBe("'rgba(128, 64, 32, 0.8)'");
    expect(cm.alphaBy(-0.2).string()).toBe("'rgba(128, 64, 32, 0.6)'");
  });
});

describe("invert", () => {
  test("include alpha", () => {
    expect(cm.invert().string()).toBe("'rgba(127, 191, 223, 0.3)'");
  });

  test("exclude alpha", () => {
    expect(cm.invert({ includeAlpha: false }).string()).toBe("'rgba(127, 191, 223, 0.7)'");
  });
});

describe("saturateBy/desaturateBy", () => {
  test("value > 1", () => {
    expect(cm.saturateBy(20).string()).toBe("'rgba(144, 59, 16, 0.7)'");
    expect(cm.desaturateBy(10).string()).toBe("'rgba(120, 67, 40, 0.7)'");
  });

  test("0 <= value <= 1", () => {
    expect(cm.saturateBy(0.2).string()).toBe("'rgba(144, 59, 16, 0.7)'");
    expect(cm.desaturateBy(0.1).string()).toBe("'rgba(120, 67, 40, 0.7)'");
  });
});

describe("lighterBy/darkerBy", () => {
  test("value > 1", () => {
    expect(cm.lighterBy(20).string()).toBe("'rgba(205, 106, 57, 0.7)'");
    expect(cm.darkerBy(10).string()).toBe("'rgba(87, 44, 22, 0.7)'");
  });

  test("0 <= value <= 1", () => {
    expect(cm.lighterBy(0.2).string()).toBe("'rgba(205, 106, 57, 0.7)'");
    expect(cm.darkerBy(0.1).string()).toBe("'rgba(87, 44, 22, 0.7)'");
  });
});

test("grayscale", () => {
  expect(cm.grayscale().string()).toBe("'rgba(80, 80, 80, 0.7)'");
});
