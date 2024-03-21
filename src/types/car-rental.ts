export interface CarRental {
  id: string;
  serviceName: string;
  serviceDescription: string;
  serviceLocation: string;
  servicePrice: number;
  serviceTimestamp: Date;
  carReturnTimestamp: Date;
  carBrand: string;
  carModel: string;
  numberOfSeatsInTheCar: number;
  carEngineType: CarEngineTypes
}

enum CarEngineTypes {
  GASOLINE = 'GASOLINE',
  NATURAL_GAS = 'NATURAL_GAS',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC'
}
