'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiRefreshCcw, FiShoppingCart } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src="/illustrations/order-failed.svg"
              alt="Order Failed"
              fill
              className="object-contain"
            />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiAlertCircle className="w-8 h-8 text-red-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Payment Failed
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-8"
          >
            We couldn&apos;t process your payment. Please try again or use a different payment method.
          </motion.p>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-red-50 rounded-lg p-4 mb-8 text-left"
          >
            <h3 className="text-sm font-medium text-red-800 mb-2">Possible reasons:</h3>
            <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
              <li>Insufficient funds</li>
              <li>Invalid card details</li>
              <li>Transaction timeout</li>
              <li>Network connectivity issues</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/checkout"
                className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                <FiRefreshCcw className="w-5 h-5 mr-2" />
                Try Again
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/cart"
                className="inline-flex items-center px-6 py-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors"
              >
                <FiShoppingCart className="w-5 h-5 mr-2" />
                Return to Cart
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 