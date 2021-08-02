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

  it("handles invalid input by returning a default color 'black' or a mixture with valid input", () => {
    expect(CM.RGBAFrom("128, 64").object).toMatchObject({ r: 128, g: 64, b: 0, a: 1 });
    expect(CM.RGBAFrom("128, 64, 32, 5, 5").object).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
    expect(CM.RGBAFrom({ r: 128, g: 64, b: 32, a: 5 }).object).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
    expect(CM.RGBAFrom([128, 64, 32, 5]).object).toMatchObject({ r: 128, g: 64, b: 32, a: 1 });
    expect(CM.RGBAFrom("blue").object).toMatchObject({ r: 0, g: 0, b: 0, a: 1 });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(CM.RGBAFrom("blue", 64, 32).object).toMatchObject({ r: 0, g: 64, b: 32, a: 1 });

    expect(new RGBColors().object).toMatchObject({ r: 0, g: 0, b: 0, a: 1 });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(CM.RGBAFrom().object).toMatchObject({ r: 0, g: 0, b: 0, a: 1 });
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
  test("red getter", () => expect(cm.red).toEqual(128));
  test("green getter", () => expect(cm.green).toEqual(64));
  test("blue getter", () => expect(cm.blue).toEqual(32));
  test("alpha getter", () => expect(cm.alpha).toEqual(0.7));
  test("hue getter", () => expect(cm.hue).toEqual(20));
  test("saturation getter", () => expect(cm.saturation).toEqual(60));
  test("lightness getter", () => expect(+cm.lightness.toFixed(1)).toEqual(31.4));
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
  test("exact", () => expect(CM.RGBAFrom("rgb(1, 0, 0)").name({ exact: false })).toBe("black"));
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

describe("hue", () => {
  test("hueTo", () => {
    expect(cm.hueTo(240).string()).toBe("rgba(32, 32, 128, 0.7)");
    expect(cm.hueTo("blue").string()).toBe("rgba(32, 32, 128, 0.7)");
  });

  test("hueBy", () => {
    expect(cm.hueBy(30).string()).toBe("rgba(128, 112, 32, 0.7)");
    expect(cm.hueBy(-10).string()).toBe("rgba(128, 48, 32, 0.7)");
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

describe("brightness", () => {
  test("percentage = false", () => {
    expect(CM.RGBAFrom(0, 0, 0).brightness()).toEqual(0);
    expect(CM.RGBAFrom(64, 64, 64).brightness()).toEqual(0.251);
    expect(CM.RGBAFrom(128, 128, 128).brightness()).toEqual(0.502);
    expect(CM.RGBAFrom(192, 192, 192).brightness()).toEqual(0.7529);
    expect(CM.RGBAFrom(255, 255, 255).brightness()).toEqual(1);
  });

  test("percentage = true", () => {
    expect(CM.RGBAFrom(0, 0, 0).brightness({ percentage: true })).toEqual(0);
    expect(CM.RGBAFrom(64, 64, 64).brightness({ percentage: true })).toEqual(25.1);
    expect(CM.RGBAFrom(128, 128, 128).brightness({ percentage: true })).toEqual(50.2);
    expect(CM.RGBAFrom(192, 192, 192).brightness({ percentage: true })).toEqual(75.29);
    expect(CM.RGBAFrom(255, 255, 255).brightness({ percentage: true })).toEqual(100);
  });
});

describe("luminance", () => {
  test("luminance = false", () => {
    expect(CM.RGBAFrom(0, 0, 0).luminance()).toEqual(0);
    expect(CM.RGBAFrom(64, 64, 64).luminance()).toEqual(0.0513);
    expect(CM.RGBAFrom(128, 128, 128).luminance()).toEqual(0.2159);
    expect(CM.RGBAFrom(192, 192, 192).luminance()).toEqual(0.5271);
    expect(CM.RGBAFrom(255, 255, 255).luminance()).toEqual(1);
  });

  test("luminance = true", () => {
    expect(CM.RGBAFrom(0, 0, 0).luminance({ percentage: true })).toEqual(0);
    expect(CM.RGBAFrom(64, 64, 64).luminance({ percentage: true })).toEqual(5.13);
    expect(CM.RGBAFrom(128, 128, 128).luminance({ percentage: true })).toEqual(21.59);
    expect(CM.RGBAFrom(192, 192, 192).luminance({ percentage: true })).toEqual(52.71);
    expect(CM.RGBAFrom(255, 255, 255).luminance({ percentage: true })).toEqual(100);
  });
});

describe("contrast", () => {
  test("ratio = false", () => {
    expect(CM.RGBAFrom(0, 0, 0).contrast()).toEqual(21);
    expect(CM.RGBAFrom(64, 64, 64).contrast()).toEqual(10.3653);
    expect(CM.RGBAFrom(128, 128, 128).contrast()).toEqual(3.9489);
    expect(CM.RGBAFrom(192, 192, 192).contrast()).toEqual(1.8194);
    expect(CM.RGBAFrom(255, 255, 255).contrast()).toEqual(1);
  });

  test("ratio = true", () => {
    expect(CM.RGBAFrom(0, 0, 0).contrast("255, 255, 255", { ratio: true })).toEqual("21.0000:1");
    expect(CM.RGBAFrom(64, 64, 64).contrast("255, 255, 255", { ratio: true })).toEqual("10.3653:1");
    expect(CM.RGBAFrom(128, 128, 128).contrast("255, 255, 255", { ratio: true })).toEqual("3.9489:1");
    expect(CM.RGBAFrom(192, 192, 192).contrast("255, 255, 255", { ratio: true })).toEqual("1.8194:1");
    expect(CM.RGBAFrom(255, 255, 255).contrast("255, 255, 255", { ratio: true })).toEqual("1.0000:1");
  });
});

test("light/dark", () => {
  expect(CM.RGBAFrom(0, 0, 0).isLight()).toBeFalsy();
  expect(CM.RGBAFrom(0, 0, 0).isDark()).toBeTruthy();

  // boundary of brightness < 0.50
  expect(CM.RGBAFrom(127, 127, 127).isLight()).toBeFalsy();
  expect(CM.RGBAFrom(127, 127, 127).isDark()).toBeTruthy();

  // boundary of brightness >= 0.50
  expect(CM.RGBAFrom(128, 128, 128).isLight()).toBeTruthy();
  expect(CM.RGBAFrom(128, 128, 128).isDark()).toBeFalsy();

  expect(CM.RGBAFrom(255, 255, 255).isLight()).toBeTruthy();
  expect(CM.RGBAFrom(255, 255, 255).isDark()).toBeFalsy();
});

test("readableOn", () => {
  // Contrast checker: https://webaim.org/resources/contrastchecker/
  const blackColor = CM.RGBAFrom(0, 0, 0);

  // extremes
  expect(CM.RGBAFrom(255, 255, 255).readableOn()).toBeFalsy();
  expect(blackColor.readableOn()).toBeTruthy();

  // 3.0:1
  expect(blackColor.readableOn("89, 89, 89", { size: "large", ratio: "minimum" })).toBeFalsy();
  expect(blackColor.readableOn("90, 90, 90", { size: "large", ratio: "minimum" })).toBeTruthy();

  // 4.5:1
  expect(blackColor.readableOn("116, 116, 116")).toBeFalsy();
  expect(blackColor.readableOn("117, 117, 117")).toBeTruthy();
  expect(blackColor.readableOn("116, 116, 116", { size: "large", ratio: "enhanced" })).toBeFalsy();
  expect(blackColor.readableOn("117, 117, 117", { size: "large", ratio: "enhanced" })).toBeTruthy();

  // 7.0:1
  expect(blackColor.readableOn("148, 148, 148", { size: "body", ratio: "enhanced" })).toBeFalsy();
  expect(blackColor.readableOn("149, 149, 149", { size: "body", ratio: "enhanced" })).toBeTruthy();
});

test("equalTo", () => {
  expect(CM.RGBAFrom(255, 255, 255).equalTo()).toBeTruthy();
  expect(CM.RGBAFrom(255, 255, 255, 1).equalTo()).toBeTruthy();
  expect(CM.RGBAFrom(255, 255, 255).equalTo("255, 255, 255, 0.8")).toBeFalsy();
  expect(CM.RGBAFrom(255, 255, 255, 0.8).equalTo()).toBeFalsy();
  expect(CM.RGBAFrom(0, 255, 255, 1).equalTo()).toBeFalsy();
  expect(CM.RGBAFrom(255, 0, 255, 1).equalTo()).toBeFalsy();
  expect(CM.RGBAFrom(255, 255, 0, 1).equalTo()).toBeFalsy();
  expect(CM.RGBAFrom(255, 255, 0, 1).equalTo(CM.RGBAFrom(255, 255, 0))).toBeTruthy();
});

describe("harmony", () => {
  const ogColor = "rgba(143, 239, 239, 1)";

  test("analogous", () => {
    const expected = ["rgba(143, 239, 191, 1.0)", "rgba(143, 239, 239, 1.0)", "rgba(143, 191, 239, 1.0)"];
    expect(
      CM.RGBAFrom(ogColor)
        .harmony()
        .map((c) => c.string())
    ).toStrictEqual(expected);

    expect(
      CM.RGBAFrom(ogColor)
        .harmony("analogous")
        .map((c) => c.string())
    ).toStrictEqual(expected);
  });

  test("complementary", () => {
    expect(
      CM.RGBAFrom(ogColor)
        .harmony("complementary")
        .map((c) => c.string())
    ).toStrictEqual(["rgba(143, 239, 239, 1.0)", "rgba(239, 143, 143, 1.0)"]);
  });

  test("split-complementary", () => {
    expect(
      CM.RGBAFrom(ogColor)
        .harmony("split-complementary")
        .map((c) => c.string())
    ).toStrictEqual(["rgba(143, 239, 239, 1.0)", "rgba(239, 143, 191, 1.0)", "rgba(239, 191, 143, 1.0)"]);
  });

  test("double-split-complementary", () => {
    expect(
      CM.RGBAFrom(ogColor)
        .harmony("double-split-complementary")
        .map((c) => c.string())
    ).toStrictEqual([
      "rgba(143, 239, 191, 1.0)",
      "rgba(143, 239, 239, 1.0)",
      "rgba(143, 191, 239, 1.0)",
      "rgba(239, 143, 191, 1.0)",
      "rgba(239, 191, 143, 1.0)"
    ]);
  });

  test("triad", () => {
    expect(
      CM.RGBAFrom(ogColor)
        .harmony("triad")
        .map((c) => c.string())
    ).toStrictEqual(["rgba(143, 239, 239, 1.0)", "rgba(239, 143, 239, 1.0)", "rgba(239, 239, 143, 1.0)"]);
  });

  test("rectangle", () => {
    expect(
      CM.RGBAFrom(ogColor)
        .harmony("rectangle")
        .map((c) => c.string())
    ).toStrictEqual([
      "rgba(143, 239, 239, 1.0)",
      "rgba(143, 143, 239, 1.0)",
      "rgba(239, 143, 143, 1.0)",
      "rgba(239, 239, 143, 1.0)"
    ]);
  });

  test("square", () => {
    expect(
      CM.RGBAFrom(ogColor)
        .harmony("square")
        .map((c) => c.string())
    ).toStrictEqual([
      "rgba(143, 239, 239, 1.0)",
      "rgba(191, 143, 239, 1.0)",
      "rgba(239, 143, 143, 1.0)",
      "rgba(191, 239, 143, 1.0)"
    ]);
  });

  describe("monochromatic", () => {
    test("tints", () => {
      expect(
        CM.RGBAFrom(ogColor)
          .harmony("monochromatic", { effect: "tints" })
          .map((c) => c.string())
      ).toStrictEqual([
        "rgba(143, 239, 239, 1.0)",
        "rgba(165, 242, 242, 1.0)",
        "rgba(188, 245, 245, 1.0)",
        "rgba(210, 249, 249, 1.0)",
        "rgba(233, 252, 252, 1.0)",
        "rgba(255, 255, 255, 1.0)"
      ]);
    });

    test("shades", () => {
      expect(
        CM.RGBAFrom(ogColor)
          .harmony("monochromatic", { effect: "shades" })
          .map((c) => c.string())
      ).toStrictEqual([
        "rgba(143, 239, 239, 1.0)",
        "rgba(76, 229, 229, 1.0)",
        "rgba(29, 201, 201, 1.0)",
        "rgba(19, 134, 134, 1.0)",
        "rgba(10, 67, 67, 1.0)",
        "rgba(0, 0, 0, 1.0)"
      ]);
    });

    test("tones", () => {
      expect(
        CM.RGBAFrom(ogColor)
          .harmony("monochromatic", { effect: "tones" })
          .map((c) => c.string())
      ).toStrictEqual([
        "rgba(143, 239, 239, 1.0)",
        "rgba(153, 229, 229, 1.0)",
        "rgba(162, 220, 220, 1.0)",
        "rgba(172, 210, 210, 1.0)",
        "rgba(181, 201, 201, 1.0)",
        "rgba(191, 191, 191, 1.0)"
      ]);
    });
  });
});

test("isCool/isWarm", () => {
  expect(CM.RGBAFrom(95, 64, 191, 1).isCool()).toBeTruthy();
  expect(CM.RGBAFrom(96, 64, 191, 1).isWarm()).toBeTruthy();
  expect(CM.RGBAFrom(191, 64, 64, 1).isWarm()).toBeTruthy();
  expect(CM.RGBAFrom(64, 191, 191, 1).isCool()).toBeTruthy();
  expect(CM.RGBAFrom(160, 191, 64, 1).isWarm()).toBeTruthy();
  expect(CM.RGBAFrom(159, 191, 64, 1).isCool()).toBeTruthy();
  expect(CM.RGBAFrom(159, 191, 64, 1).isWarm()).toBeFalsy();
  expect(CM.RGBAFrom(255, 255, 255, 1).isWarm()).toBeTruthy();
});

test("closestCool/closestWarm", () => {
  expect(CM.RGBAFrom(191, 255, 0, 1).closestWarm().string()).toBe("rgba(195, 255, 0, 1.0)");
  expect(CM.RGBAFrom(63, 0, 255, 1).closestWarm().string()).toBe("rgba(64, 0, 255, 1.0)");
  expect(CM.RGBAFrom(0, 0, 255, 1).closestWarm().string()).toBe("rgba(64, 0, 255, 1.0)");
  expect(CM.RGBAFrom(255, 0, 0, 1).closestWarm().string()).toBe("rgba(255, 0, 0, 1.0)");

  expect(CM.RGBAFrom(191, 255, 0, 1).closestCool().string()).toBe("rgba(191, 255, 0, 1.0)");
  expect(CM.RGBAFrom(63, 0, 255, 1).closestCool().string()).toBe("rgba(63, 0, 255, 1.0)");
  expect(CM.RGBAFrom(255, 0, 0, 1).closestCool().string()).toBe("rgba(191, 255, 0, 1.0)");
  expect(CM.RGBAFrom(0, 0, 255, 1).closestCool().string()).toBe("rgba(0, 0, 255, 1.0)");
});

test("isTinted/isShaded/isToned", () => {
  expect(CM.RGBAFrom(107, 191, 65, 1).isTinted()).toBeTruthy();
  expect(CM.RGBAFrom(107, 191, 64, 1).isTinted()).toBeFalsy();
  expect(CM.RGBAFrom(107, 191, 63, 1).isTinted()).toBeFalsy();
  expect(CM.RGBAFrom(107, 191, 63, 1).isShaded()).toBeTruthy();
  expect(CM.RGBAFrom(107, 192, 63, 1).isShaded()).toBeFalsy();
  expect(CM.RGBAFrom(107, 191, 65, 1).isShaded()).toBeFalsy();
  expect(CM.RGBAFrom(92, 254.9, 10, 1).isToned()).toBeTruthy();
  expect(CM.RGBAFrom(85, 255, 0, 1).isToned()).toBeFalsy();
});

test("isPureHue", () => {
  expect(CM.RGBAFrom(63, 0, 255, 1).isPureHue()).toMatchObject({ pure: true, reason: "N/A" });
  expect(CM.RGBAFrom(63, 0, 255, 1).isPureHue({ reason: false })).toBeTruthy();

  expect(CM.RGBAFrom(68, 5, 255, 1).isPureHue()).toMatchObject({ pure: false, reason: "tinted" });
  expect(CM.RGBAFrom(68, 5, 255, 1).isPureHue({ reason: false })).toBeFalsy();

  expect(CM.RGBAFrom(62, 0, 250, 1).isPureHue()).toMatchObject({ pure: false, reason: "shaded" });
  expect(CM.RGBAFrom(62, 0, 250, 1).isPureHue({ reason: false })).toBeFalsy();

  expect(CM.RGBAFrom(64, 1, 254, 1).isPureHue()).toMatchObject({ pure: false, reason: "toned" });
  expect(CM.RGBAFrom(64, 1, 254, 1).isPureHue({ reason: false })).toBeFalsy();
});

test("closestPureHue", () => {
  const precision: TNumArr = [1, 0, 0, 1];
  expect(CM.RGBAFrom(63, 0, 255, 1).closestPureHue().string({ precision })).toBe("rgba(63.0, 0, 255, 1.0)");
  expect(CM.RGBAFrom(68, 5, 255, 1).closestPureHue().string({ precision })).toBe("rgba(64.3, 0, 255, 1.0)");
  expect(CM.RGBAFrom(62, 0, 250, 1).closestPureHue().string({ precision })).toBe("rgba(63.2, 0, 255, 1.0)");
  expect(CM.RGBAFrom(64, 1, 254, 1).closestPureHue().string({ precision })).toBe("rgba(63.5, 0, 255, 1.0)");
});
