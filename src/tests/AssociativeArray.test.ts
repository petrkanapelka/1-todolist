type UserType = {
  id: number;
  name: string;
};

type UsersType = Record<string, UserType>;

let users: UsersType;

beforeEach(() => {
  users = {
    "12234": { id: 12234, name: "Masha" },
    "124": { id: 124, name: "Pasha" },
    "1434": { id: 1434, name: "Sasha" },
    "65656": { id: 65656, name: "Dasha" },
  };
});

describe("testing associative arrays", () => {
  test("should return value by id", () => {
    expect(users["124"].name).toBe("Pasha");
    expect(users["1434"].name).toBe("Sasha");
  });

  test("should change value", () => {
    users["124"].name = "Igor";

    users["1434"] = { id: 1434, name: "Petr" };

    expect(users["124"].name).toBe("Igor");
    expect(users["1434"]).toEqual({ id: 1434, name: "Petr" });
  });

  test("should add new value", () => {
    users["1564"] = { id: 1564, name: "Petr" };

    expect(users["1564"]).toEqual({ id: 1564, name: "Petr" });
  });
});
