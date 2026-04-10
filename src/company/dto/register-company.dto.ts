import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterCompanyDto {
  @IsNotEmpty()
  companyName: string;

  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @MinLength(6)
  password: string;

  /* ───── ERP FIELDS ───── */

  country: 'IN' | 'SA' | 'AE' | 'US' | 'OTHER';

  taxSystem: 'GST' | 'VAT' | 'NONE';

  defaultTaxRate: number;

  currency: 'INR' | 'SAR' | 'USD' | 'AED';

  invoicePrefix?: string;
}
