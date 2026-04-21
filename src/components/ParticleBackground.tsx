
'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background">
      <div 
        className={cn(
          "absolute inset-[-200%] w-[400%] h-[400%] bg-gradient-to-r from-secondary via-accent to-blue-200",
          "animate-[spin_40s_linear_infinite]"
        )}
      />
    </div>
  );
};

export { AnimatedBackground };
