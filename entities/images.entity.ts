import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;  // رابط الصورة

  @Column({ nullable: true })
  alt?: string;  // نص بديل للصورة (للـ SEO والوصولية)

  @Column()
  name: string;  // اسم الملف أو اسم الصورة

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
