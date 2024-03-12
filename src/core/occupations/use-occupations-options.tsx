import { SelectOption } from "components/SelectField";
import { OccupationsEnum } from "types/occupation";

export const occupationsWithLabel: Record<OccupationsEnum, string> = {
  SALESPERSON: "Vendedor",
  ADMIN: "Administrador",
  SUPERADMIN: "Super Administrador",
};

export default function useOccupationsOptions(): SelectOption[] {
  return Object.keys(occupationsWithLabel).map((occupation) => ({
    label: occupationsWithLabel[occupation as OccupationsEnum],
    value: occupation as OccupationsEnum,
  }));
}
