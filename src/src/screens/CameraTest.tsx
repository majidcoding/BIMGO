import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  CameraIcon,
  ZapIcon,
  CheckCircleIcon,
  LoaderIcon,
  HandIcon,
  XCircleIcon } from
'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { bimSigns } from '../data/bimSigns';
import { useHandDetection } from '../hooks/useHandDetection';
export function CameraTest() {
  const navigate = useNavigate();
  const { addXp } = useGameState();
  const {
    videoRef,
    canvasRef,
    isLoading,
    isCameraActive,
    isHandDetected,
    handConfidence,
    startCamera,
    stopCamera,
    validateSign
  } = useHandDetection();
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [testSequence, setTestSequence] = useState<typeof bimSigns>([]);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'results'>(
    'start'
  );
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>(
    'none'
  );
  useEffect(() => {
    const shuffled = [...bimSigns].sort(() => 0.5 - Math.random());
    setTestSequence(shuffled.slice(0, 5));
    return () => stopCamera();
  }, []);
  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endTest();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);
  const startTest = async () => {
    await startCamera();
    setGameState('playing');
    setTimeLeft(30);
    setScore(0);
    setCurrentSignIndex(0);
  };
  const endTest = () => {
    setGameState('results');
    stopCamera();
    addXp(score * 20);
  };
  const handleCheckSign = () => {
    const currentSign = testSequence[currentSignIndex];
    if (!currentSign) return;
    const isCorrect = validateSign(currentSign.id);
    if (isCorrect) {
      setFeedback('correct');
      setScore((prev) => prev + 1);
      if (navigator.vibrate) navigator.vibrate(100);
      setTimeout(() => {
        setFeedback('none');
        if (currentSignIndex < testSequence.length - 1) {
          setCurrentSignIndex((prev) => prev + 1);
        } else {
          endTest();
        }
      }, 1200);
    } else {
      setFeedback('incorrect');
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
      setTimeout(() => {
        setFeedback('none');
      }, 1000);
    }
  };
  // START SCREEN
  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <button
          onClick={() => navigate('/dashboard')}
          className="absolute top-6 left-6 text-slate-400 hover:text-white">
          
          <XIcon size={28} />
        </button>

        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          className="flex flex-col items-center">
          
          <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mb-8">
            <CameraIcon size={48} className="text-secondary" />
          </div>
          <h1 className="text-4xl font-black mb-4 text-center">Speed Test</h1>
          <p className="text-slate-400 text-center mb-4 max-w-xs font-medium">
            Show the correct hand sign for each word. Uses real-time AI hand
            detection!
          </p>

          <div className="flex items-center gap-3 bg-slate-800 rounded-2xl px-5 py-3 mb-12">
            <HandIcon size={20} className="text-primary" />
            <span className="text-sm font-bold text-slate-300">
              MediaPipe Hand Landmarker
            </span>
          </div>

          <button
            onClick={startTest}
            disabled={isLoading}
            className="w-full max-w-xs bg-secondary hover:bg-secondary-dark text-white font-black py-4 rounded-2xl shadow-lg shadow-secondary/30 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
            
            {isLoading ?
            <>
                <LoaderIcon size={20} className="animate-spin" />
                Loading Model...
              </> :

            'Start Challenge'
            }
          </button>
        </motion.div>
      </div>);

  }
  // RESULTS SCREEN
  if (gameState === 'results') {
    const accuracy =
    testSequence.length > 0 ?
    Math.round(score / testSequence.length * 100) :
    0;
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{
            scale: 0,
            rotate: -180
          }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: 'spring',
            bounce: 0.5
          }}
          className="w-32 h-32 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
          
          <ZapIcon size={64} className="text-secondary" fill="currentColor" />
        </motion.div>

        <h1 className="text-4xl font-black text-slate-800 mb-2">
          {score >= 4 ?
          'Amazing!' :
          score >= 2 ?
          'Nice Try!' :
          'Keep Practicing!'}
        </h1>
        <p className="text-slate-500 font-medium mb-8">
          You correctly signed {score} out of {testSequence.length} words.
        </p>

        <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-sm border border-slate-100 mb-8 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold">Score</span>
            <span className="text-2xl font-black text-slate-800">
              {score}/{testSequence.length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold">Accuracy</span>
            <span className="text-2xl font-black text-primary">
              {accuracy}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-bold">XP Earned</span>
            <span className="text-2xl font-black text-secondary">
              +{score * 20}
            </span>
          </div>
        </div>

        <div className="w-full max-w-xs space-y-3">
          <button
            onClick={() => {
              setGameState('start');
              setScore(0);
              setCurrentSignIndex(0);
              setTimeLeft(30);
              const shuffled = [...bimSigns].sort(() => 0.5 - Math.random());
              setTestSequence(shuffled.slice(0, 5));
            }}
            className="w-full bg-secondary text-white font-black py-4 rounded-2xl shadow-lg shadow-secondary/30">
            
            Try Again
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-slate-100 text-slate-600 font-black py-4 rounded-2xl">
            
            Back to Dashboard
          </button>
        </div>
      </div>);

  }
  // PLAYING SCREEN
  const currentSign = testSequence[currentSignIndex];
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col relative">
      {/* Header Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 pt-6 flex justify-between items-center z-20">
        <button
          onClick={() => {
            stopCamera();
            navigate('/dashboard');
          }}
          className="text-white/70 hover:text-white bg-black/30 p-2 rounded-full backdrop-blur-sm">
          
          <XIcon size={24} />
        </button>
        <div
          className={`font-black text-2xl px-4 py-1.5 rounded-full backdrop-blur-sm ${timeLeft <= 10 ? 'text-rose-400 bg-rose-500/20' : 'text-white bg-black/30'}`}>
          
          0:{timeLeft.toString().padStart(2, '0')}
        </div>
        <div className="font-black text-xl text-secondary bg-black/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
          {score}/{testSequence.length}
        </div>
      </div>

      {/* Detection Status */}
      <div className="absolute top-20 left-4 z-20">
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-bold ${isHandDetected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
          
          <div
            className={`w-2 h-2 rounded-full ${isHandDetected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
          
          {isHandDetected ?
          `Hand ${Math.round(handConfidence * 100)}%` :
          'No Hand'}
        </div>
      </div>

      {/* Prompt Overlay */}
      <div className="absolute top-28 left-0 w-full flex justify-center z-20 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSign?.id}
            initial={{
              y: -20,
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              y: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{
              y: 20,
              opacity: 0,
              scale: 0.9
            }}
            className="bg-white/95 backdrop-blur-md px-8 py-5 rounded-3xl shadow-2xl text-center border border-white/20">
            
            <p className="text-slate-500 font-bold text-xs mb-1 uppercase tracking-widest">
              Show the sign for
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">{currentSign?.icon}</span>
              <h2 className="text-3xl font-black text-slate-900">
                {currentSign?.nameMalay}
              </h2>
            </div>
            <p className="text-slate-500 font-medium text-sm mt-1">
              {currentSign?.nameEnglish}
            </p>
            <p className="text-slate-400 text-xs mt-2 max-w-[250px]">
              {currentSign?.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Camera Feed */}
      <div className="flex-1 relative overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" />
        
        {/* Hand Landmark Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none" />
        

        {/* Subtle scanning overlay */}
        <div className="absolute inset-0 border-2 border-primary/20 rounded-lg m-16 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80 pointer-events-none" />
      </div>

      {/* Capture Button */}
      <div className="absolute bottom-0 left-0 w-full p-6 pb-12 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent z-20 flex justify-center">
        <motion.button
          whileTap={{
            scale: 0.9
          }}
          onClick={handleCheckSign}
          disabled={feedback !== 'none' || !isHandDetected}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isHandDetected && feedback === 'none' ? 'bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.3)]' : 'bg-slate-700 shadow-[0_0_0_6px_rgba(100,116,139,0.2)]'}`}>
          
          <div
            className={`w-16 h-16 rounded-full border-4 ${isHandDetected && feedback === 'none' ? 'border-slate-900' : 'border-slate-500'}`} />
          
        </motion.button>
      </div>

      {/* Feedback Overlays */}
      <AnimatePresence>
        {feedback === 'correct' &&
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          exit={{
            scale: 1.5,
            opacity: 0
          }}
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          
            <div className="bg-green-500/90 backdrop-blur-sm p-8 rounded-full text-white shadow-2xl">
              <CheckCircleIcon size={80} />
            </div>
          </motion.div>
        }
        {feedback === 'incorrect' &&
        <motion.div
          initial={{
            scale: 0.5,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          exit={{
            scale: 0.5,
            opacity: 0
          }}
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          
            <div className="bg-rose-500/90 backdrop-blur-sm p-8 rounded-full text-white shadow-2xl">
              <XCircleIcon size={80} />
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}