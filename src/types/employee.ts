import { Occupation } from "./occupation";

export interface Employee {
  id: string;
  dni: string;
  firstName: string;
  lastName: string;
  address: string;
  birthdate: Date;
  citizenship: string;
  phoneNumber: string;
  email: string;
  salary: number;
  occupations: Occupation[];
}
