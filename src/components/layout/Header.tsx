'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiSearch } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { cartItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // Check localStorage for user data
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="bg-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            GroceryStore
          </Link>
          
          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
              />
              <FiSearch className="absolute right-3 top-2.5 text-gray-500" size={20} />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/cart" className="flex items-center relative group">
              <div className="relative">
                <FiShoppingCart size={24} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                    >
                      {itemCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <span className="ml-2 group-hover:text-gray-100 transition-colors">Cart</span>
            </Link>

            {user ? (
              <Link 
                href="/account" 
                className="flex items-center space-x-2 hover:text-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium">{user.name}</span>
              </Link>
            ) : (
              <Link href="/login" className="flex items-center hover:text-gray-100 transition-colors">
                <FiUser size={24} />
                <span className="ml-2">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
} 