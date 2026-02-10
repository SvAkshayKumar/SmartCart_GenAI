
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  code: string;
  discount: number; // multiplier, e.g., 0.1 for 10%
}
