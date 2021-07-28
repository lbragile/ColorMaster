import CM from "../src/index";
import HSLColors from "../src/models/hsl";

let cm: HSLColors;

beforeEach(() => (cm = CM.HSLAFrom(190, 60, 60, 0.6)));

describe("object instantiation with overloaded helper", () => {
  const FULL_OPACITY = "hsla(128, 50%, 60%, 1.0)";
  const LOWER_OPACITY = "hsla(128, 50%, 60%, 0.7)";

  test("object", () => {
    expect(CM.HSLAFrom({ h: 128, s: 50, l: 60, a: 0.7 }).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom({ h: 128, s: 50, l: 60 }).string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("array", () => {
    expect(CM.HSLAFrom([128, 50, 60, 0.7]).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom([128, 50, 60]).string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("values", () => {
    expect(CM.HSLAFrom(128, 50, 60, 0.7).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom(128, 50, 60).string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("string with just values", () => {
    expect(CM.HSLAFrom("128, 50, 60, 0.7").string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom("128, 50%, 60%, 0.7").string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom("128, 50, 60").string()).toBe(`'${FULL_OPACITY}'`);
  });

  test("string with prefix(s)", () => {
    expect(CM.HSLAFrom("hsl(128, 50%, 60%, 0.7)").string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom("hsl(128, 50%, 60%)").string()).toBe(`'${FULL_OPACITY}'`);
    expect(CM.HSLAFrom(LOWER_OPACITY).string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom("hsla(128, 50%, 60%)").string()).toBe(`'${FULL_OPACITY}'`);
    expect(CM.HSLAFrom("(128, 50%, 60%, 0.7)").string()).toBe(`'${LOWER_OPACITY}'`);
    expect(CM.HSLAFrom("(128, 50%, 60%)").string()).toBe(`'${FULL_OPACITY}'`);
  });

  it("handles invalid input by returning a default color 'black' or a mixture with valid input", () => {
    expect(CM.HSLAFrom("128, 50%").hslaObj).toMatchObject({ h: 128, s: 50, l: 0, a: 1 });
    expect(CM.HSLAFrom("128, 50%, 60%, 0.6, 0.6").hslaObj).toMatchObject({ h: 128, s: 50, l: 60, a: 0.6 });
    expect(CM.HSLAFrom({ h: 128, s: 50, l: 60, a: 5 }).hslaObj).toMatchObject({ h: 128, s: 50, l: 60, a: 1 });
    expect(CM.HSLAFrom([128, 50, 60, 128]).hslaObj).toMatchObject({ h: 128, s: 50, l: 60, a: 1 });
  });
});

describe("getters & setters", () => {
  test("object getter", () => {
    expect(cm.hslaObj).toMatchObject({ h: 190, s: 60, l: 60, a: 0.6 });
  });

  test("object setter", () => {
    cm.hslaObj = { ...cm.hslaObj, h: 120 };
    expect(cm.string({ withAlpha: false })).toBe("'hsl(120, 60%, 60%)'");
  });

  test("array getter", () => {
    expect(cm.hslaArr).toEqual([190, 60, 60, 0.6]);
  });

  test("array setter", () => {
    const currArr = cm.hslaArr;
    currArr[0] = 210;
    cm.hslaArr = currArr;
    expect(cm.string({ withAlpha: false })).toBe("'hsl(210, 60%, 60%)'");
  });
});

describe("string formation", () => {
  test("no args", () => {
    expect(cm.string({ withAlpha: false })).toBe("'hsl(190, 60%, 60%)'");
  });

  test("with alpha", () => {
    expect(cm.string()).toBe("'hsla(190, 60%, 60%, 0.6)'");
  });

  test("single quotes", () => {
    expect(cm.string({ withAlpha: false, quotes: "single" })).toBe("'hsl(190, 60%, 60%)'");
  });

  test("with alpha && double quotes", () => {
    expect(cm.string({ quotes: "double" })).toBe('"hsla(190, 60%, 60%, 0.6)"');
  });
});

describe("changeValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel         | value  | expected
      ${"hue"}        | ${120} | ${"'hsla(120, 60%, 60%, 0.6)'"}
      ${"saturation"} | ${70}  | ${"'hsla(190, 70%, 60%, 0.6)'"}
      ${"lightness"}  | ${70}  | ${"'hsla(190, 60%, 70%, 0.6)'"}
      ${"alpha"}      | ${0.7} | ${"'hsla(190, 60%, 60%, 0.7)'"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
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
      ${"alpha"}      | ${1.01}  | ${"'hsla(190, 60%, 60%, 1.0)'"}
      ${"alpha"}      | ${-0.01} | ${"'hsla(190, 60%, 60%, 0.0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });
});

describe("changeValueBy", () => {
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
      expect(cm.changeValueBy(channel, value).string()).toBe(expected);
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
      ${"alpha"}      | ${1}    | ${"'hsla(190, 60%, 60%, 1.0)'"}
      ${"alpha"}      | ${-1}   | ${"'hsla(190, 60%, 60%, 0.0)'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueBy(channel, value).string()).toBe(expected);
    });
  });
});

describe("hue", () => {
  test("hueTo", () => {
    expect(cm.hueTo(210).string()).toBe("'hsla(210, 60%, 60%, 0.6)'");
  });

  test("hueBy", () => {
    expect(cm.hueBy(50).string()).toBe("'hsla(240, 60%, 60%, 0.6)'");
    expect(cm.hueBy(-100).string()).toBe("'hsla(140, 60%, 60%, 0.6)'");
  });
});

describe("alpha", () => {
  test("alphaTo", () => {
    expect(cm.alphaTo(0.95).string({ precision: [0, 0, 0, 2] })).toBe("'hsla(190, 60%, 60%, 0.95)'");
  });

  test("alphaBy", () => {
    expect(cm.alphaBy(0.2).string()).toBe("'hsla(190, 60%, 60%, 0.8)'");
    expect(cm.alphaBy(-0.4).string()).toBe("'hsla(190, 60%, 60%, 0.4)'");
  });
});

describe("invert", () => {
  test("include alpha", () => {
    expect(cm.invert().string()).toBe("'hsla(10, 60%, 40%, 0.4)'");
  });

  test("exclude alpha", () => {
    expect(cm.invert({ includeAlpha: false }).string()).toBe("'hsla(10, 60%, 40%, 0.6)'");
  });
});

describe("saturateBy/desaturateBy", () => {
  test("value > 1", () => {
    expect(cm.saturateBy(20).string()).toBe("'hsla(190, 80%, 60%, 0.6)'");
    expect(cm.desaturateBy(10).string()).toBe("'hsla(190, 70%, 60%, 0.6)'");
  });

  test("0 <= value <= 1", () => {
    expect(cm.saturateBy(0.2).string()).toBe("'hsla(190, 80%, 60%, 0.6)'");
    expect(cm.desaturateBy(0.1).string()).toBe("'hsla(190, 70%, 60%, 0.6)'");
  });
});

describe("lighterBy/darkerBy", () => {
  test("value > 1", () => {
    expect(cm.lighterBy(20).string()).toBe("'hsla(190, 60%, 80%, 0.6)'");
    expect(cm.darkerBy(10).string()).toBe("'hsla(190, 60%, 70%, 0.6)'");
  });

  test("0 <= value <= 1", () => {
    expect(cm.lighterBy(0.2).string()).toBe("'hsla(190, 60%, 80%, 0.6)'");
    expect(cm.darkerBy(0.1).string()).toBe("'hsla(190, 60%, 70%, 0.6)'");
  });
});

test("grayscale", () => {
  expect(cm.grayscale().string()).toBe("'hsla(190, 0%, 60%, 0.6)'");
});
