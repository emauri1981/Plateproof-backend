@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  score!: number;

  @ManyToOne(() => User, { eager: true })
  user!: User;

  @ManyToOne(() => Deal, { eager: true })
  deal!: Deal;
}
