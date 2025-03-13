export interface Sale {
    id: string;
    restaurant_id: number;
    restaurant_name: string | null;
    report_date: Date;
    pdf_url: string;
    total_sales: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  }
  