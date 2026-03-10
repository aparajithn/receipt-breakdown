-- Create receipts table
CREATE TABLE IF NOT EXISTS receipts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  supplier_name TEXT NOT NULL,
  receipt_date DATE NOT NULL,
  receipt_total NUMERIC(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create line_items table
CREATE TABLE IF NOT EXISTS line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_id UUID NOT NULL REFERENCES receipts(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity NUMERIC(10,2) NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  line_total NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_receipts_user_id ON receipts(user_id);
CREATE INDEX IF NOT EXISTS idx_line_items_receipt_id ON line_items(receipt_id);

-- Enable Row Level Security
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE line_items ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for demo - in production, restrict by user_id)
CREATE POLICY IF NOT EXISTS "Allow all receipts operations" ON receipts FOR ALL USING (true);
CREATE POLICY IF NOT EXISTS "Allow all line_items operations" ON line_items FOR ALL USING (true);

-- Create storage bucket for receipts
INSERT INTO storage.buckets (id, name, public)
VALUES ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy
CREATE POLICY IF NOT EXISTS "Allow all receipt uploads" ON storage.objects FOR ALL USING (bucket_id = 'receipts');
