
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioNode } from '../types';

interface ModalProps {
  node: PortfolioNode | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ node, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1 },
    exit: { y: 50, opacity: 0, scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="bg-[#112240] p-6 md:p-8 rounded-lg max-w-lg w-full text-[#ccd6f6] shadow-2xl border border-[#233554]"
            style={{ boxShadow: '0 0 30px -5px rgba(100, 255, 218, 0.25)' }}
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-[#64ffda] mb-1">{node.name}</h2>
                <span className="text-xs uppercase tracking-widest text-[#8892b0] bg-[#233554] px-2 py-1 rounded">{node.type}</span>
              </div>
              <button onClick={onClose} className="text-[#8892b0] hover:text-[#64ffda] transition-colors p-1 rounded-full hover:bg-white/10" aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-[#a8b2d1] leading-relaxed whitespace-pre-wrap">{node.details}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;