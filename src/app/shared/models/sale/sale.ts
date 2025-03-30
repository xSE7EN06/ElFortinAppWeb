export interface Sale {
    id: string;
    restaurant_id: string;
    restaurant_name?: string | null;
    report_date: Date;
    total_sales: string;
  }
  