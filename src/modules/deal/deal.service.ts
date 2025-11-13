import { Injectable } from '@nestjs/common';

@Injectable()
export class DealService {
  private deals = [];

  findAll() {
    return this.deals;
  }

  create(body: any) {
    const newDeal = { id: Date.now(), ...body };
    this.deals.push(newDeal);
    return newDeal;
  }
}
