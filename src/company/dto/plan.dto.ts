import { IsNotEmpty } from 'class-validator';

export class UpdatePlanDto {
  @IsNotEmpty()
  plan: string;
}
