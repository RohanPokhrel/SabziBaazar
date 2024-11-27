'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  { name: 'All', slug: '/' },
  { name: 'Fruits', slug: '/category/fruits' },
  { name: 'Vegetables', slug: '/category/vegetables' },
  { name: 'Dairy', slug: '/category/dairy' },
  { name: 'Bakery', slug: '/category/bakery' },
  { name: 'Meat', slug: '/category/meat' },
  { name: 'Seafood', slug: '/category/seafood' },
  { name: 'Beverages', slug: '/category/beverages' },
  { name: 'Snacks', slug: '/category/snacks' },
];

export default function CategoryBar() {
  const pathname = usePathname();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm relative w-full">
      {/* Left Scroll Button */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-r-lg shadow-md z-10 hidden lg:block hover:bg-gray-50"
        aria-label="Scroll left"
      >
        <FiChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      {/* Categories Container */}
      <div 
        ref={scrollContainerRef}
        className="flex flex-wrap lg:flex-nowrap gap-2 py-3 px-4 md:px-8 overflow-x-auto scrollbar-hide scroll-smooth mx-auto max-w-full"
        style={{ 
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {categories.map((category) => {
          const isActive = pathname === category.slug || 
            (pathname === '/' && category.slug === '/');

          return (
            <motion.div
              key={category.slug}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Link
                href={category.slug}
                className={`
                  whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                  transition-colors duration-200 block
                  ${isActive 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }
                `}
              >
                {category.name}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-l-lg shadow-md z-10 hidden lg:block hover:bg-gray-50"
        aria-label="Scroll right"
      >
        <FiChevronRight className="w-5 h-5 text-gray-600" />
      </button>
    </nav>
  );
} 