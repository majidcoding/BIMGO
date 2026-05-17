import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
export function SplashLogin() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/survey');
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-surface relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-20 -left-10 text-8xl">
          
          👋
        </motion.div>
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute top-1/3 -right-10 text-8xl">
          
          ✌️
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute bottom-1/3 left-10 text-8xl">
          
          🤟
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full">
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            type: 'spring',
            bounce: 0.5
          }}
          className="text-center mb-12">
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-6xl">🤟</span>
          </div>
          <h1 className="text-5xl font-black text-primary tracking-tight">
            BIMGO
          </h1>
          <p className="text-slate-600 font-medium mt-2 text-lg">
            Learn Malaysian Sign Language
          </p>
        </motion.div>

        <div className="w-full space-y-4 mt-8">
          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handleLogin}
            className="w-full bg-white text-slate-800 font-bold py-4 px-6 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center gap-3">
            
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              
            </svg>
            Sign in with Google
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.02
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handleLogin}
            className="w-full bg-black text-white font-bold py-4 px-6 rounded-2xl shadow-sm flex items-center justify-center gap-3">
            
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.79 3.59-.76 1.56.04 2.87.74 3.65 1.9-3.22 1.88-2.64 6.38.5 7.62-.75 1.83-1.66 3.63-2.82 3.41zm-3.52-14.3c-.05-1.68 1.24-3.3 2.89-3.48.33 1.84-1.25 3.4-2.89 3.48z" />
            </svg>
            Sign in with Apple
          </motion.button>
        </div>

        <button
          onClick={handleLogin}
          className="mt-6 text-primary font-bold text-sm hover:underline">
          
          Continue as Guest
        </button>
      </div>

      <div className="w-full text-center pb-4 z-10">
        <p className="text-xs text-slate-400 font-medium">
          Powered by BIM Sign Bank (bimsignbank.org)
        </p>
      </div>
    </div>);

}