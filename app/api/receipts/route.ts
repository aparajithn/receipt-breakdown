import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json(
      { error: 'Missing userId' },
      { status: 400 }
    );
  }

  try {
    const { data: receipts, error } = await supabaseAdmin
      .from('receipts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch receipts error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch receipts' },
        { status: 500 }
      );
    }

    return NextResponse.json({ receipts });
  } catch (error) {
    console.error('Receipts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch receipts' },
      { status: 500 }
    );
  }
}
