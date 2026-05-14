// FR-2: Inventory table component
// Displays inventory items sorted by quantity (low stock first)
// Highlights items with qty < 5

import { useEffect } from 'react';

interface InventoryItem {
  id: string;
  sku: string | null;
  title: string;
  quantity: number;
  price: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
  isLoading: boolean;
}

// Day 12: Analytics helper - non-blocking event logging
async function logEvent(eventType: string, metadata?: Record<string, any>) {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType, metadata }),
    });
  } catch (err) {
    // Non-blocking - don't fail UI if logging fails
    console.error('Analytics event failed:', err);
  }
}

export default function InventoryTable({ items, isLoading }: InventoryTableProps) {
  // Day 12: Log inventory_viewed event when items load
  useEffect(() => {
    if (!isLoading && items.length > 0) {
      logEvent('inventory_viewed', { itemCount: items.length });
    }
  }, [isLoading, items.length]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">Loading inventory...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">No inventory items found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => {
              const isLowStock = item.quantity < 5;
              return (
                <tr
                  key={item.id}
                  className={isLowStock ? 'bg-yellow-50' : ''}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.sku || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={isLowStock ? 'font-semibold text-red-600' : 'text-gray-900'}>
                      {item.quantity}
                      {isLowStock && ' ⚠️'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.price}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile view - card layout */}
      <div className="md:hidden divide-y divide-gray-200">
        {items.map((item) => {
          const isLowStock = item.quantity < 5;
          return (
            <div
              key={item.id}
              className={`p-4 ${isLowStock ? 'bg-yellow-50' : ''}`}
            >
              <div className="font-semibold text-gray-900 mb-2">
                {item.title}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">SKU:</span>{' '}
                  <span className="text-gray-900">{item.sku || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>{' '}
                  <span className="text-gray-900">${item.price}</span>
                </div>
                <div>
                  <span className="text-gray-500">Quantity:</span>{' '}
                  <span className={isLowStock ? 'font-semibold text-red-600' : 'text-gray-900'}>
                    {item.quantity}
                    {isLowStock && ' ⚠️'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
