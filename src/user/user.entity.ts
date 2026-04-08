// src/user/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
@Index(['username', 'company'], { unique: true }) // ✅ unique per company
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ❗ remove global unique (see below)
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'admin' })
  role: string;

  @ManyToOne(() => Company, (company) => company.users, {
    onDelete: 'CASCADE',
  })
  company: Company;
}
