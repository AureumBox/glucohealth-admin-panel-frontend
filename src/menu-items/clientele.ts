import { IconUsers, IconListCheck } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';

const other: MenuItem = {
  id: 'category-clientele',
  type: MenuItemType.Group,
  title: 'Clientela',
  children: [
    {
      id: 'clients',
      title: 'Clientes',
      type: MenuItemType.Collapse,
      icon: IconUsers,
      breadcrumbs: false,
      children: [
        {
          id: 'list-clients',
          title: 'Lista de clientes',
          type: MenuItemType.Item,
          url: '/customers',
          breadcrumbs: false,
        },
        {
          id: 'create-clients',
          title: 'Crear cliente',
          type: MenuItemType.Item,
          url: '/customers/create',
          breadcrumbs: false,
        }
      ]
    }, 
    {
      id: 'orders',
      title: 'Ordenes',
      type: MenuItemType.Collapse,
      icon: IconListCheck,
      breadcrumbs: false,
      children: [
        {
          id: 'list-orders',
          title: 'Lista de ordenes',
          type: MenuItemType.Item,
          url: '/orders',
          breadcrumbs: false,
        },
        {
          id: 'create-orders',
          title: 'Crear ordenes',
          type: MenuItemType.Item,
          url: '/orders/create',
          breadcrumbs: false,
        }
      ]
    }
  ]
};

export default other;
