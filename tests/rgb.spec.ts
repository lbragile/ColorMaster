import CM, { TNumArr } from "../src/index";
import RGBColors from "../src/models/rgb";

let cm: RGBColors;

beforeEach(() => (cm = CM.RGBAFrom(128, 64, 32, 0.7)));

describe("object instantiation with overloaded helper", () => {
  const FULL_OPACITY = "rgba(128, 64, 32, 1.0)";
  const LOWER_OPACITY = "rgba(128, 64, 32, 0.5)";

  test("object", () => {
    expect(CM.RGBAFrom({ r: 128, g: 64, b: 32, a: 0.5 }).string()).toBe(LOWER_OPACITY);
    expect(CM.RGBAFrom({ r: 128, g: 64, b: 32 }).string()).toBe(FULL_OPACITY);
  });

  test("array", () => {
    expect(CM.RGBAFrom([128, 64, 32, 0.5]).string()).toBe(LOWER_OPACITY);
    expect(CM.RGBAFrom([128, 64, 32]).string()).toBe(FULL_OPACITY);
  });

  test("values", () => {
    expect(CM.RGBAFrom(128, 64, 32, 0.5).string()).toBe(LOWER_OPACITY);
    expect(CM.RGBAFrom(128, 64, 32).string()).toBe(FULL_OPACITY);
  });

  test("string with just values", () => {
    expect(CM.RGBAFrom("128, 64, 32, 0.5").string()).toBe(LOWER_OPACITY);
    expect(CM.RGBAFrom("128, 64, 32, 1").string()).toBe(FULL_OPACITY);
  });

  test("string with prefix(s)", () => {
    expect(CM.RGBAFrom("rgb(128, 64, 32, 0.5)").string()).toBe(LOWER_OPACITY);
    expect(CM.RGBAFrom("rgb(128, 64, 32)").string()).toBe(FULL_OPACITY);
    expect(CM.RGBAFrom(LOWER_OPACITY).string()).toBe(LOWER_OPACITY);
    expect(CM.RGBAFrom("rgba(128, 64, 32)").string()).toBe(FULL_OPACITY);
    expect(CM.RGBAFrom("(128, 64, 32, 0.5)").string()).toBe(LOWER_OPACITY);
    expect(CM.RGBAFrom("(128, 64, 32, 1)").string()).toBe(FULL_OPACITY);
  });

  it("handles invalid input by throwing errors when needed", () => {
    expect(CM.RGBAFrom("128, 64").object).toMatchObject({ r: 128, g: 64, b: 0, a: 1 });
    expect(CM.RGBAFrom("128, 64, 32, 5, 5").object).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
    expect(CM.RGBAFrom({ r: 128, g: 64, b: 32, a: 5 }).object).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
    expect(CM.RGBAFrom([128, 64, 32, 5]).object).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
  });
});

describe("getters & setters", () => {
  test("object getter", () => expect(cm.object).toMatchObject({ r: 128, g: 64, b: 32, a: 0.7 }));

  test("object setter", () => {
    cm.object = { ...cm.object, r: 100 };
    expect(cm.string({ withAlpha: false })).toBe("rgb(100, 64, 32)");
  });

  test("array getter", () => expect(cm.array).toEqual([128, 64, 32, 0.7]));

  test("array setter", () => {
    const currArr = cm.array;
    currArr[0] = 48;

    cm.array = currArr;
    expect(cm.string()).toBe("rgba(48, 64, 32, 0.7)");

    cm.array = currArr.slice(0, 3) as TNumArr;
    expect(cm.string()).toBe("rgba(48, 64, 32, 1.0)");
  });

  test("format getter", () => expect(cm.format).toBe("rgb"));
});

describe("string formation", () => {
  test("without alpha", () => expect(cm.string({ withAlpha: false })).toBe("rgb(128, 64, 32)"));
  test("with alpha", () => expect(cm.string()).toBe("rgba(128, 64, 32, 0.7)"));
  test("with precision", () => {
    const CM_PRECISE = CM.RGBAFrom("190.234, 60.35, 60.545, 0.73");
    expect(CM_PRECISE.string({ precision: [0, 1, 2, 3] })).toBe("rgba(190, 60.4, 60.55, 0.730)");
    expect(CM_PRECISE.string({ precision: [0, 1, 2] })).toBe("rgba(190, 60.4, 60.55, 0.7)");
    expect(CM_PRECISE.string({ precision: [-1, 1, 2] })).toBe("rgba(190.234, 60.4, 60.55, 0.7)");
  });
});

