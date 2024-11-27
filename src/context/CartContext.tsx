'use client';
import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, change: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const showLoading = (message: string) => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setLoadingMessage('');
  };

  const addToCart = async (product: Product) => {
    showLoading('Adding to cart...');
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        }];
      });
    } finally {
      hideLoading();
    }
  };

  const removeFromCart = async (id: string) => {
    showLoading('Removing item...');
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    } finally {
      hideLoading();
    }
  };

  const updateQuantity = async (id: string, change: number) => {
    showLoading('Updating quantity...');
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        ).filter(item => item.quantity > 0)
      );
    } finally {
      hideLoading();
    }
  };

  const clearCart = async () => {
    showLoading('Clearing cart...');
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setCartItems([]);
    } finally {
      hideLoading();
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading,
    }}>
      <LoadingOverlay isLoading={isLoading} message={loadingMessage} />
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 