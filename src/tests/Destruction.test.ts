export {};

type UserType = {
    name: string;
    age: number;
    adress: {
        city: string;
        country: string;
    };
};

let user: UserType;

beforeEach(() => {
    user = {
        name: 'Ivan',
        age: 13,
        adress: {
            city: 'Minsk',
            country: 'Belarus',
        },
    };
});

describe('Testing destruction', () => {
    test('should return Ivan', () => {
        const { name, ...rest } = user;
        expect(name).toBe('Ivan');
        expect(rest.age).toBe(13);
    });

    test('should return address', () => {
        const { name, age, adress } = user;
        expect(name).toBe('Ivan');
        expect(age).toBe(13);
        expect(adress).toStrictEqual({
            city: 'Minsk',
            country: 'Belarus',
        });
    });
});
