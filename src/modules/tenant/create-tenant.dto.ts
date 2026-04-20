import { TenantStatus } from '@prisma/client';
import { IsString, MinLength, IsOptional, IsEnum } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @MinLength(2)
  slug!: string;

  @IsOptional()
  @IsEnum(TenantStatus)
  status?: TenantStatus;
}
