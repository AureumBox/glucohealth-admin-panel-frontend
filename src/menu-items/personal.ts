// assets
import { IconFriends } from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";
// constant

const other: MenuItem = {
  id: "agencies-crud-category-personal",
  type: MenuItemType.Group,
  title: "Personal",
  children: [
    {
      id: "employees",
      title: "Empleados",
      type: MenuItemType.Collapse,
      icon: IconFriends,
      breadcrumbs: false,
      children: [
        {
          id: "list-employees",
          title: "Lista de empleados",
          type: MenuItemType.Item,
          url: "/employees",
          breadcrumbs: false,
        },
        {
          id: "create-employees",
          title: "Crear empleado",
          type: MenuItemType.Item,
          url: "/employees/create",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default other;
