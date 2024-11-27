export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface CartItem {
  product: Product;
  quantity: number;
} 