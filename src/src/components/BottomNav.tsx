import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  BookOpenIcon,
  CameraIcon,
  TrophyIcon,
  UserIcon } from
'lucide-react';
export function BottomNav() {
  const navItems = [
  {
    path: '/dashboard',
    icon: HomeIcon,
    label: 'Home'
  },
  {
    path: '/learn',
    icon: BookOpenIcon,
    label: 'Learn'
  },
  {
    path: '/test',
    icon: CameraIcon,
    label: 'Camera'
  },
  {
    path: '/leaderboard',
    icon: TrophyIcon,
    label: 'Rank'
  },
  {
    path: '/profile',
    icon: UserIcon,
    label: 'Profile'
  }];

  return (
    <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 px-6 py-3 pb-safe z-50">
      <div className="flex justify-between items-center">
        {navItems.map((item) =>
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`
          }>
          
            {({ isActive }) =>
          <>
                <item.icon
              size={24}
              strokeWidth={isActive ? 2.5 : 2}
              className={isActive ? 'fill-primary/20' : ''} />
            
                <span className="text-[10px] font-bold">{item.label}</span>
              </>
          }
          </NavLink>
        )}
      </div>
    </div>);

}