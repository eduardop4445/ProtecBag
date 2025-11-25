export interface StockMovement {
  id?: string;
  productId: string;
  type: number; 
  quantity: number;
  date: string;
  notes?: string;

  productName?: string;
}