describe("name", () => {
  test("with alpha = 1", () => expect(CM.RGBAFrom("rgb(128.4, 0, 0, 1)").name()).toBe("maroon"));
  test("with 0 < alpha < 1", () => expect(CM.RGBAFrom("rgb(128.4, 0, 0, 0.5)").name()).toBe("maroon (with opacity)"));
  test("with alpha = 0", () => expect(CM.RGBAFrom("rgb(128.4, 0, 0, 0)").name()).toBe("transparent"));
  test("undefined", () => expect(CM.RGBAFrom("rgb(1, 0, 0)").name()).toBe("undefined"));
});

describe("changeValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel    | value  | expected
      ${"red"}   | ${100} | ${"rgba(100, 64, 32, 0.7)"}
      ${"green"} | ${100} | ${"rgba(128, 100, 32, 0.7)"}
      ${"blue"}  | ${100} | ${"rgba(128, 64, 100, 0.7)"}
      ${"alpha"} | ${0.5} | ${"rgba(128, 64, 32, 0.5)"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value     | expected
      ${"red"}   | ${255.01} | ${"rgba(255, 64, 32, 0.7)"}
      ${"red"}   | ${-0.01}  | ${"rgba(0, 64, 32, 0.7)"}
      ${"green"} | ${255.01} | ${"rgba(128, 255, 32, 0.7)"}
      ${"green"} | ${-0.01}  | ${"rgba(128, 0, 32, 0.7)"}
      ${"blue"}  | ${255.01} | ${"rgba(128, 64, 255, 0.7)"}
      ${"blue"}  | ${-0.01}  | ${"rgba(128, 64, 0, 0.7)"}
      ${"alpha"} | ${1.01}   | ${"rgba(128, 64, 32, 1.0)"}
      ${"alpha"} | ${-0.01}  | ${"rgba(128, 64, 32, 0.0)"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });
});

