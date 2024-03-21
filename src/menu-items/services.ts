import {
  IconAlbum,
  IconTicket,
  IconPackage,
  IconBuildingCommunity,
  IconCar,
  IconBus,
  IconPlane,
  IconTrain,
  IconCompass,
  IconSpeakerphone,
} from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";

const services: MenuItem = {
  id: "services-crud-category",
  title: "Servicios",
  type: MenuItemType.Group,
  children: [
    {
      id: "bookings-rent",
      title: "Reserva/Alquiler",
      type: MenuItemType.Collapse,
      icon: IconAlbum,
      children: [
        {
          id: "hotels",
          title: "Hoteles",
          type: MenuItemType.Collapse,
          icon: IconBuildingCommunity,
          breadcrumbs: false,
          url: "/hotels-per-night",
          children: [
            {
              id: "list-hotels-per-night",
              title: "Lista de hoteles",
              type: MenuItemType.Item,
              url: "/hotels-per-night",
              breadcrumbs: false,
            },
            {
              id: "create-hotel-per-night",
              title: "Crear hotel",
              type: MenuItemType.Item,
              url: "/hotels-per-night/create",
              breadcrumbs: false,
            },
          ],
        },
        {
          id: "vehicles",
          title: "Vehículos",
          type: MenuItemType.Collapse,
          icon: IconCar,
          breadcrumbs: false,
          url: "/car-rentals",
          children: [
            {
              id: "list-vehicles",
              title: "Lista de vehículos",
              type: MenuItemType.Item,
              url: "/car-rentals",
              breadcrumbs: false,
            },
            {
              id: "create-vehicles",
              title: "Crear vehículo",
              type: MenuItemType.Item,
              url: "/car-rentals/create",
              breadcrumbs: false,
            },
          ],
        },
      ],
    },
    {
      id: "tickets",
      title: "Pasaje/Entrada",
      type: MenuItemType.Collapse,
      icon: IconTicket,
      breadcrumbs: false,
      children: [
        {
          id: "airline-tickets",
          title: "Aviones",
          type: MenuItemType.Collapse,
          icon: IconPlane,
          breadcrumbs: false,
          children: [
            {
              id: "list-airline-tickets",
              title: "Lista de aviones",
              type: MenuItemType.Item,
              url: "/airline-ticket",
              breadcrumbs: false,
            },
            {
              id: "create-airline-ticket",
              title: "Crear avión",
              type: MenuItemType.Item,
              url: "/airline-ticket/create",
              breadcrumbs: false,
            },
          ],
        },
        {
          id: "train-tickets",
          title: "Trenes",
          type: MenuItemType.Collapse,
          icon: IconTrain,
          breadcrumbs: false,
          children: [
            {
              id: "list-train-tickets",
              title: "Lista de trenes",
              type: MenuItemType.Item,
              url: "/train-tickets",
              breadcrumbs: false,
            },
            {
              id: "create-train-ticket",
              title: "Crear tren",
              type: MenuItemType.Item,
              url: "/train-tickets/create",
              breadcrumbs: false,
            },
          ],
        },
        {
          id: "bus-tickets",
          title: "Colectivos",
          type: MenuItemType.Collapse,
          icon: IconBus,
          breadcrumbs: false,
          children: [
            {
              id: "list-bus-tickets",
              title: "Lista de colectivos",
              type: MenuItemType.Item,
              url: "/bus-tickets",
              breadcrumbs: false,
            },
            {
              id: "create-bus-ticket",
              title: "Crear colectivo",
              type: MenuItemType.Item,
              url: "/bus-tickets/create",
              breadcrumbs: false,
            },
          ],
        },
        {
          id: "tours",
          title: "Excursiones",
          type: MenuItemType.Collapse,
          icon: IconCompass,
          breadcrumbs: false,
          children: [
            {
              id: "list-tours",
              title: "Lista de excursiones",
              type: MenuItemType.Item,
              url: "/tours",
              breadcrumbs: false,
            },
            {
              id: "create-tour",
              title: "Crear excursión",
              type: MenuItemType.Item,
              url: "/tours/create",
              breadcrumbs: false,
            },
          ],
        },
        {
          id: "events",
          title: "Eventos",
          type: MenuItemType.Collapse,
          icon: IconSpeakerphone,
          breadcrumbs: false,
          children: [
            {
              id: "list-events",
              title: "Lista de eventos",
              type: MenuItemType.Item,
              url: "/events",
              breadcrumbs: false,
            },
            {
              id: "create-event",
              title: "Crear evento",
              type: MenuItemType.Item,
              url: "/events/create",
              breadcrumbs: false,
            },
          ],
        },
      ],
    },
    {
      id: "Paquete",
      title: "Paquetes",
      type: MenuItemType.Collapse,
      icon: IconPackage,
      breadcrumbs: false,
      children: [
        {
          id: "list-packages",
          title: "Lista de paquetes",
          type: MenuItemType.Item,
          url: "/packages",
          breadcrumbs: false,
        },
        {
          id: "create-packages",
          title: "Crear paquete",
          type: MenuItemType.Item,
          url: "/packages/create",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default services;
