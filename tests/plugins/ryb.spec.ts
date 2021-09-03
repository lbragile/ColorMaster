import CM, { ColorMaster, extendPlugins } from "../../src/index";
import RYBPlugin from "../../src/plugins/ryb";

extendPlugins([RYBPlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("stringRYB", () => {
  test("ryba", () => expect(cm.stringRYB()).toBe("color(ryba 200, 200, 100, 0.7)"));
  test("ryb", () => expect(cm.stringRYB({ alpha: false })).toBe("color(ryb 200, 200, 100)"));
});

test("ryba", () => expect(cm.ryba()).toStrictEqual({ r: 200, y: 200, b: 100, a: 0.7 }));
