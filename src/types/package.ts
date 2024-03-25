export interface Package {
  id: string;
  name: string;
  description: string;
  appliedDiscountPercentage: number;
  containedServices: ContainedService[];
  price: number;
}

export interface ContainedService {
  service: {
    id: string;
  };
  amountContained: number;
}

export interface PackageSnapshot extends Package {
  snapshotTimestamp: Date;
}
