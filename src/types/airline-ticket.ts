export interface AirlineTicket {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceLocation: string;
  servicePrice: number;
  serviceTimestamp: Date;
  arrivalTimestamp: Date;
  arrivalLocation: string;
  airline: string;
  hasStopOver: boolean;
  assignedCabinType: AssignedCabinTypes;
}

enum AssignedCabinTypes {
  ECONOMY = 'ECONOMY',
  BUSINESS = 'BUSINESS'
}
