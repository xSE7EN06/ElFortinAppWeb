export interface Promotion {
    id: string;
    code: string;
    description: string;
    discount_type: string;
    value: string;
    start_date: Date;
    end_date: Date;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  }
  