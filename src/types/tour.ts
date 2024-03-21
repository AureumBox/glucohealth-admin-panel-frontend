export interface Tour {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceLocation: string;
  servicePrice: number;
  serviceTimestamp: Date;
  endOfTourTimestamp: Date;
  tourType: string;
}
