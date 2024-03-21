export interface BusTicket {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceLocation: string;
  servicePrice: number;
  serviceTimestamp: Date;
  arrivalTimestamp: Date;
  arrivalLocation: string;
  assignedBusSeat: string;
  busOperatingCompany: string;
  busSeatType: BusSeatTypes;
}

enum BusSeatTypes {
  STANDARD = 'STANDARD',
  SEMI_BED = 'SEMI_BED',
  BED_EXECUTIVE = 'BED_EXECUTIVE',
  BED_SUITE = 'BED_SUITE'
}
