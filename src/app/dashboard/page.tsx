'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import InventoryTable from '@/components/InventoryTable';
import OrdersTable from '@/components/OrdersTable';
import SyncStatus from '@/components/SyncStatus';

export default function DashboardPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch session from server (httpOnly cookie)
  const { data: sessionData, isLoading: sessionLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const res = await fetch('/api/session');
      if (!res.ok) {
        if (res.status === 401) {
          router.push('/');
          throw new Error('Not authenticated');
        }
        throw new Error('Failed to fetch session');
      }
      return res.json();
    },
    retry: false,
  });

  const shopId = sessionData?.shop?.id;
  const shopName = sessionData?.shop?.shopName;

  const { data: inventoryData, isLoading: inventoryLoading } = useQuery({
    queryKey: ['inventory', shopId],
    queryFn: async () => {
      const res = await fetch('/api/inventory');
      if (!res.ok) throw new Error('Failed to fetch inventory');
      return res.json();
    },
    enabled: !!shopId,
    refetchInterval: 30 * 60 * 1000, // Auto-refresh every 30 minutes
  });

  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['orders', shopId],
    queryFn: async () => {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Failed to fetch orders');
      return res.json();
    },
    enabled: !!shopId,
    refetchInterval: 30 * 60 * 1000,
  });

  const handleSync = async () => {
    if (!shopId) return;

    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (res.ok) {
        // Invalidate queries to refetch data
        queryClient.invalidateQueries({ queryKey: ['inventory', shopId] });
        queryClient.invalidateQueries({ queryKey: ['orders', shopId] });
      }
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  const handleExportCSV = async () => {
    if (!shopId) return;

    try {
      const res = await fetch('/api/export-csv');
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `inventory-${shopName}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  if (sessionLoading || !shopId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {shopName || 'Etsy Dashboard'}
              </h1>
              <SyncStatus
                lastSyncedAt={inventoryData?.lastSyncedAt}
                syncStatus={inventoryData?.syncStatus}
                syncError={inventoryData?.syncError}
                onSync={handleSync}
              />
            </div>
            <button
              onClick={handleExportCSV}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Inventory
            </h2>
            <InventoryTable
              items={inventoryData?.items || []}
              isLoading={inventoryLoading}
            />
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Orders
            </h2>
            <OrdersTable
              orders={ordersData?.orders || []}
              isLoading={ordersLoading}
            />
          </section>
        </div>
      </main>
    </div>
  );
}
