import { BOUNDS } from "../src/enums/bounds";
import CM, { TStrArr } from "../src/index";
import HEXColors from "../src/models/hex";

let cm: HEXColors;

beforeEach(() => (cm = CM.HEXAFrom("66", "77", "88", "99")));

describe("object instantiation with overloaded helper", () => {
  const FULL_OPACITY = "#456789FF";
  const LOWER_OPACITY = "#456789AB";

  test("object", () => {
    expect(CM.HEXAFrom({ r: "45", g: "67", b: "89", a: "AB" }).string()).toBe(LOWER_OPACITY);
    expect(CM.HEXAFrom({ r: "45", g: "67", b: "89" }).string()).toBe(FULL_OPACITY);
  });

  test("array", () => {
    expect(CM.HEXAFrom(["45", "67", "89", "AB"]).string()).toBe(LOWER_OPACITY);
    expect(CM.HEXAFrom(["45", "67", "89"]).string()).toBe(FULL_OPACITY);
  });

  test("values", () => {
    expect(CM.HEXAFrom("45", "67", "89", "AB").string()).toBe(LOWER_OPACITY);
    expect(CM.HEXAFrom("45", "67", "89").string()).toBe(FULL_OPACITY);
  });

  test("string with just values", () => {
    expect(CM.HEXAFrom("45, 67, 89, AB").string()).toBe(LOWER_OPACITY);
    expect(CM.HEXAFrom("45, 67, 89").string()).toBe(FULL_OPACITY);
  });

  test("string with prefix(s)", () => {
    expect(CM.HEXAFrom("#456789").object).toMatchObject({ r: "45", g: "67", b: "89", a: "FF" });
    expect(CM.HEXAFrom("#456789AB").object).toMatchObject({ r: "45", g: "67", b: "89", a: "AB" });
    expect(CM.HEXAFrom("#456").object).toMatchObject({ r: "44", g: "55", b: "66", a: "FF" });
    expect(CM.HEXAFrom("#4567").object).toMatchObject({ r: "44", g: "55", b: "66", a: "77" });
    expect(CM.HEXAFrom("(45, 67, 89)").object).toMatchObject({ r: "45", g: "67", b: "89", a: "FF" });
    expect(CM.HEXAFrom("(45, 67, 89, AB)").object).toMatchObject({ r: "45", g: "67", b: "89", a: "AB" });
    expect(CM.HEXAFrom(FULL_OPACITY).object).toMatchObject({ r: "45", g: "67", b: "89", a: "FF" });
    expect(CM.HEXAFrom(LOWER_OPACITY).object).toMatchObject({ r: "45", g: "67", b: "89", a: "AB" });
  });

  it("handles invalid input by throwing errors when needed", () => {
    expect(CM.HEXAFrom("45, 67").object).toMatchObject({ r: "45", g: "67", b: "00", a: "FF" });
    expect(CM.HEXAFrom("45, 67, 89, AB, AB").object).toMatchObject({ r: "45", g: "67", b: "89", a: "AB" });
    expect(CM.HEXAFrom("#45").object).toMatchObject({ r: "44", g: "55", b: "00", a: "FF" }); // hex not long enough
    expect(CM.HEXAFrom("#").object).toMatchObject({ r: "00", g: "00", b: "00", a: "FF" }); // no hex provided
  });
});

describe("getters & setters", () => {
  test("object getter", () => expect(cm.object).toMatchObject({ r: "66", g: "77", b: "88", a: "99" }));

  test("object setter", () => {
    cm.object = { ...cm.object, r: "33" };
    expect(cm.string({ withAlpha: false })).toBe("#337788");
  });

  test("array getter", () => expect(cm.array).toEqual(["66", "77", "88", "99"]));

  test("array setter", () => {
    const currArr = cm.array;
    currArr[0] = "33";

    cm.array = currArr;
    expect(cm.string()).toBe("#33778899");

    cm.array = currArr.slice(0, 3) as TStrArr;
    expect(cm.string()).toBe("#337788FF");
  });

  test("format getter", () => expect(cm.format).toBe("hex"));
  test("red getter", () => expect(cm.red).toEqual("66"));
  test("green getter", () => expect(cm.green).toEqual("77"));
  test("blue getter", () => expect(cm.blue).toEqual("88"));
  test("alpha getter", () => expect(cm.alpha).toEqual("99"));
  test("hue getter", () => expect(cm.hue).toEqual(210));
  test("saturation getter", () => expect(+cm.saturation.toFixed(1)).toEqual(14.3));
  test("lightness getter", () => expect(+cm.lightness.toFixed(1)).toEqual(46.7));
});

