import { IconUsers } from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";

const other: MenuItem = {
  id: "category-hospital",
  type: MenuItemType.Group,
  title: "Hospital",
  children: [
    {
      id: "nurses",
      title: "Enfermeros",
      type: MenuItemType.Collapse,
      icon: IconUsers,
      breadcrumbs: false,
      children: [
        {
          id: "list-nurses",
          title: "Lista de enfermeros",
          type: MenuItemType.Item,
          url: "/nurses",
          breadcrumbs: false,
        },
        {
          id: "create-nurse",
          title: "Crear enfermero",
          type: MenuItemType.Item,
          url: "/nurses/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "patients",
      title: "Pacientes",
      type: MenuItemType.Collapse,
      icon: IconUsers,
      breadcrumbs: false,
      children: [
        {
          id: "list-patients",
          title: "Lista de pacientes",
          type: MenuItemType.Item,
          url: "/patients",
          breadcrumbs: false,
        },
        {
          id: "create-patient",
          title: "Crear paciente",
          type: MenuItemType.Item,
          url: "/patients/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "medicaments",
      title: "Medicamentos",
      type: MenuItemType.Collapse,
      icon: IconUsers,
      breadcrumbs: false,
      children: [
        {
          id: "list-medicaments",
          title: "Lista de medicamentos",
          type: MenuItemType.Item,
          url: "/medicaments",
          breadcrumbs: false,
        },
        {
          id: "create-medicament",
          title: "Crear medicamento",
          type: MenuItemType.Item,
          url: "/medicaments/create",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default other;
