
'use client';

import { motion } from 'framer-motion';

export const CricketFieldBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-blue-300 to-cyan-400">
            {/* Sky and Sun */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-300 rounded-full"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 0.9, 0.8]
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ filter: 'blur(20px)' }}
            />

            {/* Ground */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-green-600 via-green-500 to-green-400" />
            
            {/* Pitch */}
            <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-green-500/50"
                style={{
                    clipPath: 'polygon(30% 0, 70% 0, 100% 100%, 0% 100%)',
                }}
            />

            {/* Stadium Lights - Abstract shapes */}
            <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-gray-400/10 -rotate-45" style={{ filter: 'blur(40px)'}} />
            <div className="absolute top-0 right-0 w-1/4 h-1/3 bg-gray-400/10 rotate-45" style={{ filter: 'blur(40px)'}} />
        </div>
    );
};
