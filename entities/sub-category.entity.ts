import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { Service } from './service.entity';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  name: { ar: string; en: string };
  
  @Column()
  image : string ;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
  
  @ManyToOne(() => Category, category => category.subCategories)
  category: Category;

  @OneToMany(() => Service, service => service.subCategory)
  services: Service[];
}