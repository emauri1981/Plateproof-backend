import { Controller, Get, Post, Body } from '@nestjs/common';
import { RatingService } from './rating.service';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  all() {
    return this.ratingService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.ratingService.create(body);
  }
}
