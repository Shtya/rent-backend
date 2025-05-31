import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { Service } from './service.entity';
import { Order } from './order.entity';
import { Cart } from './cart.entity';
import { Favorite } from './favorite.entity';
import { Rating } from './rating.entity';
import { UserLoyaltyPoints } from './loyalty/user-loyalty-points.entity';
import { UserRewardClaim } from './loyalty/user-reward-claim.entity';
import { ProviderLoyaltyStats } from './loyalty/provider-loyalty-stats.entity';
import { Complaint } from './complaint.entity';


export enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  TECHNICIAN = 'technician',
  USER = 'user',
}




@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({nullable : true})
  avatar: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  
  @Column()
  phone: string;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  address: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  business_details: { ar: string; en: string };

  @Column({default : 'active'})
  status: string;
  
  @Column({default : null})
  resetPasswordExpires: Date;

  @Column({default : null})
  resetPasswordToken: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, address => address.user)
  addresses: Address[];

  @OneToMany(() => Service, service => service.provider)
  services: Service[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Cart, cart => cart.user)
  carts: Cart[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];

  @OneToMany(() => UserLoyaltyPoints, ulp => ulp.user)
  loyaltyPoints: UserLoyaltyPoints[];

  @OneToMany(() => UserRewardClaim, urc => urc.user)
  rewardClaims: UserRewardClaim[];

  @OneToMany(() => ProviderLoyaltyStats, pls => pls.provider)
  providerStats: ProviderLoyaltyStats[];

  @OneToMany(() => Complaint, complaint => complaint.user)
  complaints: Complaint[];
}







