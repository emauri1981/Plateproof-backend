@Entity()
export class Dispute {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => Deal, { eager: true })
  deal!: Deal;

  @Column()
  reason!: string;

  @Column({ default: 'open' })
  status!: string;
}
