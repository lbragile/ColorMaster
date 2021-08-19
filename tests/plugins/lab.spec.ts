import CM, { ColorMaster, extendPlugins } from "../../src/index";
import LABPlugin from "../../src/plugins/lab";

extendPlugins([LABPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringLAB", () => {
  test("laba", () => expect(cm.stringLAB()).toBe("laba(66%, 15, 34, 0.7)"));
  test("lab", () => expect(cm.stringLAB({ alpha: false })).toBe("lab(66%, 15, 34)"));
});

test("laba", () =>
  expect(cm.laba()).toStrictEqual({ l: 66.12641911356157, a: 15.005971091746062, b: 33.955010792136456, alpha: 0.7 }));
