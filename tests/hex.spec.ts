import CM from "../src/index";
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
    expect(CM.HEXAFrom("#456789").hexaObj).toMatchObject({ r: "45", g: "67", b: "89", a: "FF" });
    expect(CM.HEXAFrom("(45, 67, 89)").hexaObj).toMatchObject({ r: "45", g: "67", b: "89", a: "FF" });
    expect(CM.HEXAFrom("(45, 67, 89, AB)").hexaObj).toMatchObject({ r: "45", g: "67", b: "89", a: "AB" });
    expect(CM.HEXAFrom(FULL_OPACITY).hexaObj).toMatchObject({ r: "45", g: "67", b: "89", a: "FF" });
    expect(CM.HEXAFrom(LOWER_OPACITY).hexaObj).toMatchObject({ r: "45", g: "67", b: "89", a: "AB" });
  });

  it("handles invalid input by throwing errors when needed", () => {
    expect(CM.HEXAFrom("45, 67").hexaObj).toMatchObject({ r: "45", g: "67", b: "00", a: "FF" });
    expect(CM.HEXAFrom("45, 67, 89, AB, AB").hexaObj).toMatchObject({ r: "45", g: "67", b: "89", a: "AB" });
  });
});

describe("getters & setters", () => {
  test("object getter", () => {
    expect(cm.hexaObj).toMatchObject({ r: "66", g: "77", b: "88", a: "99" });
  });

  test("object setter", () => {
    cm.hexaObj = { ...cm.hexaObj, r: "33" };
    expect(cm.string({ withAlpha: false })).toBe("#337788");
  });

  test("array getter", () => {
    expect(cm.hexaArr).toEqual(["66", "77", "88", "99"]);
  });

  test("array setter", () => {
    const currArr = cm.hexaArr;
    currArr[0] = "33";
    cm.hexaArr = currArr;
    expect(cm.string({ withAlpha: false })).toBe("#337788");
  });
});

describe("string formation", () => {
  test("without alpha", () => {
    expect(cm.string({ withAlpha: false })).toBe("#667788");
  });

  test("with alpha", () => {
    expect(cm.string()).toBe("#66778899");
  });
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
  test("alphaTo", () => {
    expect(cm.alphaTo("F1").string()).toBe("#667788F1");
  });

  test("alphaBy", () => {
    expect(cm.alphaBy("35", "add").string()).toBe("#667788CE");
    expect(cm.alphaBy("73", "sub").string()).toBe("#66778826");
  });
});

describe("invert", () => {
  test("include alpha", () => {
    expect(cm.invert().string()).toBe("#99887766");
  });

  test("exclude alpha", () => {
    expect(cm.invert({ includeAlpha: false }).string()).toBe("#99887799");
  });
});

test("saturateBy/desaturateBy", () => {
  expect(cm.saturateBy("21").string()).toBe("#56779799"); // 57779899
  expect(cm.desaturateBy("21").string()).toBe("#75767899"); // 75777999
});

test("lighterBy/darkerBy", () => {
  expect(cm.lighterBy("21").string()).toBe("#8998A699"); // 8998A799
  expect(cm.darkerBy("21").string()).toBe("#49556299"); // 4A566299
});

test("grayscale", () => {
  expect(cm.grayscale().string()).toBe("#76767699"); // 77777799
});
