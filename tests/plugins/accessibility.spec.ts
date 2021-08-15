import CM from "../../src/index";
import { extendPlugins } from "../../src";
import A11yPlugin from "../../src/plugins/accessibility";

extendPlugins([A11yPlugin]);

const colorL0 = CM("hsl(0, 0%, 0%)");
const colorL25 = CM("hsl(0, 0%, 25.1%)");
const colorL49 = CM("hsl(0, 0%, 49.8%)");
const colorL50 = CM("hsl(0, 0%, 50.2%)");
const colorL75 = CM("hsl(0, 0%, 75.29%)");
const colorL100 = CM("hsl(0, 0%, 100%)");

describe("brightness", () => {
  test("percentage = false", () => {
    expect(colorL0.brightness()).toEqual(0);
    expect(colorL25.brightness()).toEqual(0.251);
    expect(colorL50.brightness()).toEqual(0.502);
    expect(colorL75.brightness()).toEqual(0.7529);
    expect(colorL100.brightness()).toEqual(1);
  });

  test("percentage = true", () => {
    expect(colorL0.brightness({ percentage: true })).toEqual(0);
    expect(colorL25.brightness({ percentage: true })).toEqual(25.1);
    expect(colorL50.brightness({ percentage: true })).toEqual(50.2);
    expect(colorL75.brightness({ percentage: true })).toEqual(75.29);
    expect(colorL100.brightness({ percentage: true })).toEqual(100);
  });
});

describe("luminance", () => {
  test("luminance = false", () => {
    expect(colorL0.luminance()).toEqual(0);
    expect(colorL25.luminance()).toEqual(0.0513);
    expect(colorL50.luminance()).toEqual(0.2159);
    expect(colorL75.luminance()).toEqual(0.5271);
    expect(colorL100.luminance()).toEqual(1);
  });

  test("luminance = true", () => {
    expect(colorL0.luminance({ percentage: true })).toEqual(0);
    expect(colorL25.luminance({ percentage: true })).toEqual(5.13);
    expect(colorL50.luminance({ percentage: true })).toEqual(21.59);
    expect(colorL75.luminance({ percentage: true })).toEqual(52.71);
    expect(colorL100.luminance({ percentage: true })).toEqual(100);
  });
});

describe("contrast", () => {
  test("ratio = false", () => {
    expect(colorL0.contrast()).toEqual(21);
    expect(colorL25.contrast()).toEqual(10.3653);
    expect(colorL50.contrast()).toEqual(3.9489);
    expect(colorL75.contrast()).toEqual(1.8194);
    expect(colorL100.contrast()).toEqual(1);
    expect(colorL100.contrast({ bgColor: colorL100 })).toEqual(1);
  });

  test("ratio = true", () => {
    expect(colorL0.contrast({ ratio: true })).toEqual("21.0000:1");
    expect(colorL25.contrast({ ratio: true })).toEqual("10.3653:1");
    expect(colorL50.contrast({ ratio: true })).toEqual("3.9489:1");
    expect(colorL75.contrast({ ratio: true })).toEqual("1.8194:1");
    expect(colorL100.contrast({ ratio: true })).toEqual("1.0000:1");
  });
});

test("light/dark", () => {
  expect(colorL0.isLight()).toBeFalsy();
  expect(colorL0.isDark()).toBeTruthy();

  // boundary of brightness < 0.50
  expect(colorL49.isLight()).toBeFalsy();
  expect(colorL49.isDark()).toBeTruthy();

  // boundary of brightness >= 0.50
  expect(colorL50.isLight()).toBeTruthy();
  expect(colorL50.isDark()).toBeFalsy();

  expect(colorL100.isLight()).toBeTruthy();
  expect(colorL100.isDark()).toBeFalsy();
});

