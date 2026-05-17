import React, { useState, createContext, useContext } from 'react';
interface GameState {
  xp: number;
  streak: number;
  hearts: number;
  maxHearts: number;
  completedUnits: string[];
  addXp: (amount: number) => void;
  loseHeart: () => void;
  refillHearts: () => void;
  completeUnit: (unitId: string) => void;
}
const GameStateContext = createContext<GameState | undefined>(undefined);
export function GameStateProvider({ children }: {children: ReactNode;}) {
  const [xp, setXp] = useState(150);
  const [streak, setStreak] = useState(3);
  const [hearts, setHearts] = useState(5);
  const maxHearts = 5;
  const [completedUnits, setCompletedUnits] = useState<string[]>(['unit-1']);
  const addXp = (amount: number) => setXp((prev) => prev + amount);
  const loseHeart = () => setHearts((prev) => Math.max(0, prev - 1));
  const refillHearts = () => setHearts(maxHearts);
  const completeUnit = (unitId: string) => {
    if (!completedUnits.includes(unitId)) {
      setCompletedUnits((prev) => [...prev, unitId]);
    }
  };
  return (
    <GameStateContext.Provider
      value={{
        xp,
        streak,
        hearts,
        maxHearts,
        completedUnits,
        addXp,
        loseHeart,
        refillHearts,
        completeUnit
      }}>
      
      {children}
    </GameStateContext.Provider>);

}
export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
}