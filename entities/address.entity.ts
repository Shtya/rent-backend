import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

export enum TypeAddress {
  HOME = 'home',
  WORK = 'work',
  OTHER = 'other',
}

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.addresses)
  user: User;

  @Column()
  apartment_number: string;

  @Column()
  building_name: string;

  @Column()
  street_name: string;

  @Column()
  additional_details: string;

  @Column({ type: 'enum', enum: TypeAddress, default: TypeAddress.HOME })
  address_type: string;

  @Column({ default: false })
  is_default: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
