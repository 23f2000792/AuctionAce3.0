
'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [seed, setSeed] = useState<number | null>(null);

  useEffect(() => {
    // This now only runs on the client, after the initial render,
    // which prevents the server and client from generating different
    // random numbers and causing a hydration mismatch.
    setSeed(Math.floor(Math.random() * 10000));
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {/* Vignette overlay */}
      <div
        className={cn(
            "absolute inset-0 bg-[radial-gradient(circle_farthest-side,hsl(var(--background)/0.1),_hsl(var(--background)))]"
        )}
      />

       {/* Spinning Orbs are now only rendered on the client after the seed is available */}
      {seed !== null && (
        <>
          <div
            className="absolute inset-[-200%] w-[400%] h-[400%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0,hsl(var(--primary)/0)_50%)] animate-[spin_40s_linear_infinite]"
            style={{ animationDelay: `-${seed}s`}}
          />
          <div
            className="absolute inset-[-200%] w-[400%] h-[400%] bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0,hsl(var(--accent)/0)_50%)] animate-[spin_50s_linear_infinite_reverse]"
            style={{ animationDelay: `-${seed + 10}s`}}
          />
        </>
      )}
    </div>
  );
};

export { AnimatedBackground };
