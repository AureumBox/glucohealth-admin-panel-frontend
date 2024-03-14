export interface Package {
  id: string;
  name: string;
  description: string;
  appliedDiscountPercentage: number;
  containedServices: ContainedService[];
  price: number;
}

export interface ContainedService {
  serviceId: string;
  amountContained: number;
}
