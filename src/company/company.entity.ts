import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ unique: true })
  slug: string;

  /* ───── PLAN ───── */
  @Column({ default: 'free' })
  plan: string;

  /* ───── TRIAL ───── */
  @Column({ type: 'timestamptz', nullable: true })
  trialStart: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  trialEnd: Date | null;

  @Column({ default: false })
  isSubscribed: boolean;

  @Column({ default: true })
  isActive: boolean;

  /* ───── ERP SETTINGS ───── */

  @Column({ default: 'IN' })
  country: string;

  @Column({ default: 'GST' })
  taxSystem: string;

  @Column({ default: 18 })
  defaultTaxRate: number;

  @Column({ default: 'INR' })
  currency: string;

  @Column({ nullable: true })
  invoicePrefix: string;

  /* ───── RELATION ───── */
  @OneToMany(() => User, (user) => user.company)
  users: User[];

  /* ───── HELPERS ───── */
  get isActiveSubscription(): boolean {
    return this.isSubscribed || this.isTrialActive();
  }

  isTrialActive(): boolean {
    if (!this.trialEnd) return false;
    return new Date() <= this.trialEnd;
  }
}
