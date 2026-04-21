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

       {/* Animated Cricket Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 animate-float-1 opacity-40">
           <svg width="150" height="150" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform -rotate-45">
            <path d="M22.5186 9.53235L11.5186 20.5323L7.51855 16.5323L16.2147 7.8362C18.2323 5.81855 21.653 5.92235 23.5186 7.78789C25.3841 9.65344 25.4879 13.0741 23.4702 15.0917L22.5186 9.53235Z" fill="hsl(var(--primary) / 0.5)" />
            <path d="M16.2147 7.8362L7.51855 16.5323L5.01855 14.0323L13.7147 5.3362C15.7323 3.31855 19.153 3.42235 21.0186 5.28789C22.8841 7.15344 22.9879 10.5741 20.9702 12.5917L16.2147 7.8362Z" fill="hsl(var(--primary) / 0.7)" />
            <path d="M11.5186 20.5323L7.51855 16.5323L5.01855 14.0323L6.01855 23.5323L11.5186 20.5323Z" fill="hsl(var(--secondary) / 0.6)" />
          </svg>
        </div>
        <div className="absolute top-1/2 right-0 animate-float-2 opacity-50">
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="hsl(var(--destructive) / 0.7)" />
              <path d="M4.06152 16.6C5.97392 19.5308 8.86175 21.5 12 21.5C15.1383 21.5 18.0261 19.5308 19.9385 16.6" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
              <path d="M4.06152 7.40039C5.97392 4.46957 8.86175 2.50039 12 2.50039C15.1383 2.50039 18.0261 4.46957 19.9385 7.40039" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
          </svg>
        </div>
        <div className="absolute top-2/3 left-1/4 animate-float-3 opacity-30">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="hsl(var(--destructive) / 0.7)" />
              <path d="M4.06152 16.6C5.97392 19.5308 8.86175 21.5 12 21.5C15.1383 21.5 18.0261 19.5308 19.9385 16.6" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
              <path d="M4.06152 7.40039C5.97392 4.46957 8.86175 2.50039 12 2.50039C15.1383 2.50039 18.0261 4.46957 19.9385 7.40039" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
          </svg>
        </div>
        <div className="absolute bottom-0 left-1/3 animate-float-4 opacity-40">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="hsl(var(--destructive) / 0.7)" />
              <path d="M4.06152 16.6C5.97392 19.5308 8.86175 21.5 12 21.5C15.1383 21.5 18.0261 19.5308 19.9385 16.6" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
              <path d="M4.06152 7.40039C5.97392 4.46957 8.86175 2.50039 12 2.50039C15.1383 2.50039 18.0261 4.46957 19.9385 7.40039" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
          </svg>
        </div>
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
