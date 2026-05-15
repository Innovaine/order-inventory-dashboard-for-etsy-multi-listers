// Etsy Open API v3 client with OAuth 2.0 support
// https://developers.etsy.com/documentation/reference

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
  state: string;
}

interface EtsyReceipt {
  receipt_id: number;
  transactions: Array<{
    title: string;
    quantity: number;
    transaction_id: number;
  }>;
  status: string;
  create_timestamp: number;
  buyer_email?: string;
  name?: string;
}

interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export class EtsyClient {
  private client: AxiosInstance;
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.client = axios.create({
      baseURL: 'https://openapi.etsy.com/v3',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-api-key': process.env.ETSY_API_KEY || '', // ASSUMPTION: Keystring set in env
      },
      timeout: 10000,
    });
  }

  /**
   * Verify OAuth token by fetching authenticated user's data
   * Returns user info if valid, throws if invalid
   */
  async verifyToken(): Promise<{ user_id: number }> {
    try {
      const response = await this.client.get('/application/users/me');
      if (response.data && response.data.user_id) {
        return response.data;
      }
      throw new Error('Failed to verify token - no user data returned');
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        throw new Error('OAuth token invalid or expired. Please reconnect your shop.');
      }
      throw new Error(`Failed to verify token: ${error.message}`);
    }
  }

  /**
   * Get the user's shop information
   */
  async getUserShops(userId: number): Promise<EtsyShop[]> {
    try {
      const response = await this.client.get(`/application/users/${userId}/shops`);
      return response.data.results || [];
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait 5 minutes.');
      }
      throw new Error(`Failed to fetch shops: ${error.message}`);
    }
  }

  /**
   * Fetch active listings (inventory) for a shop
   */
  async getInventory(shopId: string): Promise<EtsyListing[]> {
    try {
      const response = await this.client.get(`/application/shops/${shopId}/listings/active`, {
        params: {
          limit: 100,
          includes: 'Shipping,Images',
        },
      });
      return response.data.results || [];
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Rate limit exceeded. Please wait 5 minutes.');
      }
      if (error.response?.status === 404) {
        throw new Error('Shop not found or you don\'t have permission to access it.');
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
      if (error.response?.status === 404) {
        throw new Error('Shop not found or you don\'t have permission to access it.');
      }
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  /**
   * Exchange OAuth authorization code for access token
   * ASSUMPTION: This runs server-side after OAuth callback
   */
  static async exchangeCodeForToken(
    code: string,
    redirectUri: string
  ): Promise<OAuthTokenResponse> {
    const clientId = process.env.ETSY_CLIENT_ID;
    const clientSecret = process.env.ETSY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('ETSY_CLIENT_ID and ETSY_CLIENT_SECRET must be set in environment');
    }

    try {
      const response = await axios.post(
        'https://api.etsy.com/v3/public/oauth/token',
        new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          redirect_uri: redirectUri,
          code: code,
          code_verifier: 'PLACEHOLDER', // TODO: Implement PKCE flow for production
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: clientId,
            password: clientSecret,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error('Invalid authorization code or redirect URI');
      }
      throw new Error(`OAuth token exchange failed: ${error.message}`);
    }
  }

  /**
   * Refresh an expired access token using refresh token
   */
  static async refreshAccessToken(refreshToken: string): Promise<OAuthTokenResponse> {
    const clientId = process.env.ETSY_CLIENT_ID;
    const clientSecret = process.env.ETSY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('ETSY_CLIENT_ID and ETSY_CLIENT_SECRET must be set in environment');
    }

    try {
      const response = await axios.post(
        'https://api.etsy.com/v3/public/oauth/token',
        new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: clientId,
          refresh_token: refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: clientId,
            password: clientSecret,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  /**
   * Generate OAuth authorization URL for user to visit
   * ASSUMPTION: Using state parameter for CSRF protection
   */
  static generateAuthUrl(redirectUri: string, state: string): string {
    const clientId = process.env.ETSY_CLIENT_ID;
    if (!clientId) {
      throw new Error('ETSY_CLIENT_ID must be set in environment');
    }

    const scopes = [
      'listings_r',      // Read listings (inventory)
      'transactions_r',  // Read transactions (orders)
      'shops_r',         // Read shop info
    ];

    const params = new URLSearchParams({
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      client_id: clientId,
      state: state,
      code_challenge: 'PLACEHOLDER', // TODO: Implement PKCE
      code_challenge_method: 'S256',
    });

    return `https://www.etsy.com/oauth/connect?${params.toString()}`;
  }
}
