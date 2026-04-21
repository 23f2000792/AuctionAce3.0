
'use client';

import { cn } from '@/lib/utils';

const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {/* Main spinning color orbs */}
      <div
        className={cn(
          "absolute inset-[-200%] w-[400%] h-[400%]",
          "bg-[radial-gradient(circle_at_center,_hsl(var(--accent))_0,_transparent_35%),_radial-gradient(circle_at_center,_hsl(var(--primary))_0,_transparent_30%),_radial-gradient(circle_at_center,_hsl(var(--secondary))_0,_transparent_40%)]",
          "bg-[length:200%_200%,150%_150%,100%_100%]",
          "bg-[position:100%_0,0_100%,_50%_50%]",
          "animate-hero-spin"
        )}
      />
      {/* New spotlight elements */}
      <div className="absolute inset-0 overflow-hidden">
          <div className={cn(
              "absolute left-1/2 top-1/2 h-[150%] w-[150%] origin-center opacity-20",
              "bg-[conic-gradient(from_90deg_at_50%_50%,_hsl(var(--primary))_0%,_transparent_10%,_transparent_100%)]",
              "animate-spotlight-spin"
          )} />
          <div className={cn(
              "absolute left-1/2 top-1/2 h-[200%] w-[200%] origin-center opacity-15",
              "bg-[conic-gradient(from_270deg_at_50%_50%,_hsl(var(--secondary))_0%,_transparent_5%,_transparent_100%)]",
              "animate-spotlight-spin-slow"
          )} />
      </div>

       {/* Stylized Cricket Pitch */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(15 400 300)" strokeWidth="4" stroke="hsl(var(--primary))" fill="none">
            {/* Outer Ellipse */}
            <ellipse cx="400" cy="300" rx="350" ry="250" />
            {/* Inner Circle */}
            <circle cx="400" cy="300" r="100" />
            {/* Pitch Rectangle */}
            <rect x="300" y="290" width="200" height="20" strokeWidth="2" />
            {/* Creases */}
            <line x1="320" y1="280" x2="320" y2="320" />
            <line x1="480" y1="280" x2="480" y2="320" />
             {/* Stumps */}
            <g strokeWidth="3">
              <line x1="310" y1="295" x2="310" y2="305" />
              <line x1="490" y1="295" x2="490" y2="305" />
            </g>
          </g>
        </svg>
      </div>

      {/* Vignette/Texture overlay */}
      <div
        className={cn(
            "absolute inset-0 bg-[radial-gradient(circle_farthest-side,hsl(var(--background)/0.1),_hsl(var(--background)/0.8))]"
        )}
      />
    </div>
  );
};

export { AnimatedBackground };
