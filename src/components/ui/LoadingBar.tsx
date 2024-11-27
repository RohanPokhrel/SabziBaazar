'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Reset loading state on route change
    setIsLoading(true);
    setProgress(0);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 200);
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-green-600"
            initial={{ width: '0%' }}
            animate={{ 
              width: `${progress}%`,
              transition: { 
                duration: 0.3,
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 