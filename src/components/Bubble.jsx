// src/components/Bubble.jsx
'use client';
import { motion } from 'framer-motion';

const Bubble = ({ children, x, y }) => {
  return (
    <motion.div
      className='absolute w-20 h-20 bg-gray rounded-full flex items-center justify-center text-center cursor-pointer'
      style={{ left: x, top: y }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Bubble;
