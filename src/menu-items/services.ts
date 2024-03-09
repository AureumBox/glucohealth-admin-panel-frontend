import {
  IconAlbum,
  IconTicket,
  IconBuildingCommunity,
  IconCar,
  IconBus,
  IconPlane,
  IconTrain,
  IconCompass,
  IconSpeakerphone
} from '@tabler/icons'
import { MenuItem, MenuItemType } from './types'

const services: MenuItem = {
  id: 'services-crud-category',
  title: 'Servicios',
  type: MenuItemType.Group,
  children: [
    {
      id: 'bookings-rent',
      title: 'Reserva/Alquiler',
      type: MenuItemType.Collapse,
      icon: IconAlbum,
      children: [
        {
          id: 'hotels',
          title: 'Hoteles',
          type: MenuItemType.Collapse,
          icon: IconBuildingCommunity,
          breadcrumbs: false,
          url: '/hotels-per-night',
          children: [
            {
              id: 'list-hotels-per-night',
              title: 'Lista de hoteles',
              type: MenuItemType.Item,
              url: '/hotels-per-night',
              breadcrumbs: false
            },
            {
              id: 'create-hotel-per-night',
              title: 'Crear hotel',
              type: MenuItemType.Item,
              url: '/hotels-per-night/create',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'vehicles',
          title: 'Vehículos',
          type: MenuItemType.Collapse,
          icon: IconCar,
          breadcrumbs: false,
          url: '/vehicles',
          children: [
            {
              id: 'list-vehicles',
              title: 'Lista de vehículos',
              type: MenuItemType.Item,
              url: '/vehicles',
              breadcrumbs: false
            },
            {
              id: 'create-vehicles',
              title: 'Crear vehículo',
              type: MenuItemType.Item,
              url: '/vehicles/create',
              breadcrumbs: false
            }
          ]
        }
      ]
    },
    {
      id: 'tickets',
      title: 'Pasaje/Entrada',
      type: MenuItemType.Collapse,
      icon: IconTicket,
      breadcrumbs: false,
      children: [
        {
          id: 'airplanes',
          title: 'Aviones',
          type: MenuItemType.Collapse,
          icon: IconPlane,
          breadcrumbs: false,
          url: '/vehicles',
          children: [
            {
              id: 'list-airplanes',
              title: 'Lista de aviones',
              type: MenuItemType.Item,
              url: '/airplanes',
              breadcrumbs: false
            },
            {
              id: 'create-airplanes',
              title: 'Crear avión',
              type: MenuItemType.Item,
              url: '/airplanes/create',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'trains',
          title: 'Trenes',
          type: MenuItemType.Collapse,
          icon: IconTrain,
          breadcrumbs: false,
          children: [
            {
              id: 'list-trains',
              title: 'Lista de trenes',
              type: MenuItemType.Item,
              url: '/trains',
              breadcrumbs: false
            },
            {
              id: 'create-trains',
              title: 'Crear tren',
              type: MenuItemType.Item,
              url: '/trains/create',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'busses',
          title: 'Colectivos',
          type: MenuItemType.Collapse,
          icon: IconBus,
          breadcrumbs: false,
          children: [
            {
              id: 'list-busses',
              title: 'Lista de colectivos',
              type: MenuItemType.Item,
              url: '/busses',
              breadcrumbs: false
            },
            {
              id: 'create-busses',
              title: 'Crear colectivo',
              type: MenuItemType.Item,
              url: '/busses/create',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'excursions',
          title: 'Excursiones',
          type: MenuItemType.Collapse,
          icon: IconCompass,
          breadcrumbs: false,
          children: [
            {
              id: 'list-excursions',
              title: 'Lista de excursiones',
              type: MenuItemType.Item,
              url: '/excursions',
              breadcrumbs: false
            },
            {
              id: 'create-excursions',
              title: 'Crear excursión',
              type: MenuItemType.Item,
              url: '/excursions/create',
              breadcrumbs: false
            }
          ]
        },
        {
          id: 'events',
          title: 'Eventos',
          type: MenuItemType.Collapse,
          icon: IconSpeakerphone,
          breadcrumbs: false,
          children: [
            {
              id: 'list-events',
              title: 'Lista de eventos',
              type: MenuItemType.Item,
              url: '/events',
              breadcrumbs: false
            },
            {
              id: 'create-events',
              title: 'Crear evento',
              type: MenuItemType.Item,
              url: '/events/create',
              breadcrumbs: false
            }
          ]
        }
      ]
    }
  ]
}

export default services
