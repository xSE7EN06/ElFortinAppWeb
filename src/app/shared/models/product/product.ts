export interface Product {
    id: string;
    restaurantId?: string | null;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    categoryName: string;
    preTaxCost: string;
    postTaxCost: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null; 
 }
  