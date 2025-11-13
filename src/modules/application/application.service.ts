import { Injectable } from '@nestjs/common';
import { Application } from './application.entity';

@Injectable()
export class ApplicationService {
  private applications: Application[] = [];

  findAll() {
    return this.applications;
  }

  create(body: Partial<Application>) {
    const newApplication: Application = {
      id: Date.now().toString(),
      userId: body.userId ?? '',
      dealId: body.dealId ?? '',
      status: body.status ?? 'pending',
      message: body.message ?? '',
    };

    this.applications.push(newApplication);
    return newApplication;
  }
}
