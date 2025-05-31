import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class LoyaltyRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  required_orders: number;

  @Column()
  granted_points: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}