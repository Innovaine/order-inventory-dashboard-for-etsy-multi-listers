// FR-1: Etsy API key input & authentication
// Accepts API key, validates with Etsy, stores shop info in DB

import { NextRequest, NextResponse } from 'next/server';
import { EtsyClient } from '@/lib/etsy-client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { apiKey } = body;

    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json(
        { error: 'API key is required' },
        { status: 400 }
      );
    }

    // Validate API key with Etsy
    const etsyClient = new EtsyClient(apiKey);
    let shopData;
    try {
      shopData = await etsyClient.verifyApiKey();
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || 'API key invalid or expired' },
        { status: 401 }
      );
    }

    // ASSUMPTION: Single user for v1 (no multi-user auth yet)
    // Find or create default user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: null, // No email collection in v1
        },
      });
    }

    // Store or update shop
    const shop = await prisma.shop.upsert({
      where: {
        shopId: shopData.shop_id.toString(),
      },
      create: {
        userId: user.id,
        shopId: shopData.shop_id.toString(),
        shopName: shopData.shop_name,
        apiKey: apiKey, // WARNING: Plain text storage. Encrypt post-revenue.
        syncStatus: 'idle',
      },
      update: {
        shopName: shopData.shop_name,
        apiKey: apiKey,
        syncStatus: 'idle',
        syncError: null,
      },
    });

    return NextResponse.json({
      success: true,
      shop: {
        id: shop.id,
        shopId: shop.shopId,
        shopName: shop.shopName,
      },
    });
  } catch (error: any) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
