import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Deal } from '../deal/deal.entity';
import { User } from '../user/user.entity';

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Deal, { eager: true })
  deal!: Deal;

  @ManyToOne(() => User, { eager: true })
  claimant!: User;

  @Column({ type: 'text' })
  reason!: string;

  @Column({ type: 'varchar', default: 'open' })
  status!: 'open' | 'reviewing' | 'resolved';

  @Column({ type: 'text', nullable: true })
  resolution?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
