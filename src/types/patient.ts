export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  birthdate: number | null;
  weightInKg: number | null;
  heightInCm: number | null;
}
