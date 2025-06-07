import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { SubCategory } from './sub-category.entity';
import { Order } from './order.entity';
import { CartItem } from './cart.entity';
import { Favorite } from './favorite.entity';
import { Rating } from './rating.entity';
import { Reservation } from './reservation.entity';
import { Complaint } from './complaint.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ['product', 'service'], default: 'service' })
  type: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  title: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  description: { ar: string; en: string };

  @Column({ nullable: true })
  main_image: string;

  @Column('text', { array: true, default: [] })
  images: string[];

  @Column('decimal')
  price: number;

  @Column({ type: 'decimal', nullable: true })
  discount_price: number;

  @Column({ nullable: true })
  discount_start: Date;

  @Column({ nullable: true })
  discount_end: Date;

  // Variants (e.g., options like packages or durations)
  @Column('jsonb', { default: [] })
  variants: {
    name: string; // Variant name (e.g., Size)
    type: 'dropdown' | 'radio' | 'list';
    required: boolean;
    slug: string;
    options: {
      value: string;
      default: boolean;
      price: number;
      compared_price?: number;
      image: string;
    }[];
  }[];

  // Custom attributes (e.g., duration, material, level)
  @Column('jsonb', { default: [] })
  attributes: {
    key: string;
    value: string;
  }[];

  // place the services
  @Column({ nullable: true })
  address: string;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  longitude: number;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column({ nullable: true })
  duration_minutes: number; // كم دقيقة تاخذ الخدمة؟ مفيد للحجوزات

  @Column({ nullable: true })
  cancellation_policy: string; // نص توضيحي

  @Column({ default: false })
  requires_deposit: boolean;

  @Column('jsonb', { default: [] })
  availability: {
    day_of_week: number; // 0-6
    from_time: string; // "09:00"
    to_time: string; // "18:00"
  }[];

  // Related services (manual linking)
  @ManyToMany(() => Service)
  @JoinTable()
  relatedServices: Service[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];

  // Relations
  @OneToMany(() => Order, (order) => order.service)
  orders: Order[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.service)
  cartItems: CartItem[];

  @OneToMany(() => Favorite, (favorite) => favorite.service)
  favorites: Favorite[];

  @OneToMany(() => Rating, (rating) => rating.service)
  ratings: Rating[];

  @ManyToOne(() => User, (user) => user.services)
  provider: User;

  @ManyToOne(() => Category, (category) => category.services)
  category: Category;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.services)
  subCategory: SubCategory;

  @OneToMany(() => Complaint, (complaint) => complaint.user)
  complaints: Complaint[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
