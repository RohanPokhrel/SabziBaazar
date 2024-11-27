import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import { FiShoppingCart, FiStar, FiCreditCard, FiShoppingBag } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  // Calculate "original" price by adding 20-40% to actual price
  const originalPrice = product.discount 
    ? (product.price * (100 + product.discount) / 100).toFixed(2)
    : (product.price * 1.3).toFixed(2);

  // Generate random sold count for demo
  const soldCount = Math.floor(Math.random() * 1000) + 50;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200"
    >
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {product.discount && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm"
          >
            -{product.discount}%
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center"
        >
          <FiShoppingBag className="w-3 h-3 mr-1" />
          {soldCount.toLocaleString()}+ sold
        </motion.div>
      </div>
      <div className="p-4">
        <motion.h3 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg font-semibold text-gray-900 truncate"
        >
          {product.name}
        </motion.h3>
        <div className="flex items-center justify-between mt-1">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <FiStar className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </motion.div>
          <motion.div 
            className="text-xs text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(product.stock / 100) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <span className="ml-2">{product.stock} left</span>
            </div>
          </motion.div>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-1 text-gray-600 text-sm line-clamp-2"
        >
          {product.description}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${originalPrice}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product)}
              className="w-12 bg-green-600 text-white p-2 rounded-lg flex items-center justify-center hover:bg-green-700 transition-all"
              title="Add to Cart"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FiShoppingCart className="w-6 h-6" />
              </motion.div>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all text-sm font-medium group"
              title="Buy Now"
            >
              <motion.div
                className="mr-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FiCreditCard className="w-5 h-5" />
              </motion.div>
              <span className="group-hover:translate-x-1 transition-transform">
                Buy Now
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 