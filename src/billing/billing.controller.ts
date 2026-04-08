import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CompanyService } from '../company/company.service';

class ManualPaymentDto {
  companyId: string;
  plan?: 'free' | 'basic' | 'pro'; // Optional plan selection
  paymentDate?: Date;
}

@Controller('billing')
export class BillingController {
  private readonly logger = new Logger(BillingController.name);

  constructor(private readonly companyService: CompanyService) {}

  /**
   * Mark company subscription as paid manually
   */
  @Post('manual')
  async manualPayment(@Body() dto: ManualPaymentDto) {
    const company = await this.companyService.findById(dto.companyId);
    if (!company) throw new BadRequestException('Company not found');

    if (dto.plan) company.plan = dto.plan;

    // This sets isSubscribed = true internally
    await this.companyService.activateSubscription(dto.companyId);

    this.logger.log(
      `Manual payment activated for company ${company.companyName}`,
    );

    return {
      message: `Subscription activated for ${company.companyName}`,
      companyId: company.id,
      plan: company.plan,
    };
  }

  /**
   * Deactivate a company's subscription manually
   */
  @Patch('deactivate/:companyId')
  async deactivate(@Param('companyId') companyId: string) {
    const company = await this.companyService.findById(companyId);
    if (!company) throw new BadRequestException('Company not found');

    await this.companyService.deactivateSubscription(companyId);

    this.logger.log(
      `Subscription deactivated for company ${company.companyName}`,
    );

    return {
      message: `Subscription deactivated for ${company.companyName}`,
      companyId: company.id,
    };
  }
}
