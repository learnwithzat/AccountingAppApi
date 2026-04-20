
import { IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { TenantStatus } from '../../generated/prisma/client';

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
