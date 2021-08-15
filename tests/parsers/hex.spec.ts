import CM from "../../src/index";

test("string 3 digit", () => expect(CM("#fff").stringHEX()).toBe("#FFFFFFFF"));
test("string 4 digit", () => expect(CM("#fffa").stringHEX()).toBe("#FFFFFFAA"));
test("string 6 digit", () => expect(CM("#fffeee").stringHEX()).toBe("#FFFEEEFF"));
test("string 8 digit", () => expect(CM("#fffeeebc").stringHEX()).toBe("#FFFEEEBC"));
test("invalid", () => expect(CM("#fffeeea").stringHEX()).toBe("#000000FF"));
test("object with alpha", () => expect(CM({ r: "FF", g: "EE", b: "DD", a: "CC" }).stringHEX()).toBe("#FFEEDDCC"));
test("object without alpha", () => expect(CM({ r: "FF", g: "EE", b: "DD" }).stringHEX()).toBe("#FFEEDDFF"));
