import { motion } from 'framer-motion';
import * as Icons from 'react-icons/si';
import { IconType } from 'react-icons';

interface TechItemProps {
  tech: {
    name: string;
    icon: string;
    quote: string;
  };
}

export function TechStackItem({ tech }: TechItemProps) {
  const IconComponent = (Icons as Record<string, IconType>)[tech.icon];

  return (
    <motion.div
      className="group relative bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="flex flex-col items-center gap-2">
        <IconComponent className="w-8 h-8 text-white transition-transform group-hover:scale-110" />
        <span className="text-sm font-medium">{tech.name}</span>
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#221F2E]/95 rounded-lg p-4">
        <p className="text-sm text-center text-white">{tech.quote}</p>
      </div>
    </motion.div>
  );
} 