import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  name: { ar: string; en: string };

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  description: { ar: string; en: string };

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => DomainConfiguration, config => config.domain)
  configurations: DomainConfiguration[];
}



@Entity()
export class DomainConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Domain, domain => domain.configurations)
  domain: Domain;

  @Column()
  banner_url: string;

  @Column({ type: 'jsonb', default: { ar: '', en: '' } })
  service_types: { ar: string; en: string };

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}