export type Adresstype = {
  city: string;
  street: string;
  house: number;
};

export type UserType = {
  name: string;
  age: number;
  adress: Adresstype;
};

export const changeAge = (user: UserType, age: number): UserType => {
  return {
    ...user,
    age,
  };
};

export const changeAdress = (
  user: UserType,
  city = user.adress.city,
  street = user.adress.street,
  house = user.adress.house
): UserType => {
  return {
    ...user,
    adress: { ...user.adress, city, street, house },
  };
};

let user: UserType;

beforeEach(() => {
  user = {
    name: 'Pasha',
    age: 35,
    adress: {
      city: 'Minsk',
      street: 'Kolas',
      house: 65,
    },
  };
});

describe('checked immutabillity', () => {
  test('should be different ages', () => {
    const growedUser = changeAge(user, 37);
    expect(growedUser.age).toBe(37);
    expect(user.age).toBe(35);
  });

  test('should be different address', () => {
    const movedUser = changeAdress(user, 'Smorgon', 'Kupala', 22);
    expect(movedUser.age).toBe(35);
    expect(user.age).toBe(35);
    expect(user.adress).not.toBe(movedUser.adress);
    expect(movedUser.adress.city).toBe('Smorgon');
  });

  test('should change only the city in address', () => {
    const movedUser = changeAdress(user, 'Grodno');
    expect(movedUser.adress.city).toBe('Grodno');
    expect(movedUser.adress.street).toBe(user.adress.street);
    expect(movedUser.adress.house).toBe(user.adress.house);
  });

  test('should change only the street in address', () => {
    const movedUser = changeAdress(user, undefined, 'Mickiewicz');
    expect(movedUser.adress.street).toBe('Mickiewicz');
    expect(movedUser.adress.city).toBe(user.adress.city);
    expect(movedUser.adress.house).toBe(user.adress.house);
  });
  test('should change only the house number in address', () => {
    const movedUser = changeAdress(user, undefined, undefined, 100);
    expect(movedUser.adress.house).toBe(100);
    expect(movedUser.adress.city).toBe(user.adress.city);
    expect(movedUser.adress.street).toBe(user.adress.street);
  });

  test('should change the name of the user', () => {
    const renamedUser = { ...user, name: 'Alex' };
    expect(renamedUser.name).toBe('Alex');
    expect(renamedUser.age).toBe(user.age);
    expect(renamedUser.adress).toBe(user.adress);
  });
});
