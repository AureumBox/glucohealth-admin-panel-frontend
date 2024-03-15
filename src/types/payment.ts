export interface Payment {
  paymentNumber: number;
  paymentTimestamp: string;
  netAmountPaid: number;
  amountWithCommissionPaid: number;
  appliedCommissionPercentage: number;
  paymentMethodId: string;
}
