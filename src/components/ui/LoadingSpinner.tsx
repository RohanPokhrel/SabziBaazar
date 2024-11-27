import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'green' | 'white';
}

export default function LoadingSpinner({ size = 'md', color = 'green' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const colors = {
    green: 'border-green-600',
    white: 'border-white'
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizes[size]} border-4 border-t-transparent rounded-full ${colors[color]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
} 