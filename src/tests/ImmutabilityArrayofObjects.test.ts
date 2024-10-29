export {};

type CompanyType = {
  id: number;
  title: string;
  isOpen: boolean;
};

type CompaniesType = Array<CompanyType>;

let companies: CompaniesType;

beforeEach(() => {
  companies = [
    { id: 1, title: 'Nokia', isOpen: false },
    { id: 2, title: 'Samsung', isOpen: true },
    { id: 3, title: 'Apple', isOpen: true },
    { id: 4, title: 'Huawei', isOpen: true },
    { id: 5, title: 'Siemens', isOpen: false },
  ];
});

const renameCompany = (
  companies: CompaniesType,
  title: string,
  newTitle: string
) => {
  return companies.map((c) =>
    c.title === title ? { ...c, title: newTitle } : c
  );
};

const changeCompanyId = (
  companies: CompaniesType,
  title: string,
  newId: number
) => {
  return companies.map((c) => (c.title === title ? { ...c, id: newId } : c));
};

const toggleCompanyIsOpen = (companies: CompaniesType, title: string) => {
  return companies.map((c) =>
    c.title === title ? { ...c, isOpen: !c.isOpen } : c
  );
};

describe('checked that arrays are immutable', () => {
  test('should rename a company and return a new array', () => {
    let renamedCompanies = renameCompany(companies, 'Huawei', 'Xiaomi');
    expect(companies).not.toBe(renamedCompanies);
    expect(renamedCompanies[3].title).toBe('Xiaomi');
  });

  test('should not rename any company if the title does not match', () => {
    let renamedCompanies = renameCompany(companies, 'Sony', 'Xiaomi');
    expect(companies).not.toBe(renamedCompanies);
    expect(renamedCompanies).toEqual(companies);
  });

  test('should rename the first company in the array', () => {
    let renamedCompanies = renameCompany(companies, 'Nokia', 'Motorola');
    expect(companies).not.toBe(renamedCompanies);
    expect(renamedCompanies[0].title).toBe('Motorola');
  });

  test('should rename the last company in the array', () => {
    let renamedCompanies = renameCompany(companies, 'Siemens', 'Bosch');
    expect(companies).not.toBe(renamedCompanies);
    expect(renamedCompanies[4].title).toBe('Bosch');
  });

  test('should preserve isOpen property when renaming a company', () => {
    let renamedCompanies = renameCompany(companies, 'Samsung', 'LG');
    expect(companies).not.toBe(renamedCompanies);
    expect(renamedCompanies[1].title).toBe('LG');
    expect(renamedCompanies[1].isOpen).toBe(true);
  });

  test('should preserve id property when renaming a company', () => {
    let renamedCompanies = renameCompany(companies, 'Apple', 'Google');
    expect(companies).not.toBe(renamedCompanies);
    expect(renamedCompanies[2].title).toBe('Google');
    expect(renamedCompanies[2].id).toBe(3);
  });

  test('should change id of a company', () => {
    let updatedCompanies = changeCompanyId(companies, 'Apple', 10);
    expect(companies).not.toBe(updatedCompanies);
    expect(updatedCompanies[2].id).toBe(10);
  });

  test('should toggle isOpen of a company', () => {
    let updatedCompanies = toggleCompanyIsOpen(companies, 'Siemens');
    expect(companies).not.toBe(updatedCompanies);
    expect(updatedCompanies[4].isOpen).toBe(true);
  });

  test('should not change isOpen property when changing id', () => {
    let updatedCompanies = changeCompanyId(companies, 'Samsung', 20);
    expect(companies).not.toBe(updatedCompanies);
    expect(updatedCompanies[1].id).toBe(20);
    expect(updatedCompanies[1].isOpen).toBe(true);
  });

  test('should not change id property when toggling isOpen', () => {
    let updatedCompanies = toggleCompanyIsOpen(companies, 'Nokia');
    expect(companies).not.toBe(updatedCompanies);
    expect(updatedCompanies[0].isOpen).toBe(true);
    expect(updatedCompanies[0].id).toBe(1);
  });

  test('should not mutate the original array when changing id', () => {
    let updatedCompanies = changeCompanyId(companies, 'Huawei', 30);
    expect(companies).not.toBe(updatedCompanies);
    expect(companies[3].id).toBe(4);
  });

  test('should not mutate the original array when toggling isOpen', () => {
    let updatedCompanies = toggleCompanyIsOpen(companies, 'Apple');
    expect(companies).not.toBe(updatedCompanies);
    expect(companies[2].isOpen).toBe(true);
  });
});
