// OAuth callback handler for Etsy authentication
// Receives authorization code, exchanges for access token, stores in DB

import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering - this route handles OAuth callbacks
export const dynamic = 'force-dynamic';
import { EtsyClient } from '@/lib/etsy-client';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth errors (user denied access, etc.)
    if (error) {
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/?error=missing_code', request.url)
      );
    }

    // TODO: Verify state parameter matches session (CSRF protection)
    // For v1, we skip this since we're single-user

    // Exchange code for access token
    const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/callback`;
    
    let tokenData;
    try {
      tokenData = await EtsyClient.exchangeCodeForToken(code, redirectUri);
    } catch (error: any) {
      console.error('Token exchange failed:', error);
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('token_exchange_failed')}`, request.url)
      );
    }

    // Verify token and get user info
    const etsyClient = new EtsyClient(tokenData.access_token);
    let userData;
    try {
      userData = await etsyClient.verifyToken();
    } catch (error: any) {
      console.error('Token verification failed:', error);
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('token_verification_failed')}`, request.url)
      );
    }

    // Get user's shops
    let shops;
    try {
      shops = await etsyClient.getUserShops(userData.user_id);
    } catch (error: any) {
      console.error('Failed to fetch shops:', error);
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent('failed_to_fetch_shops')}`, request.url)
      );
    }

    if (!shops || shops.length === 0) {
      return NextResponse.redirect(
        new URL('/?error=no_shops_found', request.url)
      );
    }

    // ASSUMPTION: Single shop for v1 (use first shop if user has multiple)
    const primaryShop = shops[0];

    // Find or create user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: null, // No email in OAuth response for basic scope
        },
      });
    }

    // Store shop with OAuth tokens
    const shop = await prisma.shop.upsert({
      where: {
        shopId: primaryShop.shop_id.toString(),
      },
      create: {
        userId: user.id,
        shopId: primaryShop.shop_id.toString(),
        shopName: primaryShop.shop_name,
        apiKey: tokenData.access_token, // Store access token (rename field post-revenue)
        refreshToken: tokenData.refresh_token, // Store for token refresh
        syncStatus: 'idle',
      },
      update: {
        shopName: primaryShop.shop_name,
        apiKey: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        syncStatus: 'idle',
        syncError: null,
      },
    });

    // Set httpOnly cookie for session
    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    
    response.cookies.set('shopId', shop.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(`/?error=${encodeURIComponent('internal_server_error')}`, request.url)
    );
  }
}
