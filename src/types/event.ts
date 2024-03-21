export interface Event {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceLocation: string;
  servicePrice: number;
  serviceTimestamp: Date;
  endOfEventTimestamp: Date;
  eventType: string;
}
