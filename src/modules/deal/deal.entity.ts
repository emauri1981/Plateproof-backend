@Entity()
export class Deal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  restaurantName!: string;

  @Column()
  address!: string;

  @Column()
  price!: number;

  @ManyToOne(() => User, { eager: true })
  owner!: User;
}
