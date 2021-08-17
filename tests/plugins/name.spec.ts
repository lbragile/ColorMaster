import CM, { ColorMaster } from "../../src/index";
import { extendPlugins } from "../../src";
import NamePlugin from "../../src/plugins/name";

extendPlugins([NamePlugin]);

let cm: ColorMaster;
const TEST_COLOR = "rgba(200, 150, 100, 0.7)";

beforeEach(() => (cm = CM(TEST_COLOR)));

describe("name", () => {
  test("alpha = 0", () => {
    expect(cm.alphaTo(0).name()).toBe("transparent");
    expect(cm.alphaTo(0).name({ exact: false })).toBe("transparent");
  });

  test("alpha < 1", () => {
    expect(cm.name()).toBe("undefined");
    expect(cm.name({ exact: false })).toBe("dark khaki (with opacity)");
  });

  test("alpha = 1", () => {
    expect(cm.alphaTo(1).name()).toBe("undefined");
    expect(cm.alphaTo(1).name({ exact: false })).toBe("dark khaki");
  });

  test("exact match", () => {
    const redColor = CM("#f00F");
    expect(redColor.name()).toBe("red");
    expect(redColor.name({ exact: false })).toBe("red");
  });
});

test("getter - format - name", () => expect(CM("red").format).toBe("name"));

describe("Name parser", () => {
  test("white", () => expect(CM("white").stringHEX()).toBe("#FFFFFFFF"));
  test("gray", () => expect(CM("gray").stringHEX()).toBe("#808080FF"));
  test("black", () => expect(CM("black").stringHEX()).toBe("#000000FF"));
  test("violet", () => expect(CM("violet").stringHEX()).toBe("#EE82EEFF"));
  test("transparent", () => expect(CM("transparent").stringHEX()).toBe("#00000000"));
  test("invalid", () => expect(CM("magic").stringHEX()).toBe("#000000FF"));
});
