import { useEffect, useState } from "react";

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = p < 60 ? 4 : p < 85 ? 2 : 0.8;
        return Math.min(100, p + increment);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setExiting(true), 250);
      const t2 = setTimeout(() => onDone(), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [progress, onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background select-none"
      style={{
        opacity: exiting ? 0 : 1,
        transform: exiting ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 0.65s ease, transform 0.65s ease',
      }}
    >
      {/* Background subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, hsl(38 92% 50% / 0.06) 0%, transparent 70%)',
        }}
      />

      {/* Logo mark */}
      <div className="relative mb-8 splash-logo">
        {/* Animated rings */}
        <div
          className="absolute rounded-full border border-accent/20"
          style={{
            inset: '-16px',
            animation: 'splash-ring 2.4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full border border-accent/10"
          style={{
            inset: '-30px',
            animation: 'splash-ring 2.4s ease-in-out 0.6s infinite',
          }}
        />

        {/* Icon circle */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: 'linear-gradient(145deg, hsl(38 92% 50% / 0.15), hsl(20 18% 13%))',
            border: '1.5px solid hsl(38 92% 50% / 0.4)',
            boxShadow: '0 0 48px hsl(38 92% 50% / 0.18), inset 0 1px 0 hsl(38 92% 50% / 0.2)',
            animation: 'splash-logo-in 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both',
          }}
        >
          <CoffeeBeanIcon />
        </div>
      </div>

      {/* Brand name */}
      <h1
        className="text-5xl font-bold tracking-tight mb-2"
        style={{
          background: 'linear-gradient(135deg, hsl(38 92% 65%) 0%, hsl(38 92% 50%) 50%, hsl(30 85% 45%) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'splash-text-in 0.6s 0.3s ease-out both',
        }}
      >
        CaféMap
      </h1>

      {/* Tagline */}
      <p
        className="text-sm text-muted-foreground tracking-[0.2em] uppercase mb-16"
        style={{ animation: 'splash-text-in 0.6s 0.5s ease-out both' }}
      >
        Gestão Inteligente de Fazendas de Café
      </p>

      {/* Progress */}
      <div
        className="flex flex-col items-center gap-3"
        style={{ animation: 'splash-text-in 0.6s 0.7s ease-out both' }}
      >
        <div className="w-52 h-px bg-border rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              transition: 'width 0.12s ease',
              background: 'linear-gradient(90deg, hsl(38 92% 40%), hsl(38 92% 60%))',
            }}
          />
        </div>
        <span className="text-[11px] text-muted-foreground/50 tracking-wider">
          {progress < 100 ? 'Carregando sistema...' : 'Pronto'}
        </span>
      </div>
    </div>
  );
}

function CoffeeBeanIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bean outer shape */}
      <ellipse
        cx="22" cy="22" rx="14" ry="17"
        stroke="hsl(38, 92%, 55%)"
        strokeWidth="1.8"
        fill="hsl(38, 92%, 50%, 0.08)"
      />
      {/* Center crease - left curve */}
      <path
        d="M22 6 C18.5 11 18.5 22 22 27 C18.5 27 18.5 33 22 38"
        stroke="hsl(38, 92%, 55%)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Center crease - right curve */}
      <path
        d="M22 6 C25.5 11 25.5 22 22 27 C25.5 27 25.5 33 22 38"
        stroke="hsl(38, 92%, 55%)"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
