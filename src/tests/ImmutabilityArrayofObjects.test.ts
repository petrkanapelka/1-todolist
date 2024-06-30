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

const renameCompany = (companies: CompaniesType, title: string, newTitle: string) => {
  return companies.map((c) => (c.title === title ? { ...c, title:newTitle } : c));
};

describe('checked that arrays is immutable', () => {
  test('should be array immutable', () => {
    let renamedCompanies = renameCompany(companies, 'Huawei', 'Xiaomi');
    expect(companies).not.toBe(renamedCompanies);
    expect(renamedCompanies[3].title).toBe('Xiaomi');
  });
});
