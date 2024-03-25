import { Service } from "./service";

export interface ProfitsData {
  profits: number;
  numberOfPaidOrders: number;
  bestSellingServices: Service[];
}
