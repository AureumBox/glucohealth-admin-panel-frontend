import { IconNurse, IconUsers, IconPill, IconLayoutNavbarExpand  } from "@tabler/icons";
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
      icon: IconNurse,
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
      icon: IconPill,
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
    {
      id: "forum",
      title: "Foro",
      type: MenuItemType.Collapse,
      icon: IconLayoutNavbarExpand,
      breadcrumbs: false,
      children: [
        {
          id: "list-forum",
          title: "Lista de foros",
          type: MenuItemType.Item,
          url: "/forum",
          breadcrumbs: false,
        },
        {
          id: "create-forum",
          title: "Crear foro",
          type: MenuItemType.Item,
          url: "/forum/create",
          breadcrumbs: false,
        },
        {
          id: "createVideoForum",
          title: "Crear Video",
          type: MenuItemType.Item,
          url: "/forum/create-video",
          breadcrumbs: false,
        },
      ]
    },
  ],
};

export default other;
