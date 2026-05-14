// FR-5: Manual sync endpoint
// Triggers immediate fetch of inventory and orders from Etsy API

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { EtsyClient } from '@/lib/etsy-client';

export async function POST(request: NextRequest) {
  try {
    // Read shopId from httpOnly cookie (set during auth)
    const shopId = request.cookies.get('shopId')?.value;

    if (!shopId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Fetch shop and API key
    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      return NextResponse.json(
        { error: 'Shop not found' },
        { status: 404 }
      );
    }

    // Update sync status
    await prisma.shop.update({
      where: { id: shopId },
      data: { syncStatus: 'syncing', syncError: null },
    });

    const etsyClient = new EtsyClient(shop.apiKey);

    try {
      // Fetch inventory
      const listings = await etsyClient.getInventory(shop.shopId);

      // Clear old inventory and insert new
      await prisma.inventoryItem.deleteMany({
        where: { shopId: shop.id },
      });

      await prisma.inventoryItem.createMany({
        data: listings.map((listing) => ({
          shopId: shop.id,
          listingId: listing.listing_id.toString(),
          sku: listing.sku?.[0] || null,
          title: listing.title,
          quantity: listing.quantity,
          price: `${listing.price.amount / listing.price.divisor}`,
        })),
      });

      // Fetch orders
      const receipts = await etsyClient.getOrders(shop.shopId, 30);

      // Clear old orders and insert new
      await prisma.order.deleteMany({
        where: { shopId: shop.id },
      });

      const ordersToCreate = receipts.flatMap((receipt) =>
        receipt.transactions.map((transaction) => ({
          shopId: shop.id,
          orderId: receipt.receipt_id.toString(),
          itemTitle: transaction.title,
          quantity: transaction.quantity,
          status: receipt.status,
          orderDate: new Date(receipt.create_timestamp * 1000),
        }))
      );

      if (ordersToCreate.length > 0) {
        await prisma.order.createMany({
          data: ordersToCreate,
          skipDuplicates: true,
        });
      }

      // Update sync status
      await prisma.shop.update({
        where: { id: shopId },
        data: {
          syncStatus: 'success',
          lastSyncedAt: new Date(),
          syncError: null,
        },
      });

      return NextResponse.json({
        success: true,
        syncedAt: new Date().toISOString(),
      });
    } catch (error: any) {
      // Update sync status with error
      await prisma.shop.update({
        where: { id: shopId },
        data: {
          syncStatus: 'error',
          syncError: error.message,
        },
      });

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
