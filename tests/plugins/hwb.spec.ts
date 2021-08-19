import CM, { ColorMaster, extendPlugins } from "../../src/index";
import HWBPlugin from "../../src/plugins/hwb";

extendPlugins([HWBPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringHSV", () => {
  test("hwba", () => expect(cm.stringHWB()).toBe("hwba(30, 39%, 22%, 0.7)"));
  test("hwb", () => expect(cm.stringHWB({ alpha: false })).toBe("hwb(30, 39%, 22%)"));
});

test("hwba", () =>
  expect(cm.hwba()).toStrictEqual({ h: 30.000000000000007, w: 39.21568627450981, b: 21.568627450980394, a: 0.7 }));