describe("string formation", () => {
  test("without alpha", () => expect(cm.string({ withAlpha: false })).toBe("#667788"));
  test("with alpha", () => expect(cm.string()).toBe("#66778899"));
});

describe("name", () => {
  test("with alpha = 'FF'", () => expect(CM.HEXAFrom("#800000FF").name()).toBe("maroon"));
  test("with '00' < alpha < 'FF'", () => expect(CM.HEXAFrom("#80000077)").name()).toBe("maroon (with opacity)"));
  test("with alpha = '00'", () => expect(CM.HEXAFrom("#80000000").name()).toBe("transparent"));
  test("undefined", () => expect(CM.HEXAFrom("#800001").name()).toBe("undefined"));
});

describe("changeValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel    | value   | expected
      ${"red"}   | ${"55"} | ${"#55778899"}
      ${"green"} | ${"55"} | ${"#66558899"}
      ${"blue"}  | ${"55"} | ${"#66775599"}
      ${"alpha"} | ${"55"} | ${"#66778855"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value   | expected
      ${"red"}   | ${"FG"} | ${"#FF778899"}
      ${"red"}   | ${"0"}  | ${"#00778899"}
      ${"green"} | ${"FG"} | ${"#66FF8899"}
      ${"green"} | ${"0"}  | ${"#66008899"}
      ${"blue"}  | ${"FG"} | ${"#6677FF99"}
      ${"blue"}  | ${"0"}  | ${"#66770099"}
      ${"alpha"} | ${"FG"} | ${"#667788FF"}
      ${"alpha"} | ${"0"}  | ${"#66778800"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.changeValueTo(channel, value).string()).toBe(expected);
    });
  });
});

