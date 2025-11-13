import { Controller, Get, Post, Body } from '@nestjs/common';
import { DisputeService } from './dispute.service';

@Controller('disputes')
export class DisputeController {
  constructor(private readonly disputeService: DisputeService) {}

  @Get()
  findAll() {
    return this.disputeService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.disputeService.create(body);
  }
}
