import React from 'react';
import {
  SettingsIcon,
  AwardIcon,
  FlameIcon,
  ZapIcon,
  BookOpenIcon } from
'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { bimUnits } from '../data/bimSigns';
import { BottomNav } from '../components/BottomNav';
export function Profile() {
  const { xp, streak, completedUnits } = useGameState();
  const stats = [
  {
    label: 'Total XP',
    value: xp,
    icon: ZapIcon,
    color: 'text-accent-dark',
    bg: 'bg-accent/10'
  },
  {
    label: 'Day Streak',
    value: streak,
    icon: FlameIcon,
    color: 'text-orange-500',
    bg: 'bg-orange-50'
  },
  {
    label: 'Units Done',
    value: completedUnits.length,
    icon: BookOpenIcon,
    color: 'text-primary',
    bg: 'bg-primary/10'
  },
  {
    label: 'League',
    value: 'Gold',
    icon: AwardIcon,
    color: 'text-purple-500',
    bg: 'bg-purple-50'
  }];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-slate-100 flex justify-between items-center">
        <h1 className="text-xl font-black text-slate-800">Profile</h1>
        <button className="text-slate-400 hover:text-slate-600">
          <SettingsIcon size={24} />
        </button>
      </div>

      <div className="p-6">
        {/* User Info */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-4xl mb-4 border-4 border-white shadow-sm">
            👤
          </div>
          <h2 className="text-2xl font-black text-slate-800">Learner</h2>
          <p className="text-slate-500 font-medium">Joined April 2026</p>
        </div>

        {/* Stats Grid */}
        <h3 className="font-black text-slate-800 mb-4 text-lg">Statistics</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {stats.map((stat, i) =>
          <div
            key={i}
            className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-2">
            
              <div
              className={`w-8 h-8 rounded-full ${stat.bg} flex items-center justify-center`}>
              
                <stat.icon size={16} className={stat.color} strokeWidth={3} />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Achievements */}
        <h3 className="font-black text-slate-800 mb-4 text-lg">Achievements</h3>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-2xl opacity-100">
              🔥
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Wildfire</h4>
              <p className="text-sm text-slate-500 font-medium">
                Reach a 3 day streak
              </p>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-orange-400 w-full rounded-full" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-2xl opacity-50 grayscale">
              📚
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Scholar</h4>
              <p className="text-sm text-slate-500 font-medium">
                Complete 5 units
              </p>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{
                    width: `${completedUnits.length / 5 * 100}%`
                  }} />
                
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Data provided by{' '}
            <a
              href="https://www.bimsignbank.org/home"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline">
              
              BIM Sign Bank
            </a>
          </p>
        </div>
      </div>

      <BottomNav />
    </div>);

}