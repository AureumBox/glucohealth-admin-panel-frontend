export type OccupationsEnum = "SALESPERSON" | "ADMIN" | "SUPERADMIN";

export interface Occupation extends Record<"occupationName", OccupationsEnum> {}
