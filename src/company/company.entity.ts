// src/company/company.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  companyName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
