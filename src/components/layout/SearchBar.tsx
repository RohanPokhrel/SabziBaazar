'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX } from 'react-icons/fi';

export default function SearchBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-white shadow-sm px-4 py-3 md:hidden">
      <motion.form 
        onSubmit={handleSearch}
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
      >
        <div className="relative">
          <motion.input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="w-full px-4 py-2 pl-10 pr-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
          />
          <FiSearch 
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <AnimatePresence>
            {isExpanded && searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsExpanded(false);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Search Suggestions */}
        <AnimatePresence>
          {isExpanded && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-50 mx-4"
            >
              <div className="p-2">
                <div className="text-sm text-gray-500 px-3 py-2">
                  Suggestions:
                </div>
                {['Apple', 'Banana', 'Orange'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setIsExpanded(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-gray-700"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  );
} 