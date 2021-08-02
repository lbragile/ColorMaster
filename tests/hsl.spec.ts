import CM, { TNumArr } from "../src/index";
import HSLColors from "../src/models/hsl";

let cm: HSLColors;

beforeEach(() => (cm = CM.HSLAFrom(190, 60, 60, 0.6)));

describe("object instantiation with overloaded helper", () => {
  const FULL_OPACITY = "hsla(120, 50%, 60%, 1.0)";
  const LOWER_OPACITY = "hsla(120, 50%, 60%, 0.7)";

  test("object", () => {
    expect(CM.HSLAFrom({ h: 120, s: 50, l: 60, a: 0.7 }).string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom({ h: 120, s: 50, l: 60 }).string()).toBe(FULL_OPACITY);
  });

  test("array", () => {
    expect(CM.HSLAFrom([120, 50, 60, 0.7]).string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom([120, 50, 60]).string()).toBe(FULL_OPACITY);
  });

  test("values", () => {
    expect(CM.HSLAFrom(120, 50, 60, 0.7).string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom(120, 50, 60).string()).toBe(FULL_OPACITY);
    expect(CM.HSLAFrom("green", 50, 60).string()).toBe(FULL_OPACITY); // unique only to HSLA space where you can use CSS/HTML name from a predefined list
  });

  test("string with just values", () => {
    expect(CM.HSLAFrom("120, 50, 60, 0.7").string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom("120, 50%, 60%, 0.7").string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom("120, 50, 60").string()).toBe(FULL_OPACITY);
  });

  test("string with prefix(s)", () => {
    expect(CM.HSLAFrom("hsl(120, 50%, 60%, 0.7)").string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom("hsl(120, 50%, 60%)").string()).toBe(FULL_OPACITY);
    expect(CM.HSLAFrom(LOWER_OPACITY).string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom("hsla(120, 50%, 60%)").string()).toBe(FULL_OPACITY);
    expect(CM.HSLAFrom("(120, 50%, 60%, 0.7)").string()).toBe(LOWER_OPACITY);
    expect(CM.HSLAFrom("(120, 50%, 60%)").string()).toBe(FULL_OPACITY);
  });

  it("handles invalid input by returning a default color 'black' or a mixture with valid input", () => {
    expect(CM.HSLAFrom("120, 50%").object).toMatchObject({ h: 120, s: 50, l: 0, a: 1 });
    expect(CM.HSLAFrom("120, 50%, 60%, 0.6, 0.6").object).toMatchObject({ h: 120, s: 50, l: 60, a: 0.6 });
    expect(CM.HSLAFrom({ h: 120, s: 50, l: 60, a: 5 }).object).toMatchObject({ h: 120, s: 50, l: 60, a: 1 });
    expect(CM.HSLAFrom([120, 50, 60, 120]).object).toMatchObject({ h: 120, s: 50, l: 60, a: 1 });
    expect(CM.HSLAFrom([-240, 50, 60, 120]).object).toMatchObject({ h: 120, s: 50, l: 60, a: 1 });
    expect(new HSLColors().object).toMatchObject({ h: 0, s: 100, l: 0, a: 1 });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(CM.HSLAFrom().object).toMatchObject({ h: 0, s: 100, l: 0, a: 1 });
  });
});

describe("getters & setters", () => {
  test("object getter", () => expect(cm.object).toMatchObject({ h: 190, s: 60, l: 60, a: 0.6 }));

  test("object setter", () => {
    cm.object = { ...cm.object, h: 120 };
    expect(cm.string({ withAlpha: false })).toBe("hsl(120, 60%, 60%)");
  });

  test("array getter", () => expect(cm.array).toEqual([190, 60, 60, 0.6]));

  test("array setter", () => {
    const currArr = cm.array;
    currArr[0] = 210;

    cm.array = currArr;
    expect(cm.string()).toBe("hsla(210, 60%, 60%, 0.6)");

    cm.array = currArr.slice(0, 3) as TNumArr;
    expect(cm.string()).toBe("hsla(210, 60%, 60%, 1.0)");
  });

  test("format getter", () => expect(cm.format).toBe("hsl"));
  test("red getter", () => expect(cm.red).toEqual(91.8));
  test("green getter", () => expect(cm.green).toEqual(193.8));
  test("blue getter", () => expect(cm.blue).toEqual(214.2));
  test("alpha getter", () => expect(cm.alpha).toEqual(0.6));
  test("hue getter", () => expect(cm.hue).toEqual(190));
  test("saturation getter", () => expect(cm.saturation).toEqual(60));
  test("lightness getter", () => expect(cm.lightness).toEqual(60));
});

