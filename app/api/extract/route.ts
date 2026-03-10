import { NextRequest, NextResponse } from 'next/server';
import { extractReceiptData } from '@/lib/openai';
import { categorizeItem } from '@/lib/categorize';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, userId } = await request.json();

    if (!imageUrl || !userId) {
      return NextResponse.json(
        { error: 'Missing imageUrl or userId' },
        { status: 400 }
      );
    }

    // Extract data using GPT-4o Vision
    const extractionResult = await extractReceiptData(imageUrl);

    // Create receipt record
    const { data: receipt, error: receiptError } = await supabaseAdmin
      .from('receipts')
      .insert({
        user_id: userId,
        supplier_name: extractionResult.supplier_name,
        receipt_date: extractionResult.receipt_date,
        receipt_total: extractionResult.receipt_total,
        image_url: imageUrl
      })
      .select()
      .single();

    if (receiptError || !receipt) {
      console.error('Receipt creation error:', receiptError);
      return NextResponse.json(
        { error: 'Failed to create receipt' },
        { status: 500 }
      );
    }

    // Create line items with auto-categorization
    const lineItemsToInsert = extractionResult.line_items.map(item => ({
      receipt_id: receipt.id,
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      line_total: item.line_total,
      category: categorizeItem(item.description)
    }));

    const { data: lineItems, error: lineItemsError } = await supabaseAdmin
      .from('line_items')
      .insert(lineItemsToInsert)
      .select();

    if (lineItemsError) {
      console.error('Line items creation error:', lineItemsError);
      return NextResponse.json(
        { error: 'Failed to create line items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      receipt,
      lineItems
    });
  } catch (error) {
    console.error('Extraction error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Extraction failed' },
      { status: 500 }
    );
  }
}
