export type Reservation = {
  checkin?: string | Date | null;
  checkout?: string | Date | null;
  adults?: number;
  childrens?: number;
  infants?: number;
  plan?: number | string | null;
  extra?: string | null;
  planCost?: number | null;
  totalCost?: number | null;
  taxes?: number | null;
  extraCost?: number | null;
  cancelationCost?: number | null;
  total?: number | null;
  hasBreakfast?: boolean | null;
  selectedRoom?: unknown | null;
  product?: Product | unknown | null;
  currency?: string | null;
  propertyId?: number;
  roomTypeId?: number | null;
};

export type Product = {
  rate?: number;
  amountBeforeTax?: number;
  amountAfterTax?: unknown;
  productId?: number;
  roomTypeId?: number;
  ratePlanId?: number;
  mealPlans?: unknown[];
  reservationPolicies?: ReservationPolicy[];
  currency?: string;
  startDate?: string;
  endDate?: string;
  planType?: string;
  standardCapacity?: number;
  maxCapacity?: number;
  productDates?: unknown;
};

export type ReservationPolicy = {
  policyAndConditionsId: number;
  policyName: string;
  policyDescription: string;
  cancellationPolicy: CancellationPolicy;
  paymentPolicy: PaymentPolicy;
  noShowPolicy: NoShowPolicy;
  policyStatus: string;
};

export type CancellationPolicy = {
  cancellationPolicyId: number;
  policyName: string;
  policyDescription: string;
  cancellationPeriods: CancellationPeriod[];
};

export type CancellationPeriod = {
  cancellationPeriodId: number;
  reservationMilestone: string;
  numberOfDays: number;
  cancellationPenalty: CancellationPenalty[];
  cancellationRefund: CancellationRefund[];
};

export type CancellationPenalty = {
  staySpent: boolean;
  additionalAmount: number;
  allStay: boolean;
  staysNumber: unknown;
  stayPercentage: number;
};

export type CancellationRefund = {
  staySpent: boolean;
  allStay: boolean;
  staysNumber: unknown;
  stayPercentage: number;
};

export type PaymentPolicy = {
  paymentPolicyId: number;
  policyName: string;
  policyDescription: string;
  paymentPeriods: PaymentPeriod[];
};

export type PaymentPeriod = {
  paymentPeriodId: number;
  reservationMilestone: string;
  numberOfDays: number;
  paymentAmount: number;
  staysNumber: number;
  allStay: boolean;
  stayPercentage: number;
};

export type NoShowPolicy = {
  noShowPolicyId: number;
  policyName: string;
  policyDescription: string;
  penaltyAmount: number;
  penaltyAppliesToAllStays: boolean;
  penaltyStaysAmount: number;
  penaltyAdditionalStays: number;
  penaltyStayPercentage: number;
};
