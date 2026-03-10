'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Receipt, LineItem } from '@/types';
import { format } from 'date-fns';
import { exportToCSV, downloadCSV } from '@/lib/export';

export default function ReceiptDetailPage({
  params,
}: {
  params: Promise<{ receiptId: string }>;
}) {
  const { receiptId } = use(params);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReceipt();
  }, [receiptId]);

  async function fetchReceipt() {
    try {
      const response = await fetch(`/api/receipts/${receiptId}`);
      const data = await response.json();
      setReceipt(data.receipt);
      setLineItems(data.lineItems);
    } catch (error) {
      console.error('Failed to fetch receipt:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleExport = () => {
    if (!receipt || !lineItems.length) return;
    
    const csvContent = exportToCSV(receipt, lineItems);
    const filename = `receipt-${receipt.supplier_name}-${receipt.receipt_date}.csv`;
    downloadCSV(csvContent, filename);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      lumber: 'bg-amber-100 text-amber-800',
      paint: 'bg-purple-100 text-purple-800',
      hardware: 'bg-gray-100 text-gray-800',
      tools: 'bg-blue-100 text-blue-800',
      electrical: 'bg-yellow-100 text-yellow-800',
      plumbing: 'bg-cyan-100 text-cyan-800',
      hvac: 'bg-green-100 text-green-800',
      consumables: 'bg-pink-100 text-pink-800',
      other: 'bg-slate-100 text-slate-800',
    };
    return colors[category] || colors.other;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading receipt...</p>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Receipt not found
          </h2>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <Link href="/dashboard">
              <Button variant="outline" className="mb-4">← Back to Dashboard</Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              {receipt.supplier_name}
            </h1>
            <p className="text-gray-600 mt-2">
              {format(new Date(receipt.receipt_date), 'MMMM d, yyyy')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-2">Total</p>
            <p className="text-4xl font-bold text-gray-900">
              ${receipt.receipt_total.toFixed(2)}
            </p>
            <Button onClick={handleExport} className="mt-4">
              Export to CSV
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <img
              src={receipt.image_url}
              alt="Receipt"
              className="w-full rounded-lg"
            />
          </Card>
          <div className="md:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Line Items</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Category</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lineItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.description}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ${item.unit_price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ${item.line_total.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>

        {/* Category Breakdown */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(
              lineItems.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + item.line_total;
                return acc;
              }, {} as Record<string, number>)
            )
              .sort((a, b) => b[1] - a[1])
              .map(([category, total]) => (
                <div
                  key={category}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                >
                  <Badge className={getCategoryColor(category)}>
                    {category}
                  </Badge>
                  <span className="font-semibold text-gray-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
