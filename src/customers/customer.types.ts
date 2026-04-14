export type CustomerStatus = 'active' | 'inactive' | 'suspended' | 'pending';
export type CustomerType =
  | 'individual'
  | 'business'
  | 'non_profit'
  | 'government';

export interface Customer {
  id?: string;
  companyId?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  alternativePhone?: string;
  type: CustomerType;
  status: CustomerStatus;
  taxId?: string;
  website?: string;

  // Addresses
  billingAddress?: string;
  billingCity?: string;
  billingState?: string;
  billingPostalCode?: string;
  billingCountry?: string;

  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingPostalCode?: string;
  shippingCountry?: string;

  // Additional Info
  notes?: string;
  tags?: string[];

  // Statistics
  lifetimeSpent: number;
  totalOrders: number;
  lastOrderDate?: string;

  createdAt?: string;
  updatedAt?: string;
}
