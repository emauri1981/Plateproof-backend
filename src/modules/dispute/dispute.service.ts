import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispute } from './dispute.entity';

@Injectable()
export class DisputeService {
  constructor(
    @InjectRepository(Dispute)
    private repo: Repository<Dispute>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(body: Partial<Dispute>) {
    const dispute = this.repo.create(body);
    return this.repo.save(dispute);
  }
}