describe("changeValueBy", () => {
  describe("no clamping", () => {
    test.each`
      channel    | type     | expected
      ${"red"}   | ${"add"} | ${"#78778899"}
      ${"red"}   | ${"sub"} | ${"#54778899"}
      ${"green"} | ${"add"} | ${"#66898899"}
      ${"green"} | ${"sub"} | ${"#66658899"}
      ${"blue"}  | ${"add"} | ${"#66779A99"}
      ${"blue"}  | ${"sub"} | ${"#66777699"}
      ${"alpha"} | ${"add"} | ${"#667788AB"}
      ${"alpha"} | ${"sub"} | ${"#66778887"}
    `("change $channel channel → type $type", ({ channel, type, expected }) => {
      expect(cm.changeValueBy(channel, "12", type).string()).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | type     | expected
      ${"red"}   | ${"add"} | ${"#FF778899"}
      ${"red"}   | ${"sub"} | ${"#00778899"}
      ${"green"} | ${"add"} | ${"#66FF8899"}
      ${"green"} | ${"sub"} | ${"#66008899"}
      ${"blue"}  | ${"add"} | ${"#6677FF99"}
      ${"blue"}  | ${"sub"} | ${"#66770099"}
      ${"alpha"} | ${"add"} | ${"#667788FF"}
      ${"alpha"} | ${"sub"} | ${"#66778800"}
    `("change $channel channel - type: $type", ({ channel, type, expected }) => {
      expect(cm.changeValueBy(channel, "FF", type).string()).toBe(expected);
    });
  });
});

describe("alpha", () => {
  test("alphaTo", () => expect(cm.alphaTo("F1").string()).toBe("#667788F1"));

  test("alphaBy", () => {
    expect(cm.alphaBy("35", "add").string()).toBe("#667788CE");
    expect(cm.alphaBy("73", "sub").string()).toBe("#66778826");
  });
});

describe("invert", () => {
  test("include alpha", () => expect(cm.invert().string()).toBe("#99887766"));
  test("exclude alpha", () => expect(cm.invert({ includeAlpha: false }).string()).toBe("#99887799"));
});

test("saturateBy/desaturateBy", () => {
  expect(cm.saturateBy("21").string()).toBe("#56779799"); // 57779899
  expect(cm.desaturateBy("21").string()).toBe("#75767899"); // 75777999
});

test("lighterBy/darkerBy", () => {
  expect(cm.lighterBy("21").string()).toBe("#8998A699"); // 8998A799
  expect(cm.darkerBy("21").string()).toBe("#49556299"); // 4A566299
});

test("grayscale", () => expect(cm.grayscale().string()).toBe("#76767699")); // 77777799

describe("rotate", () => {
  test("value > 0", () => expect(cm.rotate(120).string()).toBe("#87657699")); // 88667799
  test("value = 0", () => expect(cm.rotate(0).string()).toBe("#65768799")); // 66778899
  test("value < 0", () => expect(cm.rotate(-120).string()).toBe("#76876599")); // 77886699
});

test("closestWebSafe", () => {
  // works if RGBA.closestWebSafe works, so will only check a few cases
  expect(CM.HEXAFrom("#FA0303FD").closestWebSafe().string()).toBe("#FF0000FD");
  expect(CM.HEXAFrom("#FAFA03FD").closestWebSafe().string()).toBe("#FFFF00FD");
  expect(CM.HEXAFrom("#03FA03FD").closestWebSafe().string()).toBe("#00FF00FD");
  expect(CM.HEXAFrom("#03FAFAFD").closestWebSafe().string()).toBe("#00FFFFFD");
  expect(CM.HEXAFrom("#0303FAFD").closestWebSafe().string()).toBe("#0000FFFD");
  expect(CM.HEXAFrom("#FA03FAFD").closestWebSafe().string()).toBe("#FF00FFFD");
  expect(CM.HEXAFrom("#030303FD").closestWebSafe().string()).toBe("#000000FD");
  expect(CM.HEXAFrom("#FAFAFAFD").closestWebSafe().string()).toBe("#FFFFFFFD");
});

describe("brightness", () => {
  test("percentage = false", () => {
    expect(CM.HEXAFrom("#000000FF").brightness()).toEqual(0);
    expect(CM.HEXAFrom("#404040FF").brightness()).toEqual(0.251);
    expect(CM.HEXAFrom("#808080FF").brightness()).toEqual(0.502);
    expect(CM.HEXAFrom("#C0C0C0FF").brightness()).toEqual(0.7529);
    expect(CM.HEXAFrom("#FFFFFFFF").brightness()).toEqual(1);
  });

  test("percentage = true", () => {
    expect(CM.HEXAFrom("#000000FF").brightness({ percentage: true })).toEqual(0);
    expect(CM.HEXAFrom("#404040FF").brightness({ percentage: true })).toEqual(25.1);
    expect(CM.HEXAFrom("#808080FF").brightness({ percentage: true })).toEqual(50.2);
    expect(CM.HEXAFrom("#C0C0C0FF").brightness({ percentage: true })).toEqual(75.29);
    expect(CM.HEXAFrom("#FFFFFFFF").brightness({ percentage: true })).toEqual(100);
  });
});

describe("luminance", () => {
  test("luminance = false", () => {
    expect(CM.HEXAFrom("#000000FF").luminance()).toEqual(0);
    expect(CM.HEXAFrom("#404040FF").luminance()).toEqual(0.0513);
    expect(CM.HEXAFrom("#808080FF").luminance()).toEqual(0.2159);
    expect(CM.HEXAFrom("#C0C0C0FF").luminance()).toEqual(0.5271);
    expect(CM.HEXAFrom("#FFFFFFFF").luminance()).toEqual(1);
  });

  test("luminance = true", () => {
    expect(CM.HEXAFrom("#000000FF").luminance({ percentage: true })).toEqual(0);
    expect(CM.HEXAFrom("#404040FF").luminance({ percentage: true })).toEqual(5.13);
    expect(CM.HEXAFrom("#808080FF").luminance({ percentage: true })).toEqual(21.59);
    expect(CM.HEXAFrom("#C0C0C0FF").luminance({ percentage: true })).toEqual(52.71);
    expect(CM.HEXAFrom("#FFFFFFFF").luminance({ percentage: true })).toEqual(100);
  });
});

describe("contrast", () => {
  test("ratio = false", () => {
    expect(CM.HEXAFrom("#000000FF").contrast()).toEqual(21);
    expect(CM.HEXAFrom("#404040FF").contrast()).toEqual(10.3653);
    expect(CM.HEXAFrom("#808080FF").contrast()).toEqual(3.9489);
    expect(CM.HEXAFrom("#C0C0C0FF").contrast()).toEqual(1.8194);
    expect(CM.HEXAFrom("#FFFFFFFF").contrast()).toEqual(1);
  });

  test("ratio = true", () => {
    const whiteColor = CM.HEXAFrom("#FFFFFFFF");
    expect(CM.HEXAFrom("#000000FF").contrast(whiteColor, { ratio: true })).toBe("21.0000:1");
    expect(CM.HEXAFrom("#404040FF").contrast(whiteColor, { ratio: true })).toEqual("10.3653:1");
    expect(CM.HEXAFrom("#808080FF").contrast(whiteColor, { ratio: true })).toEqual("3.9489:1");
    expect(CM.HEXAFrom("#C0C0C0FF").contrast(whiteColor, { ratio: true })).toEqual("1.8194:1");
    expect(CM.HEXAFrom("#FFFFFFFF").contrast(whiteColor, { ratio: true })).toEqual("1.0000:1");
    expect(CM.HEXAFrom("#FFFFFFFF").contrast(whiteColor, { ratio: true })).toEqual("1.0000:1");
  });
});

test("light/dark", () => {
  expect(CM.HEXAFrom("#000000FF").isLight()).toBeFalsy();
  expect(CM.HEXAFrom("#000000FF").isDark()).toBeTruthy();

  // boundary of brightness < 0.50
  expect(CM.HEXAFrom("#777777FF").isLight()).toBeFalsy();
  expect(CM.HEXAFrom("#777777FF").isDark()).toBeTruthy();

  // boundary of brightness >= 0.50
  expect(CM.HEXAFrom("#808080FF").isLight()).toBeTruthy();
  expect(CM.HEXAFrom("#808080FF").isDark()).toBeFalsy();

  expect(CM.HEXAFrom("#FFFFFFFF").isLight()).toBeTruthy();
  expect(CM.HEXAFrom("#FFFFFFFF").isDark()).toBeFalsy();
});

test("readableOn", () => {
  // Contrast checker: https://webaim.org/resources/contrastchecker/
  const blackColor = CM.HEXAFrom("#000000FF");

  // extremes (default color is white as bg)
  expect(CM.HEXAFrom("#FFFFFFFF").readableOn()).toBeFalsy();
  expect(blackColor.readableOn()).toBeTruthy();
  expect(blackColor.readableOn(blackColor)).toBeFalsy();

  // 3.0:1
  expect(blackColor.readableOn("#595959FF", { size: "large", ratio: "minimum" })).toBeFalsy();
  expect(blackColor.readableOn("#5A5A5AFF", { size: "large", ratio: "minimum" })).toBeTruthy();

  // 4.5:1
  expect(blackColor.readableOn("##747474")).toBeFalsy();
  expect(blackColor.readableOn("#757575")).toBeTruthy();
  expect(blackColor.readableOn("##747474", { size: "large", ratio: "enhanced" })).toBeFalsy();
  expect(blackColor.readableOn("#757575", { size: "large", ratio: "enhanced" })).toBeTruthy();

  // 7.0:1
  expect(blackColor.readableOn("#949494", { size: "body", ratio: "enhanced" })).toBeFalsy();
  expect(blackColor.readableOn("#959595", { size: "body", ratio: "enhanced" })).toBeTruthy();
});

test("equalTo", () => {
  expect(CM.HEXAFrom("#FFFFFF").equalTo()).toBeTruthy();
  expect(CM.HEXAFrom("#FFFFFFFF").equalTo()).toBeTruthy();
  expect(CM.HEXAFrom("#FFFFFF").equalTo("#FFFFFFDC")).toBeFalsy();
  expect(CM.HEXAFrom("#FFFFFFDC").equalTo()).toBeFalsy();
  expect(CM.HEXAFrom("#00FFFFFF").equalTo()).toBeFalsy();
  expect(CM.HEXAFrom("#FF00FFFF").equalTo()).toBeFalsy();
  expect(CM.HEXAFrom("#FFFF00FF").equalTo()).toBeFalsy();
  expect(CM.HEXAFrom("#00FF00FF").equalTo(CM.HEXAFrom("#00FF00FF"))).toBeTruthy();
});

test("random generation", () => {
  jest
    .spyOn(global.Math, "random")
    .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // red   → 222
    .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // green → 222
    .mockReturnValueOnce(222 / BOUNDS.RGB_CHANNEL) // blue  → 222
    .mockReturnValueOnce(0.5); // alpha → 0.5

  expect(CM.random().hex().string()).toBe("#DEDEDE80");
});

test("fromName", () => expect(CM.fromName("alice blue").hex().string()).toBe("#F0F8FFFF"));
