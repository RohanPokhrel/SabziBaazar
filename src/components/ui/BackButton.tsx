'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface BackButtonProps {
  className?: string;
}

export default function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.back()}
      className={`flex items-center text-gray-600 hover:text-gray-900 transition-colors ${className}`}
    >
      <FiArrowLeft className="w-5 h-5 mr-2" />
      <span>Back</span>
    </motion.button>
  );
} 