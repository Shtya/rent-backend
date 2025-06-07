import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'entities/user.entity';
import { Service } from 'entities/service.entity';
import { Address } from './address.entity';

export enum ReservationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}
export enum TypePayment {
  CASH = 'cash',
  ONLINE = 'online',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Service, (service) => service.reservations)
  service: Service;

  // ✅ Add this for the address relation
  @ManyToOne(() => Address, { nullable: true, onDelete: 'SET NULL' })
  address: Address;

  @Column({ type: 'date' })
  date: string;

  @Column('decimal')
  total_price: number;


  @Column({ type: 'enum', enum: TypePayment, default: TypePayment.CASH })
  payment_method: string;

  @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.PENDING, })
  status: ReservationStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