describe("readableOn", () => {
  // Contrast checker: https://webaim.org/resources/contrastchecker/

  test("extremes", () => {
    // default color is white as bg
    expect(colorL100.readableOn()).toBeFalsy(); // white on white
    expect(colorL100.readableOn({ bgColor: colorL0 })).toBeTruthy(); // white on black
    expect(colorL0.readableOn()).toBeTruthy(); // black on white
    expect(colorL0.readableOn({ bgColor: colorL0 })).toBeFalsy(); // black on black
  });

  test("3.0:1", () => {
    expect(colorL100.readableOn({ bgColor: CM("#949494FF"), size: "large", ratio: "minimum" })).toBeTruthy();
    expect(colorL100.readableOn({ bgColor: CM("#959595FF"), size: "large", ratio: "minimum" })).toBeFalsy();
  });

  test("4.5:1", () => {
    expect(colorL100.readableOn({ bgColor: CM("#777F") })).toBeFalsy();
    expect(colorL100.readableOn({ bgColor: CM("#767676FF") })).toBeTruthy();
    expect(colorL100.readableOn({ bgColor: CM("#777F"), size: "large", ratio: "enhanced" })).toBeFalsy();
    expect(colorL100.readableOn({ bgColor: CM("#767676FF"), size: "large", ratio: "enhanced" })).toBeTruthy();
  });

  test("7.0:1", () => {
    expect(colorL100.readableOn({ bgColor: CM("#595959FF"), size: "body", ratio: "enhanced" })).toBeTruthy();
    expect(colorL100.readableOn({ bgColor: CM("#5A5A5AFF"), size: "body", ratio: "enhanced" })).toBeFalsy();
  });
});

test("equalTo", () => {
  expect(colorL100.equalTo()).toBeTruthy();
  expect(colorL100.equalTo("hsla(0, 0%, 100%, 0.8)")).toBeFalsy();
  expect(CM("hsla(0, 0%, 100%, 0.8)").equalTo()).toBeFalsy();
  expect(CM("hsla(1, 0%, 100%, 1)").equalTo()).toBeTruthy(); // internally rgba(255, 255, 255, 1) regardless of hue and saturation when lightness is 100%
  expect(CM("hsla(0, 1%, 100%, 1)").equalTo()).toBeTruthy(); // internally rgba(255, 255, 255, 1) regardless of hue and saturation when lightness is 100%
  expect(CM("rgba(254, 255, 255, 1)").equalTo()).toBeFalsy();
  expect(CM("rgba(255, 254, 255, 1)").equalTo()).toBeFalsy();
  expect(CM("rgba(255, 255, 254, 1)").equalTo()).toBeFalsy();
  expect(CM("hsla(0, 0%, 99%, 1)").equalTo()).toBeFalsy();
  expect(CM("hsla(0, 0%, 99%, 1)").equalTo(CM("hsla(0, 0%, 99%, 1)"))).toBeTruthy();
});

test("isCool/isWarm", () => {
  expect(CM("hsla(75, 100%, 50%, 1)").isCool()).toBeTruthy();
  expect(CM("hsla(74.9, 100%, 50%, 1)").isWarm()).toBeTruthy();
  expect(CM("hsla(255, 100%, 50%, 1)").isWarm()).toBeTruthy();
  expect(CM("hsla(254.9, 100%, 50%, 1)").isCool()).toBeTruthy();
  expect(CM("hsla(0, 100%, 50%, 1)").isWarm()).toBeTruthy();
  expect(CM("hsla(180, 100%, 50%, 1)").isCool()).toBeTruthy();
  expect(CM("hsla(180, 100%, 50%, 1)").isWarm()).toBeFalsy();
});

