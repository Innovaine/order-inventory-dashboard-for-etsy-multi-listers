// ASSUMPTION: Using Etsy Open API v3 REST endpoints directly via axios
// Etsy SDK packages are often outdated; direct REST calls are more reliable for v1
// ASSUMPTION: API key is passed as x-api-key header (verify with Etsy docs)

import axios, { AxiosInstance } from 'axios';

interface EtsyShop {
  shop_id: number;
  shop_name: string;
  user_id: number;
}

interface EtsyListing {
  listing_id: number;
  title: string;
  quantity: number;
  price: {
    amount: number;
    divisor: number;
    currency_code: string;
  };
  sku?: string[];
}

interface EtsyReceipt {
  receipt_id: number;
  transactions: Array<{
    title: string;
    quantity: number;
  }>;
  status: string;
  create_timestamp: number;
}

export class EtsyClient {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: 'https://openapi.etsy.com/v3',
      headers: {
        'x-api-key': apiKey,
      },
      timeout: 10000, // 10s timeout per NFR-1
    });
  }

  /**
   * Verify API key by fetching authenticated user's shop info
   * Returns shop data if valid, throws if invalid
   */
  async verifyApiKey(): Promise<EtsyShop> {
    try {
      // ASSUMPTION: /application/shops endpoint returns shop for the authenticated app
      // If OAuth is required, this will need to call /users/me first
      const response = await this.client.get('/application/shops');
      if (response.data && response.data.results && response.data.results.length > 0) {
        return response.data.results[0];
      }
      throw new Error('No shop found for this API key');
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('API key invalid or expired');
      }
      throw new Error(`Failed to verify API key: ${error.message}`);
    }
  }

  /**
   * Fetch active listings (inventory) for a shop
   */
  async getInventory(shopId: string): Promise<EtsyListing[]> {
    try {
      const response = await this.client.get(`/application/shops/${shopId}/listings/active`, {
        params: {
          limit: 100, // Fetch up to 100 items per call
        },
      });
      return response.data.results || [];
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait 5 minutes.');
      }
      throw new Error(`Failed to fetch inventory: ${error.message}`);
    }
  }

  /**
   * Fetch recent receipts (orders) for a shop
   */
  async getOrders(shopId: string, limit: number = 30): Promise<EtsyReceipt[]> {
    try {
      const response = await this.client.get(`/application/shops/${shopId}/receipts`, {
        params: {
          limit,
          sort_on: 'created',
          sort_order: 'desc',
        },
      });
      return response.data.results || [];
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait 5 minutes.');
      }
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }
}