describe("changeValueBy", () => {
  describe("no clamping", () => {
    test.each`
      channel    | delta   | expected
      ${"red"}   | ${5}    | ${"rgba(133, 64, 32, 0.7)"}
      ${"red"}   | ${-5}   | ${"rgba(123, 64, 32, 0.7)"}
      ${"green"} | ${5}    | ${"rgba(128, 69, 32, 0.7)"}
      ${"green"} | ${-5}   | ${"rgba(128, 59, 32, 0.7)"}
      ${"blue"}  | ${5}    | ${"rgba(128, 64, 37, 0.7)"}
      ${"blue"}  | ${-5}   | ${"rgba(128, 64, 27, 0.7)"}
      ${"alpha"} | ${0.2}  | ${"rgba(128, 64, 32, 0.9)"}
      ${"alpha"} | ${-0.2} | ${"rgba(128, 64, 32, 0.5)"}
    `("change $channel channel", ({ channel, delta, expected }) => {
      expect(cm.changeValueBy(channel, delta).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value                       | expected
      ${"red"}   | ${Number.POSITIVE_INFINITY} | ${"rgba(255, 64, 32, 0.7)"}
      ${"red"}   | ${Number.NEGATIVE_INFINITY} | ${"rgba(0, 64, 32, 0.7)"}
      ${"green"} | ${Number.POSITIVE_INFINITY} | ${"rgba(128, 255, 32, 0.7)"}
      ${"green"} | ${Number.NEGATIVE_INFINITY} | ${"rgba(128, 0, 32, 0.7)"}
      ${"blue"}  | ${Number.POSITIVE_INFINITY} | ${"rgba(128, 64, 255, 0.7)"}
      ${"blue"}  | ${Number.NEGATIVE_INFINITY} | ${"rgba(128, 64, 0, 0.7)"}
      ${"alpha"} | ${1}                        | ${"rgba(128, 64, 32, 1.0)"}
      ${"alpha"} | ${-1}                       | ${"rgba(128, 64, 32, 0.0)"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueBy(channel, value).string()).toBe(expected);
    });
  });
});

describe("alpha", () => {
  test("alphaTo", () => expect(cm.alphaTo(0.5).string()).toBe("rgba(128, 64, 32, 0.5)"));

  test("alphaBy", () => {
    expect(cm.alphaBy(0.1).string()).toBe("rgba(128, 64, 32, 0.8)");
    expect(cm.alphaBy(-0.2).string()).toBe("rgba(128, 64, 32, 0.6)");
  });
});

describe("invert", () => {
  test("include alpha", () => expect(cm.invert().string()).toBe("rgba(127, 191, 223, 0.3)"));
  test("exclude alpha", () => expect(cm.invert({ includeAlpha: false }).string()).toBe("rgba(127, 191, 223, 0.7)"));
});

describe("saturateBy/desaturateBy", () => {
  test("value > 1", () => {
    expect(cm.saturateBy(20).string()).toBe("rgba(144, 59, 16, 0.7)");
    expect(cm.desaturateBy(10).string()).toBe("rgba(120, 67, 40, 0.7)");
  });

  test("0 <= value <= 1", () => {
    expect(cm.saturateBy(0.2).string()).toBe("rgba(144, 59, 16, 0.7)");
    expect(cm.desaturateBy(0.1).string()).toBe("rgba(120, 67, 40, 0.7)");
  });
});

describe("lighterBy/darkerBy", () => {
  test("value > 1", () => {
    expect(cm.lighterBy(20).string()).toBe("rgba(205, 106, 57, 0.7)");
    expect(cm.darkerBy(10).string()).toBe("rgba(87, 44, 22, 0.7)");
  });

  test("0 <= value <= 1", () => {
    expect(cm.lighterBy(0.2).string()).toBe("rgba(205, 106, 57, 0.7)");
    expect(cm.darkerBy(0.1).string()).toBe("rgba(87, 44, 22, 0.7)");
  });
});

test("grayscale", () => expect(cm.grayscale().string()).toBe("rgba(80, 80, 80, 0.7)"));

describe("rotate", () => {
  test("value > 0", () => expect(cm.rotate(120).string()).toBe("rgba(32, 128, 64, 0.7)"));
  test("value = 0", () => expect(cm.rotate(0).string()).toBe("rgba(128, 64, 32, 0.7)"));
  test("value < 0", () => expect(cm.rotate(-120).string()).toBe("rgba(64, 32, 128, 0.7)"));
});

describe("closestWebSafe", () => {
  test.each`
    val    | location
    ${0}   | ${"first"}
    ${51}  | ${"first"}
    ${102} | ${"first"}
    ${153} | ${"first"}
    ${204} | ${"first"}
    ${255} | ${"first"}
    ${0}   | ${"middle"}
    ${51}  | ${"middle"}
    ${102} | ${"middle"}
    ${153} | ${"middle"}
    ${204} | ${"middle"}
    ${255} | ${"middle"}
    ${0}   | ${"last"}
    ${51}  | ${"last"}
    ${102} | ${"last"}
    ${153} | ${"last"}
    ${204} | ${"last"}
    ${255} | ${"last"}
  `("$val $location", ({ val, location }) => {
    const [isFirst, isMiddle, isLast] = [location === "first", location === "middle", location === "last"];
    const [lower, upper] = [val - 25, val + 25];
    const expected = `rgba(${isFirst ? val : 0}, ${isMiddle ? val : 0}, ${isLast ? val : 0}, 0.7)`;

    expect(CM.RGBAFrom(isFirst ? lower : 1, isMiddle ? lower : 1, isLast ? lower : 1, 0.7).closestWebSafe().string()).toBe(expected); // prettier-ignore
    expect(CM.RGBAFrom(isFirst ? upper : 1, isMiddle ? upper : 1, isLast ? upper : 1, 0.7).closestWebSafe().string()).toBe(expected); // prettier-ignore
  });
});
