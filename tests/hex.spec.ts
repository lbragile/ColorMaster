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
