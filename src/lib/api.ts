export const fetchMainActors = async (movieId: string) => {
  const res = await fetch(`/api/movies/titles/${movieId}/main_actors`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch actors');
  return data.results || [];
};

export const fetchActorNews = async (actorId: string) => {
  const res = await fetch(`/api/movies/actors/news/${actorId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch news');
  return data.data?.news?.edges?.map((e: any) => e.node) || [];
};

export type PaymentMethod = 'visa' | 'mastercard' | 'amex' | 'paypal' | 'google_pay' | 'apple_pay' | 'mobile_money';

export interface PaymentRequest {
  method: PaymentMethod;
  planId: 'premium_monthly' | 'premium_yearly' | string;
  amount: number;
  currency: string;
  userId?: string;
  userEmail?: string;
  metadata?: Record<string, unknown>;
  details?: Record<string, unknown>;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  subscriptionLevel: string;
  status: 'requires_redirect' | 'authorized' | 'captured' | 'failed';
  redirectUrl?: string;
  syncedSystems: Array<'normal_user' | 'partner_platform' | 'super_admin_command_centre'>;
}

export class EternaPaymentService {
  static async processPayment(data: PaymentRequest): Promise<PaymentResult> {
    const res = await fetch('/api/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.error || 'Failed to process payment');
    return payload;
  }
}
