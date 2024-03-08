// assets
import { IconFriends } from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";
// constant

const other: MenuItem = {
  id: "category-business",
  type: MenuItemType.Group,
  title: "Negocio",
  children: [
    // {
    //   id: "employees",
    //   type: MenuItemType.Collapse,
    //   title: "Empleados",
    //   children: [
    //     {
    //         id: "employees",
    //         title: "Empleados",
    //         type: MenuItemType.Collapse,
    //         icon: IconFriends,
    //         breadcrumbs: false,
    //         children: [
    //           {
    //             id: "list-employees",
    //             title: "Lista de empleados",
    //             type: MenuItemType.Item,
    //             url: "/employees",
    //             breadcrumbs: false,
    //           },
    //           {
    //             id: "create-employees",
    //             title: "Crear empleado",
    //             type: MenuItemType.Item,
    //             url: "/employees/create",
    //             breadcrumbs: false,
    //           },
    //         ],
    //       },
    //   ],
    // },
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
