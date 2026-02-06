import React, { useMemo } from 'react';
import { Polaroid } from './Polaroid';

interface ScatteredPhotosProps {
  photos: string[];
}

export const ScatteredPhotos: React.FC<ScatteredPhotosProps> = ({ photos }) => {
  // Generate random but deterministic positions based on the index
  const photoPositions = useMemo(() => {
    return photos.map((_, i) => {
      // Create a pseudo-random distribution to cover the screen
      // Divide screen into approximate grid but add randomness
      const row = Math.floor(i / 3);
      const col = i % 3;
      
      // Base positions spread out 
      const baseTop = 10 + (row * 30);
      const baseLeft = 5 + (col * 30);
      
      // Add randomness (-10 to +10)
      const randomTop = baseTop + (Math.random() * 20 - 10);
      const randomLeft = baseLeft + (Math.random() * 20 - 10);
      const randomRotate = Math.random() * 40 - 20; // -20 to 20 deg
      const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2

      return {
        top: `${Math.max(5, Math.min(80, randomTop))}%`,
        left: `${Math.max(5, Math.min(80, randomLeft))}%`,
        rotate: randomRotate,
        scale: randomScale,
        delay: i * 0.2 // Staggered animation
      };
    });
  }, [photos]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {photos.map((src, index) => (
        <div
          key={index}
          className="absolute transition-all duration-1000 ease-out opacity-0 animate-in fade-in zoom-in"
          style={{
            top: photoPositions[index].top,
            left: photoPositions[index].left,
            transform: `rotate(${photoPositions[index].rotate}deg) scale(${photoPositions[index].scale})`,
            animationDelay: `${photoPositions[index].delay}s`,
            animationFillMode: 'forwards'
          }}
        >
          <Polaroid 
            src={src} 
            alt={`Recuerdo ${index}`} 
            className="shadow-2xl opacity-90 max-w-[150px] md:max-w-[200px]"
            rotate={0} // Rotation handled by parent container
          />
        </div>
      ))}
    </div>
  );
};