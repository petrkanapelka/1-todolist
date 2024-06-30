export {};

type Adresstype = {
  city: string;
  street: string;
  house: number;
};

type UserType = {
  name: string;
  age: number;
  adress: Adresstype;
};

let User: UserType;

beforeEach(() => {
  User = {
    name: 'Pasha',
    age: 35,
    adress: {
      city: 'Minsk',
      street: 'Kolas',
      house: 65,
    },
  };
});

const changeAge = (user: UserType, age: number) => {
  return {
    ...user,
    age,
  };
};

const changeAdress = (
  user: UserType,
  city = user.adress.city,
  street = user.adress.street,
  house = user.adress.house
) => {
  return (user = {
    ...user,
    adress: { ...user.adress, city, street, house },
  });
};

describe('checked immutabillity', () => {
  test('shoud be different ages', () => {
    const growedUser = changeAge(User, 37);
    expect(growedUser.age).toBe(37);
    expect(User.age).toBe(35);
  });
  test('shoud be different adress', () => {
    const movedUser = changeAdress(User, 'Smorgon', 'Kupala', 22);
    expect(movedUser.age).toBe(35);
    expect(User.age).toBe(35);
    expect(User.adress).not.toBe(movedUser.adress);
    expect(movedUser.adress.city).toBe('Smorgon');
  });
});
