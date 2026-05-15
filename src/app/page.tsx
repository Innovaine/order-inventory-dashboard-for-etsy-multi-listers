'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  // Check for OAuth errors in URL
  useEffect(() => {
    const oauthError = searchParams?.get('error');
    if (oauthError) {
      const errorMessages: Record<string, string> = {
        access_denied: 'You denied access to your Etsy shop. Please try again if this was a mistake.',
        missing_code: 'OAuth authorization failed. Please try again.',
        token_exchange_failed: 'Failed to exchange authorization code. Please try again.',
        token_verification_failed: 'Failed to verify your Etsy credentials. Please try again.',
        failed_to_fetch_shops: 'Could not fetch your shop information. Make sure you have an active Etsy shop.',
        no_shops_found: 'No Etsy shops found for your account. Please create a shop first.',
        internal_server_error: 'An internal error occurred. Please try again.',
      };
      setError(errorMessages[oauthError] || `Error: ${oauthError}`);
    }
  }, [searchParams]);

  const handleConnectShop = async () => {
    setError('');
    setLoading(true);

    try {
      // Request OAuth URL from backend
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_oauth_url' }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to initialize OAuth flow');
        setLoading(false);
        return;
      }

      // Redirect to Etsy OAuth page
      window.location.href = data.authUrl;
    } catch (err: any) {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Etsy Dashboard
          </h1>
          <p className="text-gray-600">
            Track your Etsy inventory and orders in one place
          </p>
        </div>

        {error && (
          <div role="alert" className="mb-4 text-red-600 text-sm bg-red-50 p-4 rounded-md border border-red-200">
            {error}
          </div>
        )}

        <button
          onClick={handleConnectShop}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {loading ? 'Connecting...' : 'Connect Your Etsy Shop'}
        </button>

        <div className="mt-6 text-sm text-gray-500 space-y-2">
          <p className="font-medium text-gray-700">What you'll get:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>View all active inventory with stock levels</li>
            <li>Track recent orders (last 30 days)</li>
            <li>Export inventory to CSV</li>
            <li>One-click sync with your Etsy shop</li>
          </ul>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-800">
            <strong>Secure OAuth:</strong> You'll be redirected to Etsy to authorize this app.
            We never see your Etsy password, and you can revoke access anytime from your Etsy account settings.
          </p>
        </div>

        <p className="mt-6 text-xs text-gray-500 text-center">
          Need help? Check out our{' '}
          <a href="/QUICKSTART.md" className="text-blue-600 hover:underline" target="_blank" rel="noopener">
            Quick Start Guide
          </a>
          {' '}or{' '}
          <a href="mailto:feedback@innovaine.com" className="text-blue-600 hover:underline">
            send us feedback
          </a>.
        </p>
      </div>
    </div>
  );
}
