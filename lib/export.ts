import Papa from 'papaparse';
import { LineItem, Receipt } from '@/types';

export interface ExportRow {
  supplier: string;
  date: string;
  description: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  category: string;
}

export function exportToCSV(receipt: Receipt, lineItems: LineItem[]): string {
  const rows: ExportRow[] = lineItems.map(item => ({
    supplier: receipt.supplier_name,
    date: receipt.receipt_date,
    description: item.description,
    quantity: item.quantity,
    unit_price: item.unit_price,
    line_total: item.line_total,
    category: item.category
  }));

  return Papa.unparse(rows);
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
