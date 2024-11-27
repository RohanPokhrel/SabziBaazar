import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '@/types';

// Mock data with cloud-hosted images
export const allProducts: Record<string, Product[]> = {
  flashDeals: [
    {
      id: '1',
      name: 'Fresh Organic Apples',
      description: 'Sweet and juicy red apples from local farms',
      price: 2.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
      stock: 50,
      rating: 4.5,
      reviews: [],
      discount: 20,
    },
    {
      id: '2',
      name: 'Organic Bananas',
      description: 'Fresh yellow bananas, perfect for smoothies',
      price: 1.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224',
      stock: 75,
      rating: 4.3,
      reviews: [],
      discount: 15,
    },
    {
      id: '3',
      name: 'Fresh Strawberries',
      description: 'Sweet and juicy strawberries',
      price: 3.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6',
      stock: 30,
      rating: 4.7,
      reviews: [],
      discount: 25,
    },
    {
      id: '4',
      name: 'Premium Oranges',
      description: 'Sweet and juicy oranges',
      price: 3.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1547514701-42782101795e',
      stock: 40,
      rating: 4.6,
      reviews: [],
      discount: 15,
    },
    {
      id: '5',
      name: 'Fresh Mangoes',
      description: 'Ripe and sweet mangoes',
      price: 4.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
      stock: 25,
      rating: 4.8,
      reviews: [],
      discount: 30,
    },
    {
      id: '6',
      name: 'Organic Grapes',
      description: 'Sweet seedless grapes',
      price: 5.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f',
      stock: 35,
      rating: 4.4,
      reviews: [],
      discount: 10,
    },
    {
      id: '7',
      name: 'Fresh Pineapple',
      description: 'Sweet and juicy pineapple',
      price: 4.49,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba',
      stock: 20,
      rating: 4.9,
      reviews: [],
      discount: 20,
    },
    {
      id: '8',
      name: 'Organic Blueberries',
      description: 'Fresh organic blueberries',
      price: 6.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e',
      stock: 15,
      rating: 4.7,
      reviews: [],
      discount: 15,
    },
    {
      id: '9',
      name: 'Fresh Watermelon',
      description: 'Sweet and refreshing watermelon',
      price: 7.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa',
      stock: 10,
      rating: 4.5,
      reviews: [],
      discount: 25,
    },
    {
      id: '10',
      name: 'Dragon Fruit',
      description: 'Exotic dragon fruit',
      price: 8.99,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1527325678964-54921661f888',
      stock: 8,
      rating: 4.8,
      reviews: [],
      discount: 10,
    }
  ],
  newArrivals: [
    {
      id: '11',
      name: 'Fresh Avocados',
      description: 'Ripe and creamy avocados',
      price: 2.49,
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
      stock: 35,
      rating: 4.7,
      reviews: [],
    },
    {
      id: '12',
      name: 'Organic Greek Yogurt',
      description: 'Creamy organic Greek yogurt',
      price: 4.99,
      category: 'Dairy',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
      stock: 40,
      rating: 4.6,
      reviews: [],
    },
    {
      id: '13',
      name: 'Fresh Salmon',
      description: 'Wild-caught fresh salmon',
      price: 12.99,
      category: 'Seafood',
      image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c',
      stock: 20,
      rating: 4.8,
      reviews: [],
    },
  ],
  bestSellers: [
    {
      id: '21',
      name: 'Organic Carrots',
      description: 'Fresh organic carrots',
      price: 1.99,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37',
      stock: 60,
      rating: 4.5,
      reviews: [],
    },
    {
      id: '22',
      name: 'Artisan Bread',
      description: 'Freshly baked artisan bread',
      price: 3.99,
      category: 'Bakery',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
      stock: 25,
      rating: 4.8,
      reviews: [],
    },
  ],
  vegetables: [
    {
      id: '31',
      name: 'Fresh Broccoli',
      description: 'Organic broccoli crowns',
      price: 2.99,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc',
      stock: 45,
      rating: 4.4,
      reviews: [],
    },
    {
      id: '32',
      name: 'Organic Spinach',
      description: 'Fresh organic spinach leaves',
      price: 2.49,
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
      stock: 55,
      rating: 4.6,
      reviews: [],
    },
  ],
};

export default function ProductGrid() {
  return (
    <div className="space-y-12">
      {/* Flash Deals Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-900">⚡ Flash Deals</h2>
            <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm">
              Limited Time
            </span>
          </div>
          <button className="text-green-600 hover:text-green-700">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {allProducts.flashDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🆕 New Arrivals</h2>
          <button className="text-green-600 hover:text-green-700">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {allProducts.newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🏆 Best Sellers</h2>
          <button className="text-green-600 hover:text-green-700">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {allProducts.bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Fresh Vegetables Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">🥬 Fresh Vegetables</h2>
          <button className="text-green-600 hover:text-green-700">View All</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
          {allProducts.vegetables.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
} 