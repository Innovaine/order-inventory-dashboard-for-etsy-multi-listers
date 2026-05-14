// FR-4: CSV export of inventory snapshot
// Generates downloadable CSV file with SKU, Title, Quantity, Price

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const shopId = searchParams.get('shopId');

    if (!shopId) {
      return NextResponse.json(
        { error: 'Shop ID is required' },
        { status: 400 }
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
      orderBy: { quantity: 'asc' },
    });

    // Generate CSV content
    const csvHeader = 'SKU,Title,Quantity,Price\n';
    const csvRows = items
      .map((item) => {
        const sku = item.sku || 'N/A';
        const title = `"${item.title.replace(/"/g, '""')}"`;
        const quantity = item.quantity;
        const price = item.price;
        return `${sku},${title},${quantity},${price}`;
      })
      .join('\n');

    const csv = csvHeader + csvRows;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="inventory-${shop.shopName}-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    console.error('CSV export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
