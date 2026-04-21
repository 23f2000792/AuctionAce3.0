
'use client';

import { cn } from '@/lib/utils';

const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      {/* Subtle texture */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(hsl(var(--foreground))_1px,_transparent_1px),_radial-gradient(hsl(var(--foreground))_1px,_transparent_1px)]",
          "bg-[length:32px_32px]",
          "bg-[position:0_0,_16px_16px]",
          "opacity-5"
        )}
      />
      {/* Vignette overlay */}
      <div
        className={cn(
            "absolute inset-0 bg-[radial-gradient(circle_farthest-side,hsl(var(--background)/0.1),_hsl(var(--background)))]"
        )}
      />
    </div>
  );
};

export { AnimatedBackground };
