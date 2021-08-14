import CM, { ColorMaster } from "../../src/colormaster";
import { extendPlugins } from "../../src";
import HarmonyPlugin from "../../src/plugins/harmony";

extendPlugins([HarmonyPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "hsla(30, 50%, 50%, 1)";

beforeEach(() => (cm = CM(TEST_COLOR)));

test("analogous", () => {
  const expected = ["hsla(0, 50%, 50%, 1)", "hsla(30, 50%, 50%, 1)", "hsla(60, 50%, 50%, 1)"];
  expect(cm.harmony().map((c) => c.stringHSL())).toStrictEqual(expected);

  expect(cm.harmony({ type: "analogous" }).map((c) => c.stringHSL())).toStrictEqual(expected);
});

test("complementary", () => {
  expect(cm.harmony({ type: "complementary" }).map((c) => c.stringHSL())).toStrictEqual([
    "hsla(30, 50%, 50%, 1)",
    "hsla(210, 50%, 50%, 1)"
  ]);
});

test("split-complementary", () => {
  expect(cm.harmony({ type: "split-complementary" }).map((c) => c.stringHSL())).toStrictEqual([
    "hsla(30, 50%, 50%, 1)",
    "hsla(180, 50%, 50%, 1)",
    "hsla(240, 50%, 50%, 1)"
  ]);
});

test("double-split-complementary", () => {
  expect(cm.harmony({ type: "double-split-complementary" }).map((c) => c.stringHSL())).toStrictEqual([
    "hsla(0, 50%, 50%, 1)",
    "hsla(30, 50%, 50%, 1)",
    "hsla(60, 50%, 50%, 1)",
    "hsla(180, 50%, 50%, 1)",
    "hsla(240, 50%, 50%, 1)"
  ]);
});

test("triad", () => {
  expect(cm.harmony({ type: "triad" }).map((c) => c.stringHSL())).toStrictEqual([
    "hsla(30, 50%, 50%, 1)",
    "hsla(150, 50%, 50%, 1)",
    "hsla(270, 50%, 50%, 1)"
  ]);
});

test("rectangle", () => {
  expect(cm.harmony({ type: "rectangle" }).map((c) => c.stringHSL())).toStrictEqual([
    "hsla(30, 50%, 50%, 1)",
    "hsla(90, 50%, 50%, 1)",
    "hsla(210, 50%, 50%, 1)",
    "hsla(270, 50%, 50%, 1)"
  ]);
});

test("square", () => {
  expect(cm.harmony({ type: "square" }).map((c) => c.stringHSL())).toStrictEqual([
    "hsla(30, 50%, 50%, 1)",
    "hsla(120, 50%, 50%, 1)",
    "hsla(210, 50%, 50%, 1)",
    "hsla(300, 50%, 50%, 1)"
  ]);
});

describe("monochromatic", () => {
  test("tints", () => {
    expect(cm.harmony({ type: "monochromatic", effect: "tints" }).map((c) => c.stringHSL())).toStrictEqual([
      "hsla(30, 50%, 50%, 1)",
      "hsla(30, 50%, 60%, 1)",
      "hsla(30, 50%, 70%, 1)",
      "hsla(30, 50%, 80%, 1)",
      "hsla(30, 50%, 90%, 1)",
      "hsla(0, 0%, 100%, 1)"
    ]);
  });

  test("shades", () => {
    expect(cm.harmony({ type: "monochromatic", effect: "shades" }).map((c) => c.stringHSL())).toStrictEqual([
      "hsla(30, 50%, 50%, 1)",
      "hsla(30, 50%, 40%, 1)",
      "hsla(30, 50%, 30%, 1)",
      "hsla(30, 50%, 20%, 1)",
      "hsla(30, 50%, 10%, 1)",
      "hsla(0, 0%, 0%, 1)"
    ]);
  });

  test("tones", () => {
    expect(cm.harmony({ type: "monochromatic", effect: "tones" }).map((c) => c.stringHSL())).toStrictEqual([
      "hsla(30, 50%, 50%, 1)",
      "hsla(30, 40%, 50%, 1)",
      "hsla(30, 30%, 50%, 1)",
      "hsla(30, 20%, 50%, 1)",
      "hsla(30, 10%, 50%, 1)",
      "hsla(0, 0%, 50%, 1)"
    ]);
  });

  test("below 2 limit", () => {
    expect(cm.harmony({ type: "monochromatic", amount: 1 }).map((c) => c.stringHSL())).toStrictEqual([
      "hsla(30, 50%, 50%, 1)",
      "hsla(30, 25%, 50%, 1)",
      "hsla(0, 0%, 50%, 1)"
    ]);
  });

  test("above 10 limit", () => {
    expect(cm.harmony({ type: "monochromatic", amount: 11 }).map((c) => c.stringHSL())).toStrictEqual([
      "hsla(30, 50%, 50%, 1)",
      "hsla(30, 45%, 50%, 1)",
      "hsla(30, 40%, 50%, 1)",
      "hsla(30, 35%, 50%, 1)",
      "hsla(30, 30%, 50%, 1)",
      "hsla(30, 25%, 50%, 1)",
      "hsla(30, 20%, 50%, 1)",
      "hsla(30, 15%, 50%, 1)",
      "hsla(30, 10%, 50%, 1)",
      "hsla(30, 5%, 50%, 1)",
      "hsla(0, 0%, 50%, 1)"
    ]);
  });
});
