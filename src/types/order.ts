import { PackageSnapshot } from "./package";
import { Payment } from "./payment";
import { ServiceSnapshot } from "./service";

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
  packageSnapshot: PackageSnapshot;
  amountOrdered: number;
}

export interface OrderedService {
  serviceId: string;
  serviceSnapshot: ServiceSnapshot;
  amountOrdered: number;
}