describe("string formation", () => {
  test("without alpha", () => expect(cm.string({ withAlpha: false })).toBe("hsl(190, 60%, 60%)"));
  test("with alpha", () => expect(cm.string()).toBe("hsla(190, 60%, 60%, 0.6)"));
  test("with precision", () => {
    const CM_PRECISE = CM.HSLAFrom("hsl(190.032, 60.35%, 60.2342%, 0.654321)");
    expect(CM_PRECISE.string({ precision: [0, 1, 2, 3] })).toBe("hsla(190, 60.4%, 60.23%, 0.654)");
    expect(CM_PRECISE.string({ precision: [0, 1, 2] })).toBe("hsla(190, 60.4%, 60.23%, 0.7)");
    expect(CM_PRECISE.string({ precision: [-1, -1, 2] })).toBe("hsla(190.032, 60.35%, 60.23%, 0.7)");
  });
});

describe("name", () => {
  test("with alpha = 1", () => expect(CM.HSLAFrom("hsla(0, 100%, 25.1%, 1)").name()).toBe("maroon"));
  test("with 0 < alpha < 1", () =>
    expect(CM.HSLAFrom("hsla(0, 100%, 25.1%, 0.5)").name()).toBe("maroon (with opacity)"));
  test("with alpha = 0", () => expect(CM.HSLAFrom("hsla(0, 100%, 25.1%, 0)").name()).toBe("transparent"));
  test("undefined", () => expect(CM.HSLAFrom("hsla(0, 1%, 50%, 0.9)").name()).toBe("undefined"));
  test("exact", () => expect(CM.HSLAFrom("hsla(0,1%,0%,1").name({ exact: false })).toBe("black"));
});

describe("changeValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel         | value  | expected
      ${"hue"}        | ${120} | ${"hsla(120, 60%, 60%, 0.6)"}
      ${"saturation"} | ${70}  | ${"hsla(190, 70%, 60%, 0.6)"}
      ${"lightness"}  | ${70}  | ${"hsla(190, 60%, 70%, 0.6)"}
      ${"alpha"}      | ${0.7} | ${"hsla(190, 60%, 60%, 0.7)"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel         | value    | expected
      ${"hue"}        | ${360}   | ${"hsla(0, 60%, 60%, 0.6)"}
      ${"hue"}        | ${-360}  | ${"hsla(0, 60%, 60%, 0.6)"}
      ${"saturation"} | ${101}   | ${"hsla(190, 100%, 60%, 0.6)"}
      ${"saturation"} | ${-1}    | ${"hsla(190, 0%, 60%, 0.6)"}
      ${"lightness"}  | ${101}   | ${"hsla(190, 60%, 100%, 0.6)"}
      ${"lightness"}  | ${-1}    | ${"hsla(190, 60%, 0%, 0.6)"}
      ${"alpha"}      | ${1.01}  | ${"hsla(190, 60%, 60%, 1.0)"}
      ${"alpha"}      | ${-0.01} | ${"hsla(190, 60%, 60%, 0.0)"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });
});

