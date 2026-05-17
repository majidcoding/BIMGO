import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockIcon, CheckIcon, ArrowLeftIcon } from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { bimUnits } from '../data/bimSigns';
import { BottomNav } from '../components/BottomNav';
export function LearnPath() {
  const navigate = useNavigate();
  const { completedUnits } = useGameState();
  // Determine the current active unit (first uncompleted one)
  const currentUnitIndex = bimUnits.findIndex(
    (u) => !completedUnits.includes(u.id)
  );
  const activeUnitId =
  currentUnitIndex !== -1 ? bimUnits[currentUnitIndex].id : null;
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white px-6 py-4 sticky top-0 z-20 border-b border-slate-100 flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600">
          
          <ArrowLeftIcon size={24} />
        </button>
        <h1 className="text-xl font-black text-slate-800">Learning Path</h1>
      </div>

      <div className="p-6 py-12 flex flex-col items-center relative">
        {/* Winding Path SVG Background */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-32 pointer-events-none z-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 100 1000">
            
            <path
              d="M50,0 C80,100 20,200 50,300 C80,400 20,500 50,600 C80,700 20,800 50,900 C80,1000 50,1000 50,1000"
              fill="none"
              stroke="#0891B2"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="10 15" />
            
          </svg>
        </div>

        <div className="w-full max-w-[280px] space-y-16 relative z-10">
          {bimUnits.map((unit, index) => {
            const isCompleted = completedUnits.includes(unit.id);
            const isActive = unit.id === activeUnitId;
            const isLocked = !isCompleted && !isActive;
            // Calculate horizontal offset for winding effect
            const offset = Math.sin(index * 1.5) * 40;
            return (
              <motion.div
                key={unit.id}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.1
                }}
                className="relative flex flex-col items-center"
                style={{
                  transform: `translateX(${offset}px)`
                }}>
                
                {/* Unit Label Bubble */}
                <div
                  className={`absolute -top-10 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm border ${isActive ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-100 border-transparent text-slate-500'}`}>
                  
                  {unit.title}
                  {isActive &&
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-slate-200 rotate-45" />
                  }
                </div>

                {/* Node Button */}
                <motion.button
                  whileHover={
                  !isLocked ?
                  {
                    scale: 1.05
                  } :
                  {}
                  }
                  whileTap={
                  !isLocked ?
                  {
                    scale: 0.95
                  } :
                  {}
                  }
                  onClick={() => !isLocked && navigate(`/lesson/${unit.id}`)}
                  className={`w-20 h-20 rounded-full flex items-center justify-center relative shadow-lg ${isCompleted ? unit.color : isActive ? `${unit.color} ring-4 ring-primary/30 ring-offset-4` : 'bg-slate-200 shadow-none'}`}>
                  
                  {/* Inner ring for 3D effect */}
                  <div
                    className={`absolute inset-1 rounded-full border-t-4 border-white/30 ${isLocked ? 'hidden' : ''}`} />
                  

                  <span className="text-3xl relative z-10">
                    {isLocked ?
                    <LockIcon className="text-slate-400" size={28} /> :

                    unit.icon
                    }
                  </span>

                  {/* Completion Checkmark */}
                  {isCompleted &&
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-slate-100">
                      <CheckIcon
                      size={16}
                      className="text-green-500"
                      strokeWidth={4} />
                    
                    </div>
                  }

                  {/* Active Pulse Effect */}
                  {isActive &&
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    className={`absolute inset-0 rounded-full ${unit.color} -z-10`} />

                  }
                </motion.button>
              </motion.div>);

          })}
        </div>
      </div>
      <BottomNav />
    </div>);

}