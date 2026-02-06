import React, { useState, useEffect } from 'react';
import { AppStage } from '../types';

interface EnvelopeProps {
  isOpen: boolean;
  onOpenComplete: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ isOpen, onOpenComplete }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Step 1: Open Flap
      setTimeout(() => setAnimationStep(1), 100);
      // Step 2: Slide Letter
      setTimeout(() => setAnimationStep(2), 700);
      // Step 3: Callback
      setTimeout(() => onOpenComplete(), 1500);
    }
  }, [isOpen, onOpenComplete]);

  return (
    <div className="relative w-64 h-48 md:w-80 md:h-60 mx-auto transition-transform duration-500 hover:scale-105">
      {/* Back of Envelope */}
      <div className="absolute inset-0 bg-red-700 rounded-lg shadow-xl" />

      {/* Letter */}
      <div
        className={`absolute inset-x-4 top-2 bottom-2 bg-white rounded shadow-sm flex items-center justify-center p-4 transition-transform duration-1000 ease-in-out ${
          animationStep >= 2 ? '-translate-y-32 md:-translate-y-40 z-30' : 'z-10'
        }`}
      >
        <div className="text-center">
          <p className="font-handwriting text-gray-400 text-sm">Para: Anais...</p>
          <div className="w-8 h-0.5 bg-gray-200 mx-auto mt-2"></div>
          <div className="w-12 h-0.5 bg-gray-200 mx-auto mt-1"></div>
        </div>
      </div>

      {/* Front Flaps (Left/Right/Bottom) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
         {/* Left Flap */}
         <div className="absolute left-0 bottom-0 w-0 h-0 border-l-[8rem] md:border-l-[10rem] border-b-[6rem] md:border-b-[7.5rem] border-l-red-600 border-b-transparent border-t-transparent"></div>
         {/* Right Flap */}
         <div className="absolute right-0 bottom-0 w-0 h-0 border-r-[8rem] md:border-r-[10rem] border-b-[6rem] md:border-b-[7.5rem] border-r-red-600 border-b-transparent border-t-transparent"></div>
         {/* Bottom Flap */}
         <div className="absolute bottom-0 inset-x-0 h-0 border-b-[6rem] md:border-b-[7.5rem] border-l-[8rem] md:border-l-[10rem] border-r-[8rem] md:border-r-[10rem] border-b-red-500 border-l-transparent border-r-transparent border-t-transparent rounded-b-lg"></div>
      </div>

      {/* Top Flap (The one that opens) */}
      <div
        className={`absolute top-0 inset-x-0 h-0 border-t-[6rem] md:border-t-[7.5rem] border-l-[8rem] md:border-l-[10rem] border-r-[8rem] md:border-r-[10rem] border-t-red-800 border-l-transparent border-r-transparent border-b-transparent rounded-t-lg transform-origin-top transition-transform duration-700 ease-in-out z-20 ${
          animationStep >= 1 ? 'rotate-x-180 z-0 opacity-0' : 'rotate-x-0'
        }`}
        style={{ transformOrigin: 'top', transform: animationStep >= 1 ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
      ></div>
      
       {/* Inner Top Flap (Visible when open) */}
       <div
        className={`absolute top-0 inset-x-0 h-0 border-t-[6rem] md:border-t-[7.5rem] border-l-[8rem] md:border-l-[10rem] border-r-[8rem] md:border-r-[10rem] border-t-red-900 border-l-transparent border-r-transparent border-b-transparent rounded-t-lg transform-origin-top z-0 ${
             animationStep >= 1 ? 'opacity-100' : 'opacity-0'
        }`}
         style={{ transformOrigin: 'top', transform: 'rotateX(0deg) scaleY(-1)' }}
      ></div>

    </div>
  );
};