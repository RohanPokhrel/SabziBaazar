'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiPackage, FiTruck, FiHome } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function OrderSuccessPage() {
  const steps = [
    { icon: FiCheck, text: 'Order Confirmed', delay: 0.2 },
    { icon: FiPackage, text: 'Processing Order', delay: 0.4 },
    { icon: FiTruck, text: 'Out for Delivery', delay: 0.6 },
    { icon: FiHome, text: 'Delivered', delay: 0.8 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8"
        >
          <div className="relative w-32 h-32 mx-auto mb-6">
            <Image
              src="/illustrations/order-success.svg"
              alt="Order Success"
              fill
              className="object-contain"
            />
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <FiCheck className="w-8 h-8 text-green-600" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Order Placed Successfully!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-8"
          >
            Thank you for your order. Your order number is #123456
          </motion.p>

          {/* Order Timeline */}
          <div className="flex justify-between max-w-md mx-auto mb-8">
            {steps.map((Step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Step.delay }}
                className="flex flex-col items-center"
              >
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                  <Step.icon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-xs text-gray-600 text-center max-w-[80px]">
                  {Step.text}
                </span>
                {index < steps.length - 1 && (
                  <div className="absolute w-[calc(100%-80px)] h-0.5 bg-green-100 top-5 left-[40px] -z-10" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/orders"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Track Order
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 