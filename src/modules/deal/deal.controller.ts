import { Controller, Get, Post, Body } from '@nestjs/common';
import { DealService } from './deal.service';

@Controller('deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  all() {
    return this.dealService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.dealService.create(body);
  }
}
