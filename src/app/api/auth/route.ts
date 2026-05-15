// FR-1: Etsy OAuth authentication initialization
// Returns OAuth URL for user to authorize the app

import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
import { EtsyClient } from '@/lib/etsy-client';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'get_oauth_url') {
      // Generate OAuth authorization URL
      const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback`;
      
      // Generate random state for CSRF protection
      const state = crypto.randomBytes(16).toString('hex');
      
      // TODO: Store state in session/cookie for verification in callback
      // For v1 single-user, we skip this validation
      
      const authUrl = EtsyClient.generateAuthUrl(redirectUri, state);
      
      return NextResponse.json({
        success: true,
        authUrl,
      });
    }

    // Backward compatibility: support old API key flow for testing
    // TODO: Remove this after OAuth is fully validated
    if (action === 'verify_api_key') {
      const { apiKey } = body;
      
      if (!apiKey || typeof apiKey !== 'string') {
        return NextResponse.json(
          { error: 'API key is required' },
          { status: 400 }
        );
      }

      // This is a legacy path - log a warning
      console.warn('DEPRECATED: API key auth is deprecated, use OAuth flow');
      
      return NextResponse.json(
        { error: 'API key authentication is no longer supported. Please use OAuth flow.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action. Use action=get_oauth_url' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('shopId');
  return response;
}
