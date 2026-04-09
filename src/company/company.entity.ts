// src/company/company.entity.ts
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

  @Column({ default: 'free' })
  plan: string; // free, basic, premium, etc.

  @Column({ type: 'timestamptz', nullable: true })
  trialStart: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  trialEnd: Date | null;

  @Column({ default: false })
  isSubscribed: boolean; // manual payment status

  @Column({ default: true })
  isActive: boolean; // account active/inactive

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  // ✅ Computed helper
  get isActiveSubscription(): boolean {
    return this.isSubscribed || this.isTrialActive();
  }

  isTrialActive(): boolean {
    if (!this.trialEnd) return false;
    const now = new Date();
    return now <= this.trialEnd;
  }
}
