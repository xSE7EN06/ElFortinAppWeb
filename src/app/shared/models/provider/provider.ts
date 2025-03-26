export interface Provider {
    id: string;
    name: string;
    contact_info: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
  }
  