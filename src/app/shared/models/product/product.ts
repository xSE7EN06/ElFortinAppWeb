export interface Product {
    id: string;
    restaurantId?: string | null;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category_name: string;
    pre_tax_cost: number;
    post_tax_cost: number;
 }
  