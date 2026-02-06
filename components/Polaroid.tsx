import React from 'react';
import { Camera } from 'lucide-react';

interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  rotate?: number;
  onClick?: () => void;
  isInteractive?: boolean;
}

export const Polaroid: React.FC<PolaroidProps> = ({ 
  src, 
  alt, 
  caption, 
  className = '', 
  rotate = 0,
  onClick,
  isInteractive = false
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white p-3 md:p-4 pb-10 md:pb-12 shadow-xl rounded transform transition-all duration-500 
        hover:scale-110 hover:z-50 hover:rotate-0 inline-block relative group
        ${className}
        ${isInteractive ? 'cursor-pointer' : ''}
      `}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="overflow-hidden rounded-sm bg-gray-100 relative">
         <img 
           src={src} 
           alt={alt} 
           className="w-full h-auto object-cover aspect-[3/4] md:aspect-square block transition-transform duration-700 group-hover:scale-105" 
         />
         
         {/* Overlay hint for interactive mode */}
         {isInteractive && (
           <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Camera className="text-white mb-2" size={32} />
             <span className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded">Cambiar foto</span>
           </div>
         )}
      </div>
      {caption && (
        <p className="font-handwriting text-center mt-3 md:mt-4 text-gray-600 text-lg md:text-2xl leading-none">
          {caption}
        </p>
      )}
    </div>
  );
};