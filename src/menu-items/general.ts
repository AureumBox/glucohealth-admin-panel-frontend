// assets
import { IconCurrentLocation, IconBuildingEstate, IconBuildingStore, IconCar } from '@tabler/icons';
import { MenuItem, MenuItemType } from './types';
// constant

const other: MenuItem = {
  id: 'agencies-crud-category-general',
  type: MenuItemType.Group,
  title: 'General',
  children: [
    {
      id: 'states',
      title: 'Estados',
      type: MenuItemType.Collapse,
      icon: IconCurrentLocation,
      breadcrumbs: false,
      children: [
        {
          id: 'list-states',
          title: 'Lista de estados',
          type: MenuItemType.Item,
          url: '/states',
          breadcrumbs: false,
        },
        {
          id: 'create-states',
          title: 'Crear estado',
          type: MenuItemType.Item,
          url: '/states/create',
          breadcrumbs: false,
        }
      ]
    },
    {
      id: 'cities',
      title: 'Ciudades',
      type: MenuItemType.Collapse,
      icon: IconBuildingEstate,
      breadcrumbs: false,
      children: [
        {
          id: 'list-cities',
          title: 'Lista de ciudades',
          type: MenuItemType.Item,
          url: '/cities',
          breadcrumbs: false,
        },
        {
          id: 'create-cities',
          title: 'Crear ciudad',
          type: MenuItemType.Item,
          url: '/cities/create',
          breadcrumbs: false,
        }
      ]
    },
    {
      id: 'agencies',
      title: 'Agencias',
      type: MenuItemType.Collapse,
      icon: IconBuildingStore,
      breadcrumbs: false,
      children: [
        {
          id: 'list-cities',
          title: 'Lista de agencias',
          type: MenuItemType.Item,
          url: '/agencies',
          breadcrumbs: false,
        },
        {
          id: 'create-cities',
          title: 'Crear agencia',
          type: MenuItemType.Item,
          url: '/agencies/create',
          breadcrumbs: false,
        }
      ]
    },
    {
      id: 'models',
      title: 'Modelos',
      type: MenuItemType.Collapse,
      icon: IconCar,
      breadcrumbs: false,
      children: [
        {
          id: 'list-models',
          title: 'Lista de modelos',
          type: MenuItemType.Item,
          url: '/models',
          breadcrumbs: false,
        },
        {
          id: 'create-models',
          title: 'Crear modelo',
          type: MenuItemType.Item,
          url: '/models/create',
          breadcrumbs: false,
        }
      ]
    }
  ]
};

export default other;