describe("changeValueBy", () => {
  describe("no clamping", () => {
    test.each`
      channel         | value   | expected
      ${"hue"}        | ${60}   | ${"hsla(250, 60%, 60%, 0.6)"}
      ${"hue"}        | ${-60}  | ${"hsla(130, 60%, 60%, 0.6)"}
      ${"saturation"} | ${10}   | ${"hsla(190, 70%, 60%, 0.6)"}
      ${"saturation"} | ${-10}  | ${"hsla(190, 50%, 60%, 0.6)"}
      ${"lightness"}  | ${10}   | ${"hsla(190, 60%, 70%, 0.6)"}
      ${"lightness"}  | ${-10}  | ${"hsla(190, 60%, 50%, 0.6)"}
      ${"alpha"}      | ${0.1}  | ${"hsla(190, 60%, 60%, 0.7)"}
      ${"alpha"}      | ${-0.1} | ${"hsla(190, 60%, 60%, 0.5)"}
    `("change $channel channel → value $value", ({ channel, value, expected }) => {
      expect(cm.changeValueBy(channel, value).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel         | value   | expected
      ${"hue"}        | ${360}  | ${"hsla(190, 60%, 60%, 0.6)"}
      ${"hue"}        | ${-360} | ${"hsla(190, 60%, 60%, 0.6)"}
      ${"saturation"} | ${100}  | ${"hsla(190, 100%, 60%, 0.6)"}
      ${"saturation"} | ${-100} | ${"hsla(190, 0%, 60%, 0.6)"}
      ${"lightness"}  | ${100}  | ${"hsla(190, 60%, 100%, 0.6)"}
      ${"lightness"}  | ${-100} | ${"hsla(190, 60%, 0%, 0.6)"}
      ${"alpha"}      | ${1}    | ${"hsla(190, 60%, 60%, 1.0)"}
      ${"alpha"}      | ${-1}   | ${"hsla(190, 60%, 60%, 0.0)"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueBy(channel, value).string()).toBe(expected);
    });
  });
});

describe("hue", () => {
  test("hueTo", () => {
    expect(cm.hueTo(210).string()).toBe("hsla(210, 60%, 60%, 0.6)");
    expect(cm.hueTo("blue").string()).toBe("hsla(240, 60%, 60%, 0.6)");
  });

  test("hueBy", () => {
    expect(cm.hueBy(50).string()).toBe("hsla(240, 60%, 60%, 0.6)");
    expect(cm.hueBy(-100).string()).toBe("hsla(140, 60%, 60%, 0.6)");
  });
});

describe("alpha", () => {
  test("alphaTo", () => expect(cm.alphaTo(0.95).string({ precision: [0, 0, 0, 2] })).toBe("hsla(190, 60%, 60%, 0.95)"));

  test("alphaBy", () => {
    expect(cm.alphaBy(0.2).string()).toBe("hsla(190, 60%, 60%, 0.8)");
    expect(cm.alphaBy(-0.4).string()).toBe("hsla(190, 60%, 60%, 0.4)");
  });
});

describe("invert", () => {
  test("include alpha", () => expect(cm.invert().string()).toBe("hsla(10, 60%, 40%, 0.4)"));
  test("exclude alpha", () => expect(cm.invert({ includeAlpha: false }).string()).toBe("hsla(10, 60%, 40%, 0.6)"));
});

describe("saturateBy/desaturateBy", () => {
  test("value > 1", () => {
    expect(cm.saturateBy(20).string()).toBe("hsla(190, 80%, 60%, 0.6)");
    expect(cm.desaturateBy(10).string()).toBe("hsla(190, 70%, 60%, 0.6)");
  });

  test("0 <= value <= 1", () => {
    expect(cm.saturateBy(0.2).string()).toBe("hsla(190, 80%, 60%, 0.6)");
    expect(cm.desaturateBy(0.1).string()).toBe("hsla(190, 70%, 60%, 0.6)");
  });
});

describe("lighterBy/darkerBy", () => {
  test("value > 1", () => {
    expect(cm.lighterBy(20).string()).toBe("hsla(190, 60%, 80%, 0.6)");
    expect(cm.darkerBy(10).string()).toBe("hsla(190, 60%, 70%, 0.6)");
  });

  test("0 <= value <= 1", () => {
    expect(cm.lighterBy(0.2).string()).toBe("hsla(190, 60%, 80%, 0.6)");
    expect(cm.darkerBy(0.1).string()).toBe("hsla(190, 60%, 70%, 0.6)");
  });
});

test("grayscale", () => expect(cm.grayscale().string()).toBe("hsla(190, 0%, 60%, 0.6)"));

describe("rotate", () => {
  test("value > 0", () => expect(cm.rotate(240).string()).toBe("hsla(70, 60%, 60%, 0.6)"));
  test("value = 0", () => expect(cm.rotate(0).string()).toBe("hsla(190, 60%, 60%, 0.6)"));
  test("value < 0", () => expect(cm.rotate(-240).string()).toBe("hsla(310, 60%, 60%, 0.6)"));
});

test("closestWebSafe", () => {
  // works if RGBA.closestWebSafe works, so will only check a few cases
  expect(CM.HSLAFrom(3, 97, 47, 0.7).closestWebSafe().string()).toBe("hsla(0, 100%, 50%, 0.7)");
  expect(CM.HSLAFrom(63, 97, 53, 0.7).closestWebSafe().string()).toBe("hsla(60, 100%, 50%, 0.7)");
  expect(CM.HSLAFrom(123, 97, 47, 0.7).closestWebSafe().string()).toBe("hsla(120, 100%, 50%, 0.7)");
  expect(CM.HSLAFrom(183, 97, 53, 0.7).closestWebSafe().string()).toBe("hsla(180, 100%, 50%, 0.7)");
  expect(CM.HSLAFrom(243, 97, 47, 0.7).closestWebSafe().string()).toBe("hsla(240, 100%, 50%, 0.7)");
  expect(CM.HSLAFrom(303, 97, 53, 0.7).closestWebSafe().string()).toBe("hsla(300, 100%, 50%, 0.7)");
  expect(CM.HSLAFrom(357, 97, 47, 0.7).closestWebSafe().string()).toBe("hsla(0, 100%, 50%, 0.7)");
});

describe("brightness", () => {
  test("percentage = false", () => {
    expect(CM.HSLAFrom(0, 0, 0).brightness()).toEqual(0);
    expect(CM.HSLAFrom(0, 0, 25.1).brightness()).toEqual(0.251);
    expect(CM.HSLAFrom(0, 0, 50.2).brightness()).toEqual(0.502);
    expect(CM.HSLAFrom(0, 0, 75.29).brightness()).toEqual(0.7529);
    expect(CM.HSLAFrom(0, 0, 100).brightness()).toEqual(1);
  });

  test("percentage = true", () => {
    expect(CM.HSLAFrom(0, 0, 0).brightness({ percentage: true })).toEqual(0);
    expect(CM.HSLAFrom(0, 0, 25.1).brightness({ percentage: true })).toEqual(25.1);
    expect(CM.HSLAFrom(0, 0, 50.2).brightness({ percentage: true })).toEqual(50.2);
    expect(CM.HSLAFrom(0, 0, 75.29).brightness({ percentage: true })).toEqual(75.29);
    expect(CM.HSLAFrom(0, 0, 100).brightness({ percentage: true })).toEqual(100);
  });
});

describe("luminance", () => {
  test("luminance = false", () => {
    expect(CM.HSLAFrom(0, 0, 0).luminance()).toEqual(0);
    expect(CM.HSLAFrom(0, 0, 25.1).luminance()).toEqual(0.0513);
    expect(CM.HSLAFrom(0, 0, 50.2).luminance()).toEqual(0.2159);
    expect(CM.HSLAFrom(0, 0, 75.29).luminance()).toEqual(0.5271);
    expect(CM.HSLAFrom(0, 0, 100).luminance()).toEqual(1);
  });

  test("luminance = true", () => {
    expect(CM.HSLAFrom(0, 0, 0).luminance({ percentage: true })).toEqual(0);
    expect(CM.HSLAFrom(0, 0, 25.1).luminance({ percentage: true })).toEqual(5.13);
    expect(CM.HSLAFrom(0, 0, 50.2).luminance({ percentage: true })).toEqual(21.59);
    expect(CM.HSLAFrom(0, 0, 75.29).luminance({ percentage: true })).toEqual(52.71);
    expect(CM.HSLAFrom(0, 0, 100).luminance({ percentage: true })).toEqual(100);
  });
});

describe("contrast", () => {
  test("ratio = false", () => {
    expect(CM.HSLAFrom(0, 0, 0).contrast()).toEqual(21);
    expect(CM.HSLAFrom(0, 0, 25.1).contrast()).toEqual(10.3653);
    expect(CM.HSLAFrom(0, 0, 50.2).contrast()).toEqual(3.9489);
    expect(CM.HSLAFrom(0, 0, 75.29).contrast()).toEqual(1.8194);
    expect(CM.HSLAFrom(0, 0, 100).contrast()).toEqual(1);
  });

  test("ratio = true", () => {
    expect(CM.HSLAFrom(0, 0, 0).contrast("0, 0, 100", { ratio: true })).toEqual("21.0000:1");
    expect(CM.HSLAFrom(0, 0, 25.1).contrast("0, 0, 100", { ratio: true })).toEqual("10.3653:1");
    expect(CM.HSLAFrom(0, 0, 50.2).contrast("0, 0, 100", { ratio: true })).toEqual("3.9489:1");
    expect(CM.HSLAFrom(0, 0, 75.29).contrast("0, 0, 100", { ratio: true })).toEqual("1.8194:1");
    expect(CM.HSLAFrom(0, 0, 100).contrast("0, 0, 100", { ratio: true })).toEqual("1.0000:1");
    expect(CM.HSLAFrom(0, 0, 100).contrast(CM.HSLAFrom(0, 0, 100), { ratio: true })).toEqual("1.0000:1");
  });
});

test("light/dark", () => {
  expect(CM.HSLAFrom(0, 0, 0).isLight()).toBeFalsy();
  expect(CM.HSLAFrom(0, 0, 0).isDark()).toBeTruthy();

  // boundary of brightness < 0.50
  expect(CM.HSLAFrom(0, 0, 49.9).isLight()).toBeFalsy();
  expect(CM.HSLAFrom(0, 0, 49.9).isDark()).toBeTruthy();

  // boundary of brightness >= 0.50
  expect(CM.HSLAFrom(0, 0, 50.1).isLight()).toBeTruthy();
  expect(CM.HSLAFrom(0, 0, 50.1).isDark()).toBeFalsy();

  expect(CM.HSLAFrom(0, 0, 100).isLight()).toBeTruthy();
  expect(CM.HSLAFrom(0, 0, 100).isDark()).toBeFalsy();
});

test("readableOn", () => {
  // Contrast checker: https://webaim.org/resources/contrastchecker/
  const blackColor = CM.HSLAFrom(0, 0, 0);

  // extremes (default color is white as bg)
  expect(CM.HSLAFrom(0, 0, 100).readableOn()).toBeFalsy();
  expect(blackColor.readableOn()).toBeTruthy();
  expect(blackColor.readableOn(blackColor)).toBeFalsy();

  // 3.0:1
  expect(blackColor.readableOn([0, 0, 34.9], { size: "large", ratio: "minimum" })).toBeFalsy();
  expect(blackColor.readableOn([0, 0, 35.3], { size: "large", ratio: "minimum" })).toBeTruthy();

  // 4.5:1
  expect(blackColor.readableOn([0, 0, 45.5])).toBeFalsy();
  expect(blackColor.readableOn([0, 0, 45.9])).toBeTruthy();
  expect(blackColor.readableOn([0, 0, 45.5], { size: "large", ratio: "enhanced" })).toBeFalsy();
  expect(blackColor.readableOn([0, 0, 45.9], { size: "large", ratio: "enhanced" })).toBeTruthy();

  // 7.0:1
  expect(blackColor.readableOn([0, 0, 58.0], { size: "body", ratio: "enhanced" })).toBeFalsy();
  expect(blackColor.readableOn([0, 0, 58.4], { size: "body", ratio: "enhanced" })).toBeTruthy();
});

test("equalTo", () => {
  expect(CM.HSLAFrom(0, 0, 100).equalTo()).toBeTruthy();
  expect(CM.HSLAFrom(0, 0, 100, 1).equalTo()).toBeTruthy();
  expect(CM.HSLAFrom(0, 0, 100).equalTo("0, 0, 100, 0.8")).toBeFalsy();
  expect(CM.HSLAFrom(0, 0, 100, 0.8).equalTo()).toBeFalsy();
  expect(CM.HSLAFrom(1, 0, 100, 1).equalTo()).toBeFalsy();
  expect(CM.HSLAFrom(0, 1, 100, 1).equalTo()).toBeFalsy();
  expect(CM.HSLAFrom(0, 0, 99, 1).equalTo()).toBeFalsy();
  expect(CM.HSLAFrom(0, 0, 99, 1).equalTo(CM.HSLAFrom(0, 0, 99, 1))).toBeTruthy();
});

describe("harmony", () => {
  const ogColor = "hsla(30, 50%, 50%, 1)";

  test("analogous", () => {
    const expected = ["hsla(0, 50%, 50%, 1.0)", "hsla(30, 50%, 50%, 1.0)", "hsla(60, 50%, 50%, 1.0)"];

    expect(
      CM.HSLAFrom(ogColor)
        .harmony()
        .map((c) => c.string())
    ).toStrictEqual(expected);

    expect(
      CM.HSLAFrom(ogColor)
        .harmony("analogous")
        .map((c) => c.string())
    ).toStrictEqual(expected);
  });

  test("complementary", () => {
    expect(
      CM.HSLAFrom(ogColor)
        .harmony("complementary")
        .map((c) => c.string())
    ).toStrictEqual(["hsla(30, 50%, 50%, 1.0)", "hsla(210, 50%, 50%, 1.0)"]);
  });

  test("split-complementary", () => {
    expect(
      CM.HSLAFrom(ogColor)
        .harmony("split-complementary")
        .map((c) => c.string())
    ).toStrictEqual(["hsla(30, 50%, 50%, 1.0)", "hsla(180, 50%, 50%, 1.0)", "hsla(240, 50%, 50%, 1.0)"]);
  });

  test("double-split-complementary", () => {
    expect(
      CM.HSLAFrom(ogColor)
        .harmony("double-split-complementary")
        .map((c) => c.string())
    ).toStrictEqual([
      "hsla(0, 50%, 50%, 1.0)",
      "hsla(30, 50%, 50%, 1.0)",
      "hsla(60, 50%, 50%, 1.0)",
      "hsla(180, 50%, 50%, 1.0)",
      "hsla(240, 50%, 50%, 1.0)"
    ]);
  });

  test("triad", () => {
    expect(
      CM.HSLAFrom(ogColor)
        .harmony("triad")
        .map((c) => c.string())
    ).toStrictEqual(["hsla(30, 50%, 50%, 1.0)", "hsla(150, 50%, 50%, 1.0)", "hsla(270, 50%, 50%, 1.0)"]);
  });

  test("rectangle", () => {
    expect(
      CM.HSLAFrom(ogColor)
        .harmony("rectangle")
        .map((c) => c.string())
    ).toStrictEqual([
      "hsla(30, 50%, 50%, 1.0)",
      "hsla(90, 50%, 50%, 1.0)",
      "hsla(210, 50%, 50%, 1.0)",
      "hsla(270, 50%, 50%, 1.0)"
    ]);
  });

  test("square", () => {
    expect(
      CM.HSLAFrom(ogColor)
        .harmony("square")
        .map((c) => c.string())
    ).toStrictEqual([
      "hsla(30, 50%, 50%, 1.0)",
      "hsla(120, 50%, 50%, 1.0)",
      "hsla(210, 50%, 50%, 1.0)",
      "hsla(300, 50%, 50%, 1.0)"
    ]);
  });

  describe("monochromatic", () => {
    test("tints", () => {
      expect(
        CM.HSLAFrom(ogColor)
          .harmony("monochromatic", { effect: "tints" })
          .map((c) => c.string())
      ).toStrictEqual([
        "hsla(30, 50%, 50%, 1.0)",
        "hsla(30, 50%, 60%, 1.0)",
        "hsla(30, 50%, 70%, 1.0)",
        "hsla(30, 50%, 80%, 1.0)",
        "hsla(30, 50%, 90%, 1.0)",
        "hsla(30, 50%, 100%, 1.0)"
      ]);
    });

    test("shades", () => {
      expect(
        CM.HSLAFrom(ogColor)
          .harmony("monochromatic", { effect: "shades" })
          .map((c) => c.string())
      ).toStrictEqual([
        "hsla(30, 50%, 50%, 1.0)",
        "hsla(30, 50%, 40%, 1.0)",
        "hsla(30, 50%, 30%, 1.0)",
        "hsla(30, 50%, 20%, 1.0)",
        "hsla(30, 50%, 10%, 1.0)",
        "hsla(30, 50%, 0%, 1.0)"
      ]);
    });

    test("tones", () => {
      expect(
        CM.HSLAFrom(ogColor)
          .harmony("monochromatic", { effect: "tones" })
          .map((c) => c.string())
      ).toStrictEqual([
        "hsla(30, 50%, 50%, 1.0)",
        "hsla(30, 40%, 50%, 1.0)",
        "hsla(30, 30%, 50%, 1.0)",
        "hsla(30, 20%, 50%, 1.0)",
        "hsla(30, 10%, 50%, 1.0)",
        "hsla(30, 0%, 50%, 1.0)"
      ]);
    });
  });
});

test("isCool/isWarm", () => {
  expect(CM.HSLAFrom(75, 100, 50, 1).isCool()).toBeTruthy();
  expect(CM.HSLAFrom(74.9, 100, 50, 1).isWarm()).toBeTruthy();
  expect(CM.HSLAFrom(255, 100, 50, 1).isWarm()).toBeTruthy();
  expect(CM.HSLAFrom(254.9, 100, 50, 1).isCool()).toBeTruthy();
  expect(CM.HSLAFrom(0, 100, 50, 1).isWarm()).toBeTruthy();
  expect(CM.HSLAFrom(180, 100, 50, 1).isCool()).toBeTruthy();
  expect(CM.HSLAFrom(180, 100, 50, 1).isWarm()).toBeFalsy();
});

test("closestCool/closestWarm", () => {
  expect(CM.HSLAFrom(75, 100, 50, 1).closestWarm().string()).toBe("hsla(74, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(254.9, 100, 50, 1).closestWarm().string()).toBe("hsla(255, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(0, 100, 50, 1).closestWarm().string()).toBe("hsla(0, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(120, 100, 50, 1).closestWarm().string()).toBe("hsla(74, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(180, 100, 50, 1).closestWarm().string()).toBe("hsla(255, 100%, 50%, 1.0)");

  expect(CM.HSLAFrom(74.9, 100, 50, 1).closestCool().string()).toBe("hsla(75, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(255.1, 100, 50, 1).closestCool().string()).toBe("hsla(254, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(180, 100, 50, 1).closestCool().string()).toBe("hsla(180, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(0, 100, 50, 1).closestCool().string()).toBe("hsla(75, 100%, 50%, 1.0)");
  expect(CM.HSLAFrom(300, 100, 50, 1).closestCool().string()).toBe("hsla(254, 100%, 50%, 1.0)");
});

test("isTinted/isShaded/isToned", () => {
  expect(CM.HSLAFrom(0, 100, 50.1, 1).isTinted()).toBeTruthy();
  expect(CM.HSLAFrom(0, 100, 50, 1).isTinted()).toBeFalsy();
  expect(CM.HSLAFrom(0, 100, 49.9, 1).isTinted()).toBeFalsy();
  expect(CM.HSLAFrom(0, 100, 49.9, 1).isShaded()).toBeTruthy();
  expect(CM.HSLAFrom(0, 100, 50, 1).isShaded()).toBeFalsy();
  expect(CM.HSLAFrom(0, 100, 50.1, 1).isShaded()).toBeFalsy();
  expect(CM.HSLAFrom(0, 99.9, 50, 1).isToned()).toBeTruthy();
  expect(CM.HSLAFrom(0, 100, 50, 1).isToned()).toBeFalsy();
});

test("isPureHue", () => {
  expect(CM.HSLAFrom(0, 100, 50, 1).isPureHue()).toMatchObject({ pure: true, reason: "N/A" });
  expect(CM.HSLAFrom(0, 100, 50, 1).isPureHue({ reason: false })).toBeTruthy();

  expect(CM.HSLAFrom(0, 100, 50.1, 1).isPureHue()).toMatchObject({ pure: false, reason: "tinted" });
  expect(CM.HSLAFrom(0, 100, 50.1, 1).isPureHue({ reason: false })).toBeFalsy();

  expect(CM.HSLAFrom(0, 100, 49.9, 1).isPureHue()).toMatchObject({ pure: false, reason: "shaded" });
  expect(CM.HSLAFrom(0, 100, 49.9, 1).isPureHue({ reason: false })).toBeFalsy();

  expect(CM.HSLAFrom(0, 99.9, 50, 1).isPureHue()).toMatchObject({ pure: false, reason: "toned" });
  expect(CM.HSLAFrom(0, 99.9, 50, 1).isPureHue({ reason: false })).toBeFalsy();
});

test("closestPureHue", () => {
  const pureHueColor = "hsla(120, 100%, 50%, 1.0)";
  expect(CM.HSLAFrom(120, 100, 50, 1).closestPureHue().string()).toBe(pureHueColor);
  expect(CM.HSLAFrom(120, 100, 50.1, 1).closestPureHue().string()).toBe(pureHueColor);
  expect(CM.HSLAFrom(120, 100, 49.9, 1).closestPureHue().string()).toBe(pureHueColor);
  expect(CM.HSLAFrom(120, 99.9, 50, 1).closestPureHue().string()).toBe(pureHueColor);
});
