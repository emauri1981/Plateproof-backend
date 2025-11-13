export class Rating {
  id: string;
  userId: string;   // who rated
  dealId: string;   // what deal they rated
  score: number;    // 1–5 rating
  comment: string;  // optional text
}
