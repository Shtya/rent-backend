import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Faq {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  question: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  answer: { ar: string; en: string };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}