import { Entity, Column, UpdateDateColumn } from 'typeorm';
import { TenantBaseEntity } from '../../tenants/tenant-base.entity';

@Entity('users')
export class User extends TenantBaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'varchar', default: 'staff' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
