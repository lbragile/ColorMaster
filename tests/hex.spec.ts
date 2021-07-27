import HEXColors from "../src/models/hex";

let cm: HEXColors;

beforeEach(() => (cm = new HEXColors("66", "77", "88", "99")));

test("getter", () => {
  expect(cm.hexaObj).toMatchObject({ r: "66", g: "77", b: "88", a: "99" });
});

test("setter", () => {
  cm.hexaObj = { ...cm.hexaObj, r: "33" };
  expect(cm.string()).toBe("'#337788'");
});

describe("string formation", () => {
  test("no args", () => {
    expect(cm.string()).toBe("'#667788'");
  });

  test("with alpha", () => {
    expect(cm.string({ withAlpha: true })).toBe("'#66778899'");
  });

  test("single quotes", () => {
    expect(cm.string({ quotes: "single" })).toBe("'#667788'");
  });

  test("with alpha && double quotes", () => {
    expect(cm.string({ withAlpha: true, quotes: "double" })).toBe('"#66778899"');
  });
});

describe("channelValueTo", () => {
  describe("no clamping", () => {
    test.each`
      channel    | value   | expected
      ${"red"}   | ${"55"} | ${"'#55778899'"}
      ${"green"} | ${"55"} | ${"'#66558899'"}
      ${"blue"}  | ${"55"} | ${"'#66775599'"}
      ${"alpha"} | ${"55"} | ${"'#66778855'"}
    `("change $channel channel", ({ channel, value, expected }) => {
      expect(cm.channelValueTo(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | value   | expected
      ${"red"}   | ${"FG"} | ${"'#FF778899'"}
      ${"red"}   | ${"0"}  | ${"'#00778899'"}
      ${"green"} | ${"FG"} | ${"'#66FF8899'"}
      ${"green"} | ${"0"}  | ${"'#66008899'"}
      ${"blue"}  | ${"FG"} | ${"'#6677FF99'"}
      ${"blue"}  | ${"0"}  | ${"'#66770099'"}
      ${"alpha"} | ${"FG"} | ${"'#667788FF'"}
      ${"alpha"} | ${"0"}  | ${"'#66778800'"}
    `("change $channel channel - value: $value", ({ channel, value, expected }) => {
      expect(cm.channelValueTo(channel, value).string({ withAlpha: true })).toBe(expected);
    });
  });
});

describe("channelValueBy", () => {
  describe("no clamping", () => {
    test.each`
      channel    | type     | expected
      ${"red"}   | ${"add"} | ${"'#78778899'"}
      ${"red"}   | ${"sub"} | ${"'#54778899'"}
      ${"green"} | ${"add"} | ${"'#66898899'"}
      ${"green"} | ${"sub"} | ${"'#66658899'"}
      ${"blue"}  | ${"add"} | ${"'#66779A99'"}
      ${"blue"}  | ${"sub"} | ${"'#66777699'"}
      ${"alpha"} | ${"add"} | ${"'#667788AB'"}
      ${"alpha"} | ${"sub"} | ${"'#66778887'"}
    `("change $channel channel → type $type", ({ channel, type, expected }) => {
      expect(cm.channelValueBy(channel, "12", type).string({ withAlpha: true })).toBe(expected);
    });
  });

  describe("clamping", () => {
    test.each`
      channel    | type     | expected
      ${"red"}   | ${"add"} | ${"'#FF778899'"}
      ${"red"}   | ${"sub"} | ${"'#00778899'"}
      ${"green"} | ${"add"} | ${"'#66FF8899'"}
      ${"green"} | ${"sub"} | ${"'#66008899'"}
      ${"blue"}  | ${"add"} | ${"'#6677FF99'"}
      ${"blue"}  | ${"sub"} | ${"'#66770099'"}
      ${"alpha"} | ${"add"} | ${"'#667788FF'"}
      ${"alpha"} | ${"sub"} | ${"'#66778800'"}
    `("change $channel channel - type: $type", ({ channel, type, expected }) => {
      expect(cm.channelValueBy(channel, "FF", type).string({ withAlpha: true })).toBe(expected);
    });
  });
});

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("alpha", () => {
  test("alphaTo", () => {
    expect(cm.alphaTo("F1").string({ withAlpha: true })).toBe("'#667788F1'");
  });

  test("alphaBy", () => {
    expect(cm.alphaBy("33", "add").string({ withAlpha: true })).toBe("'#667788CC'");
    expect(cm.alphaBy("77", "sub").string({ withAlpha: true })).toBe("'#6677881A'");
  });
});

describe("invert", () => {
  test("include alpha", () => {
    expect(cm.invert({ includeAlpha: true }).string({ withAlpha: true })).toBe("'#99887766'");
  });

  test("exclude alpha", () => {
    expect(cm.invert({ includeAlpha: false }).string({ withAlpha: true })).toBe("'#99887799'");
  });
});
