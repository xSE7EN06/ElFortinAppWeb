export interface Order {
  id: string;
  table_number: number;
  restaurant_id: string;
  order_date: string;
  total_amount: string;
  client_id: string | null;
  pre_tax_total: string;
  post_tax_total: string;
  payment_method_name: string;  // Cambiado de payment_method_id
  status_name: string;         // Cambiado de status_id
  order_type: string;
  discount_id: string | null;
}