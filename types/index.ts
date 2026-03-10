export type Category = 
  | 'lumber'
  | 'paint'
  | 'hardware'
  | 'tools'
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'consumables'
  | 'other';

export interface Receipt {
  id: string;
  user_id: string;
  supplier_name: string;
  receipt_date: string;
  receipt_total: number;
  image_url: string;
  created_at: string;
}

export interface LineItem {
  id: string;
  receipt_id: string;
  description: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  category: Category;
  created_at: string;
}

export interface ExtractionResult {
  supplier_name: string;
  receipt_date: string;
  receipt_total: number;
  line_items: {
    description: string;
    quantity: number;
    unit_price: number;
    line_total: number;
  }[];
}
