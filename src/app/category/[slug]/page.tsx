'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';
import { allProducts } from '@/components/product/ProductGrid';
import BackButton from '@/components/ui/BackButton';

// Flatten all products into a single array
const flattenedProducts = Object.values(allProducts).flat();

export default function CategoryPage() {
  const { slug } = useParams();
  const router = useRouter();
  const categoryName = typeof slug === 'string' ? slug.charAt(0).toUpperCase() + slug.slice(1) : '';

  // Filter products by category
  const categoryProducts = flattenedProducts.filter(
    product => product.category.toLowerCase() === slug
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Replace existing back button with BackButton component */}
        <BackButton className="mb-6" />
        
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
          <p className="text-gray-600 mt-2">
            {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'} available
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {/* Empty State */}
        {categoryProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              No products found in this category
            </h2>
            <button
              onClick={handleBack}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Browse all products
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 