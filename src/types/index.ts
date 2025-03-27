
export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  address?: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  tags?: string[];
  variants?: ProductVariant[];
  // Added fields to fix type errors
  stock?: number;
  discountPrice?: number;
  featured?: boolean;
  benefits?: string[];
  ingredients?: string[];
  howToUse?: string[];
  updatedAt?: string | Date;
  createdAt?: string | Date;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  options: VariantOption[];
}

export interface VariantOption {
  name: string;
  value: string;
}

export type ProductCategory = 
  | 'supplement' 
  | 'equipment' 
  | 'accessory' 
  | 'clothing' 
  | 'service' 
  | 'plan' 
  | 'guide'
  // Added categories to fix type errors
  | 'proteina'
  | 'creatina'
  | 'pre-entreno'
  | 'aminoacidos'
  | 'vitaminas'
  | 'energia'
  | 'recuperacion'
  | 'otros';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'entregado' | 'procesando' | 'enviado' | 'pendiente' | 'cancelado';
  createdAt?: string | Date;
  shippingAddress?: string;
  shippingMethod?: ShippingMethod;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  deliveryTime: string;
  description?: string;
  estimatedDelivery?: string;
}
