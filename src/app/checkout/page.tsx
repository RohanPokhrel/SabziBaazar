'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { 
  FiCreditCard, 
  FiDollarSign, 
  FiTruck, 
  FiCheckCircle,
  FiShield
} from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import { useLoading } from '@/context/LoadingContext';

type PaymentMethod = 'credit-card' | 'ime-pay' | 'esewa' | 'khalti' | 'cash';

interface PaymentOption {
  id: PaymentMethod;
  name: string;
  icon: string;
  description: string;
  color: string;
  disabled?: boolean;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'credit-card',
    name: 'Credit/Debit Card',
    icon: '/payment-icons/credit-card.png',
    description: 'Pay securely with Visa, Mastercard, or other cards',
    color: 'bg-blue-500',
  },
  {
    id: 'esewa',
    name: 'eSewa',
    icon: '/payment-icons/esewa.png',
    description: 'Pay using eSewa digital wallet',
    color: 'bg-green-500',
  },
  {
    id: 'khalti',
    name: 'Khalti',
    icon: '/payment-icons/khalti.png',
    description: 'Pay using Khalti digital wallet',
    color: 'bg-purple-500',
  },
  {
    id: 'ime-pay',
    name: 'IME Pay',
    icon: '/payment-icons/ime-pay.png',
    description: 'Pay using IME Pay wallet',
    color: 'bg-red-500',
  },
  {
    id: 'cash',
    name: 'Cash on Delivery',
    icon: '/payment-icons/cod.png',
    description: 'Pay when you receive your order',
    color: 'bg-gray-500',
  },
];

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.13; // 13% VAT
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    if (!selectedPayment) return;

    setIsProcessing(true);
    setIsLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Handle different payment methods
      switch (selectedPayment) {
        case 'esewa':
          // Integrate eSewa API here
          console.log('Processing eSewa payment...');
          break;
        case 'khalti':
          // Integrate Khalti API here
          console.log('Processing Khalti payment...');
          break;
        case 'ime-pay':
          // Integrate IME Pay API here
          console.log('Processing IME Pay payment...');
          break;
        case 'credit-card':
          // Handle credit card payment
          console.log('Processing credit card payment...');
          break;
        case 'cash':
          // Handle cash on delivery
          console.log('Processing cash on delivery...');
          break;
      }

      // Show success message and redirect
      router.push('/order-success');
    } catch (error) {
      console.error('Payment failed:', error);
      // Handle payment failure
    } finally {
      setIsProcessing(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-6" />
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Payment Methods */}
          <div className="flex-grow">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
              <div className="space-y-4">
                {paymentOptions.map((option) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      cursor-pointer rounded-xl p-4 border-2 transition-all
                      ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                      ${selectedPayment === option.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                    onClick={() => !option.disabled && setSelectedPayment(option.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-12 h-12 flex-shrink-0">
                        <Image
                          src={option.icon}
                          alt={option.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900">{option.name}</h3>
                        <p className="text-sm text-gray-500">{option.description}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center
                        ${selectedPayment === option.id ? 'border-green-500' : ''}
                      `}>
                        {selectedPayment === option.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-green-500"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Security Note */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center text-sm text-gray-600">
                  <FiShield className="w-5 h-5 mr-2 text-green-600" />
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative w-12 h-12">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>VAT (13%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!selectedPayment || isProcessing}
                onClick={handlePayment}
                className={`
                  w-full py-3 px-4 rounded-lg text-white font-medium mt-6
                  flex items-center justify-center space-x-2
                  ${selectedPayment && !isProcessing 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="w-5 h-5" />
                    <span>Pay ${total.toFixed(2)}</span>
                  </>
                )}
              </motion.button>

              {/* Security Note */}
              <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center">
                <FiCreditCard className="w-4 h-4 mr-1" />
                Secure payment powered by SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 