import { useEffect } from 'react';
import logo from '../assets/logo/logo-battle-odissey.png';

export default function Splash({ onAction }) {
  
  // Escuchar cualquier pulsación de teclado para avanzar
  useEffect(() => {
    const handleKeyDown = () => {
      if (onAction) onAction();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onAction]);

  return (
    <div 
      className="min-h-screen bg-[#000022] flex flex-col justify-center items-center cursor-pointer select-none"
      onClick={onAction}
      >

      <div className="flex flex-col items-center gap-12">
        <div className="w-full max-w-2xl px-6">
          <img 
            src={logo} 
            alt="Battle Odyssey - Retro Turn-Based RPG Adventure" 
            className="w-full h-auto drop-shadow-[0_0_15px_rgba(255,165,0,0.3)]"
            draggable="false"
          />
        </div>

        <div className="mt-8">
          <p className="text-yellow-200 uppercase tracking-widest text-xl animate-pulse font-bold"
            style={{ textShadow: '2px 2px 0px #000' }}>
            Press Any Button
          </p>
        </div>
      </div>
    </div>
  );
}