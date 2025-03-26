export interface Order {
    id: number;
    table_number: number;
    restaurant_id: string;
    order_date: string;
    total_amount: string;
    client_id: string;
    pre_tax_total: string;
    post_tax_total: string;
    payment_method_id: string;
    status_id: string;
    order_type: string;
    discount_id: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  }
  