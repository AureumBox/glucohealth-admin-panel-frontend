export interface Patient {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  birthDate: number | null;
  weightInKg: number | null;
  heightInCm: number | null;
}
