export type Person = {
  firstname: string;
  lastname: string;
  address: Address | null;
  phone: Phone | null;
  family: Family[] | null;
};

export type Address = {
  street: string;
  city: string;
  streetNr: string | null;
};

export type Phone = {
  mobile: string;
  landline: string | null;
};

export type Family = {
  name: string;
  born: number;
  address: Address | null;
  phone: Phone | null;
};

export type People = {
  person: Person[];
};

export type LineType = 'P' | 'F' | 'A' | 'T';
export type Line = {
  lineType: LineType;
  section1: string;
  section2: string;
  section3: string | null;
};
export type Section = {
  lines: Line[];
};
