// FR-3: Fetch orders data from database
// Returns cached order records for display

import { NextRequest, NextResponse } from 'next/server';
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

    const orders = await prisma.order.findMany({
      where: { shopId: shop.id },
      orderBy: { orderDate: 'desc' }, // Newest first per FR-3
      take: 30,
    });

    return NextResponse.json({
      orders,
      lastSyncedAt: shop.lastSyncedAt,
    });
  } catch (error: any) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
