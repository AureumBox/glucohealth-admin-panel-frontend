import { Payment } from "./payment";

export interface Order {
  id: string;
  orderedPackages: OrderedPackage[];
  orderedServices: OrderedService[];
  price: number;
  payments: Payment[];
  customerId: string;
  salespersonId: string;
  placementTimestamp: Date;
}

export interface OrderedPackage {
  packageId: string;
  packageSnapshotId: string;
  amountOrdered: number;
}

export interface OrderedService {
  serviceId: string;
  serviceSnapshotId: string;
  amountOrdered: number;
}
