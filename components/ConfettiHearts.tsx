import React, { useEffect, useState } from 'react';

type ParticleType = 'heart' | 'petal' | 'sparkle';

interface Particle {
  id: number;
  left: number;
  // Animation parameters
  fallDuration: number;
  swayDuration: number;
  rotateDuration: number;
  delay: number;
  // Visual parameters
  type: ParticleType;
  color: string;
  size: number;
}

export const ConfettiHearts: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#e11d48', '#be185d', '#9f1239', '#db2777', '#f43f5e']; // Deep reds and pinks
    
    const count = 60;
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => {
      const r = Math.random();
      let type: ParticleType = 'petal';
      if (r > 0.6) type = 'heart';
      if (r > 0.9) type = 'sparkle';

      return {
        id: i,
        left: Math.random() * 100,
        fallDuration: Math.random() * 4 + 4, // 4-8s
        swayDuration: Math.random() * 2 + 2, // 2-4s
        rotateDuration: Math.random() * 3 + 2, // 2-5s
        delay: Math.random() * 4,
        type,
        color: type === 'sparkle' ? '#fbbf24' : colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 0.8 + 0.6,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => {
        const isPetal = p.type === 'petal';
        const isSparkle = p.type === 'sparkle';
        
        return (
          // 1. Fall Animation Container (Vertical Movement)
          <div
            key={p.id}
            className="absolute -top-10"
            style={{
              left: `${p.left}%`,
              animation: `fall ${p.fallDuration}s linear ${p.delay}s infinite forwards`,
            }}
          >
            {/* 2. Sway Animation Container (Horizontal Movement) */}
            <div
              style={{
                animation: `sway ${p.swayDuration}s ease-in-out infinite alternate`,
              }}
            >
              {/* 3. Rotation/Scale Container (Local transforms) */}
              <div
                style={{
                  animation: isSparkle 
                    ? `twinkle ${p.rotateDuration}s ease-in-out infinite` 
                    : `rotate ${p.rotateDuration}s linear infinite`,
                  color: p.color,
                  fontSize: `${p.size * 1.5}rem`,
                }}
              >
                {isPetal && (
                  <div 
                    className="rounded-tl-[50%] rounded-br-[50%]"
                    style={{
                      backgroundColor: p.color,
                      width: `${p.size * 16}px`,
                      height: `${p.size * 16}px`,
                      boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.1)'
                    }}
                  />
                )}
                {p.type === 'heart' && '❤'}
                {p.type === 'sparkle' && '✨'}
              </div>
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes sway {
          0% { margin-left: -20px; }
          100% { margin-left: 20px; }
        }
        @keyframes rotate {
          0% { transform: rotate(0deg) rotateX(0deg) rotateY(0deg); }
          50% { transform: rotate(180deg) rotateX(180deg) rotateY(0deg); }
          100% { transform: rotate(360deg) rotateX(360deg) rotateY(0deg); }
        }
        @keyframes twinkle {
          0%, 100% { transform: scale(0.5); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
};