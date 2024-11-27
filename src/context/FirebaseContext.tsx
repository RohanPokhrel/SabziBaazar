'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, Order } from '@/types';

interface FirebaseContextType {
  // Orders
  getOrders: (userId: string) => Promise<Order[]>;
  createOrder: (order: Omit<Order, 'id'>) => Promise<string>;
  updateOrderStatus: (orderId: string, status: string) => Promise<void>;
  
  // Products
  getProducts: () => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  updateProductStock: (productId: string, newStock: number) => Promise<void>;
  
  // Loading State
  isLoading: boolean;
  error: string | null;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Orders
  const getOrders = async (userId: string) => {
    setIsLoading(true);
    try {
      const ordersRef = collection(db, 'orders');
      const q = query(
        ordersRef, 
        where('userId', '==', userId),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
    } catch (err) {
      setError('Failed to fetch orders');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (order: Omit<Order, 'id'>) => {
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        ...order,
        date: new Date().toISOString()
      });
      return docRef.id;
    } catch (err) {
      setError('Failed to create order');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    setIsLoading(true);
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status });
    } catch (err) {
      setError('Failed to update order status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Products
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsRef);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (err) {
      setError('Failed to fetch products');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByCategory = async (category: string) => {
    setIsLoading(true);
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, where('category', '==', category));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (err) {
      setError('Failed to fetch products');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProductStock = async (productId: string, newStock: number) => {
    setIsLoading(true);
    try {
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, { stock: newStock });
    } catch (err) {
      setError('Failed to update product stock');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FirebaseContext.Provider value={{
      getOrders,
      createOrder,
      updateOrderStatus,
      getProducts,
      getProductsByCategory,
      updateProductStock,
      isLoading,
      error
    }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
} 