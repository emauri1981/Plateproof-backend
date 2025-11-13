@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => Deal, { eager: true })
  deal!: Deal;

  @Column({ type: 'varchar', default: 'pending' })
  status!: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}
