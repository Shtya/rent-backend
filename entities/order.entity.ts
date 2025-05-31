import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne } from 'typeorm';
import { Service } from './service.entity';
import { User } from './user.entity';
import { Payment } from './payment.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, service => service.orders)
  service: Service;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Column()
  status: string;

  @Column('decimal')
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Payment, payment => payment.order)
  payment: Payment;
}