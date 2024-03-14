export type ServiceType =
  | "HOTEL_PER_NIGHT"
  | "CAR_RENTAL"
  | "BUS TICKET"
  | "AIRLINE_TICKET"
  | "TRAIN_TICKET"
  | "TOUR"
  | "EVENT";

export interface Service {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceLocation: string;
  servicePrice: number;
  serviceTimestamp: Date;
  serviceType: ServiceType;
}
