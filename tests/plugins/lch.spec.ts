import CM, { ColorMaster, extendPlugins } from "../../src/index";
import LCHPlugin from "../../src/plugins/lch";

extendPlugins([LCHPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringLCH", () => {
  test("lcha", () => expect(cm.stringLCH()).toBe("lcha(66%, 37, 66, 0.7)"));
  test("lch", () => expect(cm.stringLCH({ alpha: false })).toBe("lch(66%, 37, 66)"));
});

test("lcha", () =>
  expect(cm.lcha()).toStrictEqual({ l: 66.12641911356157, c: 37.12306461353133, h: 66.15759746869428, a: 0.7 }));
