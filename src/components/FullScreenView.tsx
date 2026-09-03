
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X, Gavel, Users, ChevronsLeft, ChevronsRight, Repeat } from 'lucide-react';
import { Player, PlayerSet } from '@/lib/player-data';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Image from 'next/image';

interface FullScreenViewProps {
    players: Player[];
    set: PlayerSet;
    onReset: () => void;
}

export default function FullScreenView({ players, set, onReset }: FullScreenViewProps) {
  const [undrawnPlayers, setUndrawnPlayers] = useState<Player[]>([...players]);
  const [drawnPlayers, setDrawnPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  
  const drawingInterval = useRef<NodeJS.Timeout>();
  const [drawingDisplayPlayer, setDrawingDisplayPlayer] = useState<Player | null>(null);

  useEffect(() => {
    setUndrawnPlayers([...players]);
    setDrawnPlayers([]);
    setCurrentPlayer(null);
  }, [players]);

  const stopDrawingAnimation = useCallback(() => {
    if (drawingInterval.current) {
        clearInterval(drawingInterval.current);
        drawingInterval.current = undefined;
    }
    setDrawingDisplayPlayer(null);
  }, []);

  const handleDrawPlayer = useCallback(() => {
    if (undrawnPlayers.length === 0 || isDrawing) return;

    setIsDrawing(true);
    setCurrentPlayer(null);

    drawingInterval.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * undrawnPlayers.length);
        setDrawingDisplayPlayer(undrawnPlayers[randomIndex]);
    }, 100);

    setTimeout(() => {
      stopDrawingAnimation();
      const randomIndex = Math.floor(Math.random() * undrawnPlayers.length);
      const newDrawnPlayer = undrawnPlayers[randomIndex];
      
      setCurrentPlayer(newDrawnPlayer);
      setDrawnPlayers(prev => [newDrawnPlayer, ...prev]);
      setUndrawnPlayers(prev => prev.filter(p => p.id !== newDrawnPlayer.id));
      setIsDrawing(false);
    }, 2500);
  }, [isDrawing, undrawnPlayers, stopDrawingAnimation]);
  
  const resetAuction = () => {
    stopDrawingAnimation();
    onReset();
    setIsDrawing(false);
  }

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        handleDrawPlayer();
      } else if (event.key === 'Escape') {
        router.push('/');
      }
    }, [handleDrawPlayer, router]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopDrawingAnimation();
    };
  }, [handleKeyDown, stopDrawingAnimation]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -50, scale: 0.95 },
  };
  
  const statItemVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute top-0 left-0 h-full z-30 w-72"
          >
            <div className="h-full w-full bg-card/95 backdrop-blur-md border-r-4 border-primary p-4 space-y-4 shadow-2xl">
              <h3 className="text-2xl font-bold text-primary font-serif border-b-2 border-primary pb-2">
                Sold Roster
              </h3>
              <ul className="space-y-2 h-[calc(100%-4rem)] overflow-y-auto pr-2 custom-scrollbar">
                {drawnPlayers.map((player, index) => (
                  <li key={player.id} className="flex items-center gap-3 p-3 rounded-none bg-secondary/50 border border-primary/30">
                    <span className="text-xs font-bold text-primary">{drawnPlayers.length - index}.</span>
                    <span className="font-medium truncate text-foreground">{player.playerName}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Collapsible
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 z-40 transition-all duration-300',
          isSidebarOpen ? 'left-72' : 'left-0'
        )}
      >
        <CollapsibleTrigger asChild>
          <button className="w-8 h-24 bg-primary text-primary-foreground border-y-2 border-r-2 border-primary/50 flex items-center justify-center shadow-lg">
            {isSidebarOpen ? <ChevronsLeft /> : <ChevronsRight />}
          </button>
        </CollapsibleTrigger>
      </Collapsible>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push('/')}
        className="absolute top-6 right-6 h-12 w-12 rounded-none z-40 border-2 border-primary bg-background/50 text-primary hover:bg-primary hover:text-primary-foreground"
      >
        <X className="h-8 w-8" />
      </Button>

      <div className="w-full max-w-6xl flex-1 flex flex-col justify-center items-center relative py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer ? currentPlayer.id : 'waiting'}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <Card className="w-full ornate-border bg-card/90 backdrop-blur-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <CardContent className="p-8 sm:p-12 w-full">
                {isDrawing ? (
                   <div className="text-center min-h-[500px] flex flex-col justify-center items-center">
                      <div className="w-32 h-32 border-4 border-primary border-t-transparent animate-spin rounded-full mb-8" />
                      <h1 className="text-6xl sm:text-8xl text-primary font-bold font-serif animate-pulse">
                        Choosing...
                      </h1>
                    </div>
                ) : currentPlayer ? (
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 w-full">
                    {/* Artistic Image Frame */}
                    <div className="w-full lg:w-2/5 flex-shrink-0">
                        <div className="relative aspect-[3/4] max-w-[400px] mx-auto lg:mx-0 ornate-border">
                            <div className="bg-background w-full h-full flex items-center justify-center overflow-hidden">
                                {currentPlayer.imageUrl ? (
                                    <Image src={currentPlayer.imageUrl} alt={currentPlayer.playerName} fill className="object-cover" />
                                ) : (
                                    <span className="font-serif text-9xl text-primary/20">{currentPlayer.playerName[0]}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Details in SAAVAN Style */}
                    <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                        <div className="space-y-2">
                          <p className="font-serif text-3xl text-primary tracking-widest uppercase">Lot #{currentPlayer.playerNumber}</p>
                          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold font-serif leading-tight text-foreground filter drop-shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
                            {currentPlayer.playerName}
                          </h1>
                        </div>
                        
                        <div className="w-full grid grid-cols-2 gap-4 mt-8">
                            {[
                              { label: 'Origin', value: currentPlayer.country },
                              { label: 'Specialism', value: currentPlayer.specialism },
                              { label: 'Category', value: currentPlayer.cua },
                              { label: 'Points', value: currentPlayer.points },
                              { label: 'Base Price', value: `${currentPlayer.reservePrice} Lakh` },
                            ].map((stat, i) => (stat.value !== undefined && stat.value !== null && stat.value !== '') && (
                              <motion.div 
                                key={i}
                                variants={statItemVariant}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.1 * i }}
                                className="flex flex-col p-4 bg-secondary/30 border-l-4 border-primary"
                              >
                                <span className="text-xs text-primary font-bold uppercase tracking-tighter mb-1">{stat.label}</span>
                                <span className="font-serif text-xl sm:text-2xl text-foreground">{stat.value}</span>
                              </motion.div>
                            ))}
                        </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center min-h-[500px] flex flex-col justify-center items-center space-y-8">
                    <Gavel className="h-32 w-32 text-primary animate-bounce" />
                    <h1 className="text-5xl sm:text-7xl font-bold font-serif text-primary">
                      {undrawnPlayers.length > 0 ? 'Commence Bidding' : 'Auction Concluded'}
                    </h1>
                     <p className="text-foreground/70 text-xl font-medium">
                       {undrawnPlayers.length > 0 ? 'The hammer awaits the first lot.' : 'All portfolios have been allocated.'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-lg p-8 flex flex-col items-center gap-6 z-10">
        {undrawnPlayers.length > 0 ? (
          <Button
            onClick={handleDrawPlayer}
            disabled={isDrawing}
            size="lg"
            className="h-20 w-80 text-3xl font-bold font-serif rounded-none border-4 border-primary shadow-2xl hover:scale-105 transition-transform"
          >
            {isDrawing ? 'Consulting...' : 'Reveal Lot'}
          </Button>
        ) : (
            <Button
              onClick={resetAuction}
              size="lg"
              variant="outline"
              className="h-20 w-80 text-3xl font-bold font-serif rounded-none border-4"
            >
              Restart Session
            </Button>
        )}
        <div className="px-6 py-2 bg-primary text-primary-foreground font-bold tracking-widest text-sm shadow-xl">
          {undrawnPlayers.length} LOTS REMAINING
        </div>
      </div>
    </div>
  );
}
