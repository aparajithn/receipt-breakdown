import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // Fetch receipt
    const { data: receipt, error: receiptError } = await supabaseAdmin
      .from('receipts')
      .select('*')
      .eq('id', id)
      .single();

    if (receiptError || !receipt) {
      return NextResponse.json(
        { error: 'Receipt not found' },
        { status: 404 }
      );
    }

    // Fetch line items
    const { data: lineItems, error: lineItemsError } = await supabaseAdmin
      .from('line_items')
      .select('*')
      .eq('receipt_id', id)
      .order('created_at', { ascending: true });

    if (lineItemsError) {
      console.error('Line items fetch error:', lineItemsError);
      return NextResponse.json(
        { error: 'Failed to fetch line items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      receipt,
      lineItems: lineItems || []
    });
  } catch (error) {
    console.error('Receipt fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipt' },
      { status: 500 }
    );
  }
}
