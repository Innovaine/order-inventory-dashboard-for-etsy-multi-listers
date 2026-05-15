// FR-2: Fetch inventory data from database
// Returns cached inventory items for display

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Read shopId from httpOnly cookie (set during auth)
    const shopId = request.cookies.get('shopId')?.value;

    if (!shopId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      return NextResponse.json(
        { error: 'Shop not found' },
        { status: 404 }
      );
    }

    const items = await prisma.inventoryItem.findMany({
      where: { shopId: shop.id },
      orderBy: { quantity: 'asc' }, // Low stock first per FR-2
    });

    return NextResponse.json({
      items,
      lastSyncedAt: shop.lastSyncedAt,
      syncStatus: shop.syncStatus,
      syncError: shop.syncError,
    });
  } catch (error: any) {
    console.error('Inventory fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
