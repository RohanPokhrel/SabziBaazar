'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCalendar, FiLock } from 'react-icons/fi';

interface CreditCardFormProps {
  onSubmit: (cardData: CardData) => void;
}

interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export default function CreditCardForm({ onSubmit }: CreditCardFormProps) {
  const [cardData, setCardData] = useState<CardData>({
    number: '',
    name: '',
    expiry: '',
    cvc: '',
  });

  const [errors, setErrors] = useState<Partial<CardData>>({});

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const validateCard = () => {
    const newErrors: Partial<CardData> = {};

    // Card number validation
    if (cardData.number.replace(/\s/g, '').length !== 16) {
      newErrors.number = 'Invalid card number';
    }

    // Name validation
    if (!cardData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Expiry validation
    const [month, year] = cardData.expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (!month || !year || 
        Number(month) > 12 || 
        Number(month) < 1 || 
        Number(year) < currentYear || 
        (Number(year) === currentYear && Number(month) < currentMonth)) {
      newErrors.expiry = 'Invalid expiry date';
    }

    // CVC validation
    if (cardData.cvc.length !== 3) {
      newErrors.cvc = 'Invalid CVC';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCard()) {
      onSubmit(cardData);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Number
        </label>
        <div className="relative">
          <FiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={cardData.number}
            onChange={(e) => setCardData({ ...cardData, number: formatCardNumber(e.target.value) })}
            maxLength={19}
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
              errors.number ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="1234 5678 9012 3456"
          />
        </div>
        {errors.number && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors.number}
          </motion.p>
        )}
      </div>

      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cardholder Name
        </label>
        <input
          type="text"
          value={cardData.name}
          onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="John Doe"
        />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1 text-sm text-red-500"
          >
            {errors.name}
          </motion.p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiry Date
          </label>
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={cardData.expiry}
              onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
              maxLength={5}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                errors.expiry ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="MM/YY"
            />
          </div>
          {errors.expiry && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.expiry}
            </motion.p>
          )}
        </div>

        {/* CVC */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            CVC
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={cardData.cvc}
              onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, '') })}
              maxLength={3}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 ${
                errors.cvc ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="123"
            />
          </div>
          {errors.cvc && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-sm text-red-500"
            >
              {errors.cvc}
            </motion.p>
          )}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Pay Now
      </motion.button>
    </motion.form>
  );
} 