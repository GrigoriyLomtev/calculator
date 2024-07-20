import { classNames } from "./classNames";

describe("classNames", () => {
  test("with only first param", () => {
    expect(classNames("someClass")).toBe("someClass");
  });
  test("with additional class", () => {
    const expected = "someClass additional1 additional2";
    expect(classNames("someClass", {}, ["additional1", "additional2"])).toBe(
      expected,
    );
  });
  test("with additional class and mods", () => {
    const expected = "someClass additional1 additional2 hover light";
    expect(
      classNames("someClass", { hover: true, light: true }, [
        "additional1",
        "additional2",
      ]),
    ).toBe(expected);
  });
  test("with additional class and mods false", () => {
    const expected = "someClass additional1 additional2 hover light";
    expect(
      classNames("someClass", { hover: true, rounded: false, light: true }, [
        "additional1",
        "additional2",
      ]),
    ).toBe(expected);
  });
  test("with additional class and mods undefined", () => {
    const expected = "someClass additional1 additional2 hover";
    expect(
      classNames(
        "someClass",
        { hover: true, rounded: false, light: undefined },
        ["additional1", "additional2"],
      ),
    ).toBe(expected);
  });
});
