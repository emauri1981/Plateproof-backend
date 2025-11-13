import { Injectable } from '@nestjs/common';
import { Rating } from './rating.entity';

@Injectable()
export class RatingService {
  private ratings: Rating[] = [];

  findAll() {
    return this.ratings;
  }

  create(body: Partial<Rating>) {
    const newRating: Rating = {
      id: Date.now().toString(),
      userId: body.userId ?? '',
      dealId: body.dealId ?? '',
      score: body.score ?? 0,
      comment: body.comment ?? '',
    };

    this.ratings.push(newRating);
    return newRating;
  }
}
