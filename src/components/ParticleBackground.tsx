'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // By setting mounted to true only on the client, we can avoid hydration errors.
    setMounted(true);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {/* Vignette overlay */}
      <div
        className={cn(
            "absolute inset-0 bg-[radial-gradient(circle_farthest-side,hsl(var(--background)/0.1),_hsl(var(--background)))]"
        )}
      />

      {/* The spinning orbs are only rendered on the client side to prevent hydration mismatch. */}
      {mounted && (
        <>
          <div
            className="absolute inset-[-200%] w-[400%] h-[400%] bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0,hsl(var(--primary)/0)_50%)] animate-[spin_40s_linear_infinite]"
          />
          <div
            className="absolute inset-[-200%] w-[400%] h-[400%] bg-[radial-gradient(circle_at_center,hsl(var(--accent)/0.1)_0,hsl(var(--accent)/0)_50%)] animate-[spin_50s_linear_infinite_reverse]"
          />
        </>
      )}
    </div>
  );
};

export { AnimatedBackground };
