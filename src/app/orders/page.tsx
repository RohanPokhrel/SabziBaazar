'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPackage, 
  FiTruck, 
  FiCheck, 
  FiClock,
  FiChevronDown,
  FiSearch,
  FiFilter
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { useFirebase } from '@/context/FirebaseContext';
import { useSession } from 'next-auth/react';

// Order status types and colors
const orderStatuses = {
  'processing': { 
    color: 'text-yellow-600 bg-yellow-50 border-yellow-200', 
    icon: FiClock,
    label: 'Processing',
    description: 'Your order is being processed'
  },
  'shipped': { 
    color: 'text-blue-600 bg-blue-50 border-blue-200', 
    icon: FiTruck,
    label: 'Shipped',
    description: 'Your order is on the way'
  },
  'delivered': { 
    color: 'text-green-600 bg-green-50 border-green-200', 
    icon: FiCheck,
    label: 'Delivered',
    description: 'Order has been delivered'
  },
  'cancelled': { 
    color: 'text-red-600 bg-red-50 border-red-200', 
    icon: FiPackage,
    label: 'Cancelled',
    description: 'Order has been cancelled'
  },
};

type OrderStatus = keyof typeof orderStatuses;

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const { getOrders, isLoading: isLoadingOrders } = useFirebase();
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    const loadOrders = async () => {
      if (session?.user?.id) {
        try {
          const userOrders = await getOrders(session.user.id);
          setOrders(userOrders);
        } catch (error) {
          console.error('Failed to load orders:', error);
        }
      }
    };

    loadOrders();
  }, [session, getOrders]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-6" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your orders</p>
            </div>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                />
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
              >
                <option value="all">All Orders</option>
                {Object.entries(orderStatuses).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {Object.entries(orderStatuses).map(([key, value]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-lg border ${value.color} cursor-pointer transition-all duration-200`}
                onClick={() => setStatusFilter(key as OrderStatus)}
              >
                <value.icon className="w-6 h-6 mb-2" />
                <h3 className="font-semibold">{value.label}</h3>
                <p className="text-sm opacity-75">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center"
            >
              <div className="relative w-40 h-40 mx-auto mb-6">
                <Image
                  src="/illustrations/no-orders.svg"
                  alt="No Orders"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Found</h3>
              <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Browse Products
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
              >
                {/* Order Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${orderStatuses[order.status].color} flex items-center justify-center`}>
                        {React.createElement(orderStatuses[order.status].icon, { className: 'w-6 h-6' })}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">{order.id}</span>
                          <div className={`px-3 py-1 rounded-full text-sm ${orderStatuses[order.status].color}`}>
                            {orderStatuses[order.status].label}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <span className="text-sm text-gray-500">Total Amount</span>
                        <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedOrder === order.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <AnimatePresence>
                  {expandedOrder === order.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200 bg-gray-50"
                    >
                      <div className="p-6 space-y-4">
                        {order.items.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-4 bg-white p-4 rounded-lg"
                          >
                            <div className="relative w-20 h-20 flex-shrink-0">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="font-medium text-gray-900">
                                ${(item.quantity * item.price).toFixed(2)}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 