import React, { useState, useRef, useEffect } from 'react';
import { AppStage } from './types';
import { FloatingHearts } from './components/FloatingHearts';
import { Envelope } from './components/Envelope';
import { ConfettiHearts } from './components/ConfettiHearts';
import { MusicPlayer } from './components/MusicPlayer';
import { Polaroid } from './components/Polaroid';
import { ScatteredPhotos } from './components/ScatteredPhotos';
import { Heart, MailOpen, Camera, ImagePlus } from 'lucide-react';

const REJECTION_MESSAGES = [
  "¿Estás segura? 🥺 Prometo hacerte sonreír todos los días.",
  "Vamos, di que sí 💕 Haré de este San Valentín algo inolvidable.",
  "Mi corazón ya te eligió 💖 Inténtalo otra vez.",
  "El botón ‘Sí’ se ve muy bonito, ¿no? 😳",
  "Por favor... 🥺💖",
  "No acepto un no por respuesta 😘"
];

// Placeholder images to show structure before user uploads
const DEFAULT_PHOTOS = [
  "/photos/us_1.jpg",
  "/photos/us_2.jpg",
  "/photos/us_3.jpg",
  "/photos/us_4.jpg",
  "/photos/us_5.jpg",
  "/photos/us_6.jpeg",
  "/photos/us_7.jpeg",
  "/photos/us_8.jpeg",
  "/photos/us_9.jpeg",
  "/photos/us_10.jpeg",
  "/photos/us_11.jpeg"
];

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INITIAL);
  const [noCount, setNoCount] = useState(0);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  // State for multiple user photos
  const [photos, setPhotos] = useState<string[]>(DEFAULT_PHOTOS);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Cycle photos automatically in ASKING stage
  useEffect(() => {
    if (stage === AppStage.ASKING && photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
      }, 3500); // Change photo every 3.5 seconds
      return () => clearInterval(interval);
    }
  }, [stage, photos]);

  const handleOpenLetter = () => {
    setStage(AppStage.OPENING);
    setIsEnvelopeOpen(true);
  };

  const handleLetterOpened = () => {
    setStage(AppStage.READING);
  };

  const handleContinue = () => {
    setStage(AppStage.ASKING);
  };

  const handleYes = () => {
    setStage(AppStage.ACCEPTED);
  };

  const handleNo = () => {
    setNoCount((prev) => (prev + 1) % REJECTION_MESSAGES.length);
  };

  // Helper for dynamic Yes button size
  const getYesButtonSize = () => {
    const baseSize = 1;
    const growthFactor = 0.2;
    return Math.min(baseSize + noCount * growthFactor, 2.5);
  };

  return (
    <div className="min-h-screen bg-valentine-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans text-valentine-900 selection:bg-pink-200">
      <FloatingHearts />
      <MusicPlayer />

      {/* Main Content Area */}
      <main className="z-10 w-full max-w-2xl mx-auto text-center flex flex-col items-center justify-center min-h-[80vh]">

        {/* Stage: INITIAL */}
        {stage === AppStage.INITIAL && (
          <div className="animate-fade-in space-y-8 flex flex-col items-center">
            <h1 className="font-handwriting text-5xl md:text-6xl text-valentine-600 mb-4 animate-float">
              Para ti...
            </h1>

            <div className="cursor-pointer hover:scale-105 transition-transform" onClick={handleOpenLetter}>
              <Envelope isOpen={false} onOpenComplete={() => { }} />
            </div>

            <p className="text-xl text-valentine-800 mt-8 font-medium">
              Tienes una carta especial...
            </p>

            <button
              onClick={handleOpenLetter}
              className="mt-8 px-8 py-3 bg-valentine-500 text-white rounded-full font-bold text-lg shadow-lg hover:bg-valentine-600 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
            >
              <MailOpen size={20} />
              Abrir carta 💌
            </button>
          </div>
        )}

        {/* Stage: OPENING & READING */}
        {(stage === AppStage.OPENING || stage === AppStage.READING) && (
          <div className="w-full relative h-[60vh] flex items-center justify-center">
            {stage === AppStage.OPENING && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Envelope isOpen={isEnvelopeOpen} onOpenComplete={handleLetterOpened} />
              </div>
            )}

            {stage === AppStage.READING && (
              <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-pink-100 animate-in fade-in slide-in-from-bottom-10 duration-1000 z-50">
                <p className="font-handwriting text-2xl md:text-3xl leading-relaxed text-gray-800 mb-8 text-left">
                  “Mi preciosa niña bella <span className="text-valentine-600 font-bold">Anais Antonia Jara Cariman</span>,
                  <br /><br />
                  Desde que llegaste a mi vida, cada día tiene un sentido diferente, un motivo, un objetivo, en el cual siempre estas tu en el final del camino, con nuestra casita, nuestros bebes perrunos y nuestros hijos, eres lo mas lindo que tengo y agradezco todos los dias a la vida por haberme permitido conocerte.
                  <br />
                  Hoy quiero hacerte una pregunta muy especial…”
                </p>

                <button
                  onClick={handleContinue}
                  className="w-full py-4 bg-valentine-500 text-white rounded-xl font-bold text-xl shadow-md hover:bg-valentine-600 transition-colors animate-pulse"
                >
                  Continuar 💖
                </button>
              </div>
            )}
          </div>
        )}

        {/* Stage: ASKING */}
        {stage === AppStage.ASKING && (
          <div className="flex flex-col items-center animate-in zoom-in duration-500 w-full">

            {/* Dynamic Photo Slideshow */}
            <div className="mb-8 h-[300px] w-[280px] md:w-[320px] relative">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentPhotoIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                >
                  <Polaroid
                    src={photo}
                    alt="Nosotros"
                    caption="Nosotros 💕"
                    className="w-full"
                    rotate={index % 2 === 0 ? -3 : 3}
                  />
                </div>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border-4 border-valentine-200 max-w-lg w-full relative z-20 -mt-10 pt-12">
              <h2 className="font-handwriting text-4xl md:text-5xl text-valentine-600 mb-6 leading-tight">
                ¿Quieres ser mi San Valentín, <br />
                <span className="text-valentine-800">Anais Antonia Jara Cariman</span>? 💘
              </h2>

              <div className="h-12 flex items-center justify-center mb-6">
                {noCount > 0 && (
                  <p className="text-valentine-600 font-medium animate-bounce text-lg">
                    {REJECTION_MESSAGES[(noCount - 1) % REJECTION_MESSAGES.length]}
                  </p>
                )}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                <button
                  onClick={handleYes}
                  style={{ transform: `scale(${getYesButtonSize()})` }}
                  className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap z-20"
                >
                  Sí 💕
                </button>

                <button
                  onClick={handleNo}
                  className="px-8 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-2xl font-bold text-xl shadow-lg transition-all duration-200 flex items-center gap-2 whitespace-nowrap z-10 hover:shake"
                >
                  No 🙈
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stage: ACCEPTED */}
        {stage === AppStage.ACCEPTED && (
          <>
            {/* Background Gallery */}
            <ScatteredPhotos photos={photos} />

            <div className="relative z-50 animate-in zoom-in duration-700 w-full flex flex-col items-center min-h-[60vh] justify-center">
              <ConfettiHearts />

              <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border-4 border-red-400 flex flex-col items-center text-center max-w-2xl mx-4 mb-8">
                <Heart className="text-red-500 w-20 h-20 animate-heartbeat mb-4 fill-red-500" />

                <h2 className="font-handwriting text-5xl md:text-6xl text-valentine-600 mb-6">
                  ¡Sabía que dirías que sí! 💖
                </h2>

                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-sans font-bold">
                  Gracias por hacerme la persona más feliz del mundo, mi bebecita rica.
                  <br />
                  ¡Te amo un chingo!
                </p>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="bg-white/80 px-6 py-2 rounded-full text-valentine-600 font-handwriting text-xl hover:bg-white transition-colors shadow-lg"
              >
                Volver a ver ↺
              </button>
            </div>
          </>
        )}

      </main>

      <footer className="fixed bottom-2 w-full text-center text-valentine-300 text-sm font-handwriting opacity-60 pointer-events-none z-50">
        Hecho con amor para Anais Antonia Jara Cariman
      </footer>

      <style>{`
        .hover\\:shake:hover {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default App;