export interface TrainTicket {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceLocation: string;
  servicePrice: number;
  serviceTimestamp: Date;
  arrivalTimestamp: Date;
  arrivalLocation: string;
  trainOperatingCompany: string;
  assignedCabinType: AssignedCabinTypes;
}

enum AssignedCabinTypes {
  ECONOMY = 'ECONOMY',
  BUSINESS = 'BUSINESS'
}
