'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiMapPin, FiPlus as FiPlusCircle, FiEdit2, FiTag, FiX, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface Voucher {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
}

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true,
    },
    {
      id: '2',
      name: 'Office',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false,
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState(addresses.find(a => a.isDefault)?.id || '');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const [availableVouchers] = useState<Voucher[]>([
    {
      id: 'v1',
      code: 'WELCOME10',
      discount: 10,
      type: 'percentage',
      description: '10% off on your order',
    },
    {
      id: 'v2',
      code: 'SAVE20',
      discount: 20,
      type: 'fixed',
      description: '$20 off on orders above $100',
    },
    {
      id: 'v3',
      code: 'FRESH15',
      discount: 15,
      type: 'percentage',
      description: '15% off on fresh products',
    },
  ]);

  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [showVoucherModal, setShowVoucherModal] = useState(false);

  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

  useEffect(() => {
    const loadSavedAddresses = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (addresses.length === 0) {
          setIsLoadingAddresses(false);
          return;
        }

        setIsLoadingAddresses(false);
      } catch (error) {
        console.error('Error loading addresses:', error);
        setIsLoadingAddresses(false);
      }
    };

    loadSavedAddresses();
  }, []);

  const calculateDiscount = () => {
    if (!selectedVoucher) return 0;
    
    if (selectedVoucher.type === 'percentage') {
      return (subtotal * selectedVoucher.discount) / 100;
    } else {
      return selectedVoucher.discount;
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1; // 10% tax
  const discount = calculateDiscount();
  const total = subtotal + shipping + tax - discount;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `addr_${Date.now()}`;
    const addressToAdd: Address = {
      ...newAddress,
      id: newId,
      isDefault: addresses.length === 0,
    };
    setAddresses([...addresses, addressToAdd]);
    setSelectedAddressId(newId);
    setShowAddressForm(false);
    setNewAddress({ name: '', street: '', city: '', state: '', zipCode: '' });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    setSelectedAddressId(id);
  };

  const removeAddress = (addressId: string) => {
    // Don't allow removing the last address
    if (addresses.length <= 1) {
      return;
    }

    // If removing default address, make another one default
    if (addresses.find(a => a.id === addressId)?.isDefault) {
      const remainingAddresses = addresses.filter(a => a.id !== addressId);
      setAddresses([
        { ...remainingAddresses[0], isDefault: true },
        ...remainingAddresses.slice(1)
      ]);
      setSelectedAddressId(remainingAddresses[0].id);
    } else {
      setAddresses(addresses.filter(a => a.id !== addressId));
    }
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
    });
    setIsEditing(true);
    setShowAddressForm(true);
  };

  const handleUpdateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddress) return;

    const updatedAddresses = addresses.map(addr => 
      addr.id === editingAddress.id
        ? {
            ...addr,
            ...newAddress,
          }
        : addr
    );

    setAddresses(updatedAddresses);
    setShowAddressForm(false);
    setIsEditing(false);
    setEditingAddress(null);
    setNewAddress({ name: '', street: '', city: '', state: '', zipCode: '' });
  };

  const handleVoucherSelect = (voucher: Voucher) => {
    setSelectedVoucher(voucher);
    setShowVoucherModal(false);
  };

  const removeVoucher = () => {
    setSelectedVoucher(null);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton className="mb-6" />
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-500"
          >
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <motion.div 
            className="flex-grow"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cartItems.length === 0 ? (
              <motion.div 
                className="bg-white rounded-lg p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
                <Link 
                  href="/"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  Continue Shopping
                  <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="bg-white rounded-lg shadow-sm mb-4 p-4 flex items-center"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-green-600 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiMinus className="w-5 h-5 text-gray-600" />
                      </motion.button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <FiPlus className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Order Summary and Address Section */}
          {cartItems.length > 0 && (
            <motion.div
              className="w-full lg:w-96 space-y-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Delivery Address Section */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
                  {addresses.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsEditing(false);
                        setShowAddressForm(true);
                      }}
                      className="text-green-600 hover:text-green-700 flex items-center"
                    >
                      <FiPlusCircle className="w-5 h-5 mr-1" />
                      Add New
                    </motion.button>
                  )}
                </div>

                {isLoadingAddresses ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center py-12"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full"
                      />
                      <p className="text-sm text-gray-500">Loading saved addresses...</p>
                    </div>
                  </motion.div>
                ) : addresses.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <FiMapPin className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Delivery Address</h3>
                    <p className="text-gray-500 mb-6">Please add a delivery address to continue</p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAddressForm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700"
                    >
                      <FiPlusCircle className="w-5 h-5 mr-2" />
                      Add Delivery Address
                    </motion.button>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <motion.div
                        key={address.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          selectedAddressId === address.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setDefaultAddress(address.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div 
                            className="flex-grow cursor-pointer"
                            onClick={() => setDefaultAddress(address.id)}
                          >
                            <p className="font-medium text-gray-900">{address.name}</p>
                            <p className="text-sm text-gray-600">{address.street}</p>
                            <p className="text-sm text-gray-600">
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                          </div>
                          <div className="flex items-start space-x-2">
                            {address.isDefault && (
                              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEditAddress(address)}
                              className="p-1 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                              title="Edit Address"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </motion.button>
                            {!address.isDefault && addresses.length > 1 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => removeAddress(address.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                title="Remove Address"
                              >
                                <FiTrash2 className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary Section */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  {/* Voucher Section */}
                  <div className="py-3">
                    {selectedVoucher ? (
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium text-green-700">{selectedVoucher.code}</p>
                            <p className="text-xs text-green-600">{selectedVoucher.description}</p>
                          </div>
                          <button
                            onClick={removeVoucher}
                            className="text-green-700 hover:text-green-800"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex justify-between text-green-700 mt-2">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowVoucherModal(true)}
                        className="w-full flex items-center justify-center space-x-2 py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-green-600 hover:border-green-500 transition-colors"
                      >
                        <FiTag className="w-5 h-5" />
                        <span>Apply Voucher</span>
                      </button>
                    )}
                  </div>

                  <div className="h-px bg-gray-200 my-4"></div>
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 font-medium hover:bg-green-700 transition-colors"
                  >
                    Proceed to Checkout
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Updated Address Form Modal */}
        <AnimatePresence>
          {showAddressForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
              >
                <h3 className="text-lg font-semibold mb-4">
                  {isEditing ? 'Edit Address' : 'Add New Address'}
                </h3>
                <form onSubmit={isEditing ? handleUpdateAddress : handleAddAddress} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Name</label>
                    <input
                      type="text"
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., Home, Office"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                    <input
                      type="text"
                      value={newAddress.zipCode}
                      onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);
                        setIsEditing(false);
                        setEditingAddress(null);
                        setNewAddress({ name: '', street: '', city: '', state: '', zipCode: '' });
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {isEditing ? 'Update Address' : 'Save Address'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voucher Modal */}
        <AnimatePresence>
          {showVoucherModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-md w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Available Vouchers</h3>
                  <button
                    onClick={() => setShowVoucherModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  {availableVouchers.map((voucher) => (
                    <motion.div
                      key={voucher.id}
                      whileHover={{ scale: 1.02 }}
                      className="border rounded-lg p-3 cursor-pointer hover:border-green-500 hover:bg-green-50"
                      onClick={() => handleVoucherSelect(voucher)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{voucher.code}</p>
                          <p className="text-sm text-gray-600">{voucher.description}</p>
                        </div>
                        <span className="text-green-600 font-medium">
                          {voucher.type === 'percentage' ? `${voucher.discount}%` : `$${voucher.discount}`}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 