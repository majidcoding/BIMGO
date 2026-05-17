import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpenIcon, ZapIcon, FlameIcon, HeartIcon } from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { BottomNav } from '../components/BottomNav';
export function Dashboard() {
  const navigate = useNavigate();
  const { xp, streak, hearts, maxHearts } = useGameState();
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Bar */}
      <div className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-orange-500 font-bold bg-orange-50 px-3 py-1.5 rounded-full">
            <FlameIcon size={18} className="fill-orange-500" />
            <span>{streak}</span>
          </div>
          <div className="flex items-center gap-1 text-accent-dark font-bold bg-accent/10 px-3 py-1.5 rounded-full">
            <ZapIcon size={18} className="fill-accent-dark" />
            <span>{xp}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-rose-500 font-bold bg-rose-50 px-3 py-1.5 rounded-full">
          <HeartIcon size={18} className="fill-rose-500" />
          <span>
            {hearts}/{maxHearts}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}>
          
          <h1 className="text-2xl font-black text-slate-800">
            Hello, Learner! 👋
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            Ready to learn some signs today?
          </p>
        </motion.div>

        {/* Main Action Cards */}
        <div className="space-y-4">
          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => navigate('/learn')}
            className="w-full bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-6 text-left relative overflow-hidden shadow-lg shadow-primary/20">
            
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <BookOpenIcon
                  className="text-white"
                  size={24}
                  strokeWidth={2.5} />
                
              </div>
              <h2 className="text-2xl font-black text-white mb-1">Learn</h2>
              <p className="text-primary-100 font-medium text-sm">
                Structured bite-sized lessons
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={() => navigate('/test')}
            className="w-full bg-gradient-to-br from-secondary to-secondary-dark rounded-3xl p-6 text-left relative overflow-hidden shadow-lg shadow-secondary/20">
            
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
            <div className="relative z-10">
              <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <ZapIcon className="text-white" size={24} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-black text-white mb-1">Test</h2>
              <p className="text-orange-100 font-medium text-sm">
                Camera-based challenges
              </p>
            </div>
          </motion.button>
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2
          }}
          className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
          
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🌟</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800">Daily Challenge</h3>
            <p className="text-sm text-slate-500 font-medium">
              Learn the sign for "Terima Kasih"
            </p>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-accent w-1/3 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>);

}