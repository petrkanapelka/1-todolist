let a: number, b: number;

beforeEach(() => {
  a = 3;
  b = 4;
});

describe("Arithmetic operations", () => {
  test("addition of a and b", () => {
    const sum = a + b;
    expect(sum).toBe(7);
  });

  test("multiplication of a and b", () => {
    const product = a * b;
    expect(product).toBe(12);
  });
});
