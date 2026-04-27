import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';

import { DocumentType } from '../../../prisma/generated/client';

//////////////////////////////////////////////////////
// CREATE DTO
//////////////////////////////////////////////////////
export class CreateDocumentDto {
  @IsString()
  name!: string;

  @IsEnum(DocumentType)
  type!: DocumentType;

  @IsDateString()
  expiryDate!: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  ownerType!: string;

  @IsString()
  ownerId!: string;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  branchId?: string;
}

//////////////////////////////////////////////////////
// UPDATE DTO (IMPORTANT FIX)
//////////////////////////////////////////////////////
export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(DocumentType)
  type?: DocumentType;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  ownerType?: string;

  @IsOptional()
  @IsString()
  ownerId?: string;

  @IsOptional()
  @IsString()
  companyId?: string;

  @IsOptional()
  @IsString()
  branchId?: string;
}
