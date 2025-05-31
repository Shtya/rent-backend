import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.addresses)
  user: User;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  apartment_number: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  building_name: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  street_name: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  additional_details: { ar: string; en: string };

  @Column({ default: false })
  is_default: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}