import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApplicationService } from './application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  all() {
    return this.applicationService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.applicationService.create(body);
  }
}
