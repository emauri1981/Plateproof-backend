# Plateproof-backend
Backend API for PlateProof app (NestJS).
Plateproof-backend/
 ├── package.json
 ├── tsconfig.json
 ├── docker-compose.yml (optional)
 ├── .env.example
 └── src/
      ├── main.ts
      ├── app.module.ts
      └── modules/
            ├── user/
            ├── deal/
            ├── rating/
            ├── application/
            ├── dispute/

    main.ts
    app.module.ts
    utils/
      haversine.ts
    modules/
      auth/
        auth.module.ts
        auth.service.ts
        auth.controller.ts
        jwt.strategy.ts
        jwt.guard.ts
        roles.decorator.ts
        roles.guard.ts
      user/
        user.entity.ts
        user.service.ts
        user.controller.ts
        user.module.ts
      deal/
        deal.entity.ts
        deal.service.ts
        deal.controller.ts
        deal.module.ts
      voucher/
        voucher.entity.ts
        voucher.controller.ts
        voucher.redeem.controller.ts
        voucher.module.ts
      submission/
        submission.entity.ts
        submission.controller.ts
        submission.module.ts

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Deal } from '../deal/deal.entity';
import { User } from '../user/user.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @ManyToOne(() => Deal, { eager: true })
  deal!: Deal;

  @ManyToOne(() => User, { eager: true })
  critic!: User;

  @Column({ type: 'varchar', default: 'pending' })
  status!: 'pending' | 'approved' | 'rejected';

  @Column({ type: 'text', nullable: true })
  message?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(@InjectRepository(Application) private repo: Repository<Application>) {}

  @Get()
  all() {
    return this.repo.find();
  }

  @Post()
  create(@Body() body: Partial<Application>) {
    return this.repo.save(this.repo.create(body));
  }
}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationController } from './application.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationController],
})
export class ApplicationModule {}

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Deal } from '../deal/deal.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @ManyToOne(() => User, { eager: true })
  from_user!: User;

  @ManyToOne(() => User, { eager: true })
  to_user!: User;

  @ManyToOne(() => Deal, { eager: true })
  deal!: Deal;

  @Column({ type: 'jsonb', default: {} })
  scores_json!: Record<string, any>;

  @Column({ type: 'text', nullable: true })
  comments?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';

@Controller('ratings')
export class RatingController {
  constructor(@InjectRepository(Rating) private repo: Repository<Rating>) {}

  @Get()
  all() {
    return this.repo.find();
  }

  @Post()
  create(@Body() body: Partial<Rating>) {
    return this.repo.save(this.repo.create(body));
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './rating.entity';
import { RatingController } from './rating.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rating])],
  controllers: [RatingController],
})
export class RatingModule {}

import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Deal } from '../deal/deal.entity';
import { User } from '../user/user.entity';

@Entity()
export class Dispute {
  @PrimaryGeneratedColumn('uuid') id!: string;

  @ManyToOne(() => Deal, { eager: true })
  deal!: Deal;

  @ManyToOne(() => User, { eager: true })
  opened_by!: User;

  @Column({ type: 'varchar' })
  reason!: string;

  @Column({ type: 'varchar', default: 'open' })
  status!: 'open' | 'resolved' | 'rejected';

  @Column({ type: 'text', nullable: true })
  resolution_notes?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date;
}

import { Controller, Get, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './dispute.entity';

@Controller('disputes')
export class DisputeController {
  constructor(@InjectRepository(Dispute) private repo: Repository<Dispute>) {}

  @Get()
  all() {
    return this.repo.find();
  }

  @Post()
  create(@Body() body: Partial<Dispute>) {
    return this.repo.save(this.repo.create(body));
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispute } from './dispute.entity';
import { DisputeController } from './dispute.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Dispute])],
  controllers: [DisputeController],
})
export class DisputeModule {}

TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'plateproof',
  autoLoadEntities: true,
  synchronize: true, // OK for dev, turn off later in real production
  ssl:
    process.env.DB_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined,
}), 

DB_SSL=false
