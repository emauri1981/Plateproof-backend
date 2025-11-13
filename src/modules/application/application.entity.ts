export class Application {
  id: string;
  userId: string;
  dealId: string;
  status: 'pending' | 'approved' | 'rejected';
  message: string;
}
