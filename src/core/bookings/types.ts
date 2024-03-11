import { ShortService } from "types/types"

export interface Booking {
  bookingId: number
  expeditionDate: string
  expirationDate: string
  clientDni: string
  licensePlate: string
  createdAt: string
  agencyRif: string
  services: ShortService[]
}

export interface SlimBooking {
  bookingId: number
  expeditionDate: string
  expirationDate: string
  clientDni: string
  licensePlate: string
  createdAt: string
  agencyRif: string
}
