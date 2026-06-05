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

// This acts as our mock backend service for payment processing
export class EternaPaymentService {
  static async processPayment(data: {
    method: 'card' | 'paypal' | 'mobile_money',
    planId: string,
    amount: number,
    details: any
  }): Promise<{ success: boolean; transactionId: string; subscriptionLevel: string }> {
    // Simulate network delay and handshake with payment gateway
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
          subscriptionLevel: data.planId
        });
      }, 2500);
    });
  }
}
