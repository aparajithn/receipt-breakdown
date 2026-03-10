'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Receipt } from '@/types';
import { format } from 'date-fns';

// Mock user ID for demo (in production, use auth)
const DEMO_USER_ID = 'demo-user';

export default function DashboardPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipts();
  }, []);

  async function fetchReceipts() {
    try {
      const response = await fetch(`/api/receipts?userId=${DEMO_USER_ID}`);
      const data = await response.json();
      setReceipts(data.receipts || []);
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Receipt Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage and track your receipts</p>
          </div>
          <Link href="/dashboard/upload">
            <Button size="lg">Upload New Receipt</Button>
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading receipts...</p>
          </div>
        ) : receipts.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No receipts yet
            </h2>
            <p className="text-gray-600 mb-6">
              Upload your first receipt to get started
            </p>
            <Link href="/dashboard/upload">
              <Button size="lg">Upload Receipt</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4">
            {receipts.map(receipt => (
              <Link key={receipt.id} href={`/dashboard/${receipt.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {receipt.supplier_name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {format(new Date(receipt.receipt_date), 'MMMM d, yyyy')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${receipt.receipt_total.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(receipt.created_at), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
