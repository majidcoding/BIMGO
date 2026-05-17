import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, ShieldIcon } from 'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { BottomNav } from '../components/BottomNav';
const mockUsers = [
{
  id: 1,
  name: 'Ahmad F.',
  xp: 3450,
  avatar: '👨🏽'
},
{
  id: 2,
  name: 'Sarah L.',
  xp: 3210,
  avatar: '👩🏻'
},
{
  id: 3,
  name: 'You',
  xp: 0,
  avatar: '👤',
  isCurrentUser: true
},
{
  id: 4,
  name: 'Raj K.',
  xp: 2890,
  avatar: '👨🏾'
},
{
  id: 5,
  name: 'Mei Ling',
  xp: 2750,
  avatar: '👩🏻'
},
{
  id: 6,
  name: 'Daniel W.',
  xp: 2100,
  avatar: '👨🏼'
}];

export function Leaderboard() {
  const { xp } = useGameState();
  // Update current user's XP and re-sort
  const leaderboardData = mockUsers.
  map((user) =>
  user.isCurrentUser ?
  {
    ...user,
    xp: Math.max(user.xp, xp)
  } :
  user
  ).
  sort((a, b) => b.xp - a.xp);
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white px-6 py-6 sticky top-0 z-10 border-b border-slate-100">
        <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
          <TrophyIcon className="text-accent" fill="currentColor" />
          Leaderboard
        </h1>
        <p className="text-slate-500 font-medium text-sm mt-1">
          Gold League • Ends in 2 days
        </p>
      </div>

      <div className="p-6">
        {/* League Banner */}
        <div className="bg-gradient-to-r from-accent to-accent-dark rounded-3xl p-6 text-white mb-8 shadow-lg shadow-accent/20 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <ShieldIcon size={32} className="text-white" fill="currentColor" />
          </div>
          <div>
            <h2 className="text-xl font-black">Gold League</h2>
            <p className="text-accent-100 font-medium text-sm">
              Top 3 advance to Diamond
            </p>
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {leaderboardData.map((user, index) =>
          <motion.div
            key={user.id}
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05
            }}
            className={`flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 ${user.isCurrentUser ? 'bg-primary/5' : ''}`}>
            
              <div
              className={`w-8 font-black text-center ${index === 0 ? 'text-accent text-xl' : index === 1 ? 'text-slate-400 text-lg' : index === 2 ? 'text-orange-400 text-lg' : 'text-slate-400'}`}>
              
                {index + 1}
              </div>

              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-2xl">
                {user.avatar}
              </div>

              <div className="flex-1">
                <h3
                className={`font-bold ${user.isCurrentUser ? 'text-primary' : 'text-slate-800'}`}>
                
                  {user.name}
                </h3>
              </div>

              <div className="font-black text-slate-600">
                {user.xp}{' '}
                <span className="text-xs font-bold text-slate-400">XP</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>);

}