test("closestCool/closestWarm", () => {
  expect(CM("hsla(75, 100%, 50%, 1)").closestWarm().stringHSL()).toBe("hsla(74, 100%, 50%, 1)");
  expect(CM("hsla(254.9, 100%, 50%, 1)").closestWarm().stringHSL()).toBe("hsla(255, 100%, 50%, 1)");
  expect(CM("hsla(0, 100%, 50%, 1)").closestWarm().stringHSL()).toBe("hsla(0, 100%, 50%, 1)");
  expect(CM("hsla(120, 100%, 50%, 1)").closestWarm().stringHSL()).toBe("hsla(74, 100%, 50%, 1)");
  expect(CM("hsla(180, 100%, 50%, 1)").closestWarm().stringHSL()).toBe("hsla(255, 100%, 50%, 1)");

  expect(CM("hsla(74.9, 100%, 50%, 1)").closestCool().stringHSL()).toBe("hsla(75, 100%, 50%, 1)");
  expect(CM("hsla(255.1, 100%, 50%, 1)").closestCool().stringHSL()).toBe("hsla(254, 100%, 50%, 1)");
  expect(CM("hsla(180, 100%, 50%, 1)").closestCool().stringHSL()).toBe("hsla(180, 100%, 50%, 1)");
  expect(CM("hsla(0, 100%, 50%, 1)").closestCool().stringHSL()).toBe("hsla(75, 100%, 50%, 1)");
  expect(CM("hsla(300, 100%, 50%, 1)").closestCool().stringHSL()).toBe("hsla(254, 100%, 50%, 1)");
});

test("isTinted/isShaded/isToned", () => {
  expect(colorL50.isTinted()).toBeTruthy();
  expect(CM("#f00f").isTinted()).toBeFalsy();
  expect(colorL49.isTinted()).toBeFalsy();
  expect(colorL49.isShaded()).toBeTruthy();
  expect(CM("#f00f").isShaded()).toBeFalsy();
  expect(colorL50.isShaded()).toBeFalsy();
  expect(CM("hsla(0, 99.9%, 50%, 1)").isToned()).toBeTruthy();
  expect(CM("#f00f").isToned()).toBeFalsy();
});

test("isPureHue", () => {
  expect(CM("#f00f").isPureHue()).toMatchObject({ pure: true, reason: "N/A" });
  expect(CM("#f00f").isPureHue({ reason: false })).toBeTruthy();

  expect(colorL50.isPureHue()).toMatchObject({ pure: false, reason: "tinted" });
  expect(colorL50.isPureHue({ reason: false })).toBeFalsy();

  expect(colorL49.isPureHue()).toMatchObject({ pure: false, reason: "shaded" });
  expect(colorL49.isPureHue({ reason: false })).toBeFalsy();

  expect(CM("hsla(0, 99.9%, 50%, 1)").isPureHue()).toMatchObject({ pure: false, reason: "toned" });
  expect(CM("hsla(0, 99.9%, 50%, 1)").isPureHue({ reason: false })).toBeFalsy();
});

test("closestPureHue", () => {
  const pureHueColor = "hsla(120, 100%, 50%, 1)";
  expect(CM(pureHueColor).closestPureHue().stringHSL()).toBe(pureHueColor);
  expect(CM("hsla(120, 100%, 50.1%, 1)").closestPureHue().stringHSL()).toBe(pureHueColor);
  expect(CM("hsla(120, 100%, 49.9%, 1)").closestPureHue().stringHSL()).toBe(pureHueColor);
  expect(CM("hsla(120, 99.9%, 50%, 1)").closestPureHue().stringHSL()).toBe(pureHueColor);
});

test("closestWebSafe", () => {
  expect(CM("hsla(3, 97%, 47%, 0.7)").closestWebSafe().stringHSL()).toBe("hsla(0, 100%, 50%, 0.7)");
  expect(CM("hsla(63, 97%, 53%, 0.7)").closestWebSafe().stringHSL()).toBe("hsla(60, 100%, 50%, 0.7)");
  expect(CM("hsla(123, 97%, 47%, 0.7)").closestWebSafe().stringHSL()).toBe("hsla(120, 100%, 50%, 0.7)");
  expect(CM("hsla(183, 97%, 53%, 0.7)").closestWebSafe().stringHSL()).toBe("hsla(180, 100%, 50%, 0.7)");
  expect(CM("hsla(243, 97%, 47%, 0.7)").closestWebSafe().stringHSL()).toBe("hsla(240, 100%, 50%, 0.7)");
  expect(CM("hsla(303, 97%, 53%, 0.7)").closestWebSafe().stringHSL()).toBe("hsla(300, 100%, 50%, 0.7)");
  expect(CM("hsla(357, 97%, 47%, 0.7)").closestWebSafe().stringHSL()).toBe("hsla(0, 100%, 50%, 0.7)");
});
