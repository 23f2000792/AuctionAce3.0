
'use client';

import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="fixed inset-0 -z-10 bg-[#3a0505]" />;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden bg-background sunburst-bg">
      {/* Texture overlay for handcrafted charm */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://picsum.photos/seed/texture/1000/1000')] bg-repeat" />
      
      {/* Vignette for cinematic focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
};

export { AnimatedBackground };
