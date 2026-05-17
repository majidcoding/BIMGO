import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  HeartIcon,
  VideoIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  LoaderIcon,
  HandIcon } from
'lucide-react';
import { useGameState } from '../context/GameStateContext';
import { bimUnits, bimSigns } from '../data/bimSigns';
import { useHandDetection } from '../hooks/useHandDetection';
export function Lesson() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { hearts, loseHeart, addXp, completeUnit } = useGameState();
  const {
    videoRef,
    canvasRef,
    isLoading,
    isCameraActive,
    isHandDetected,
    handConfidence,
    fingerStates,
    startCamera,
    stopCamera,
    validateSign
  } = useHandDetection();
  const unit = bimUnits.find((u) => u.id === unitId);
  const unitSigns = bimSigns.filter((s) => s.category === unit?.title);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>(
    'none'
  );
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const currentSign = unitSigns[currentSignIndex] || bimSigns[0];
  const progress = currentSignIndex / Math.max(1, unitSigns.length) * 100;
  useEffect(() => {
    if (hearts <= 0) {
      stopCamera();
      navigate('/dashboard');
    }
  }, [hearts, navigate, stopCamera]);
  const handleCheckSign = () => {
    if (!isCameraActive) return;
    const isCorrect = validateSign(currentSign.id);
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) {
      addXp(10);
      setXpGained((prev) => prev + 10);
      if (navigator.vibrate) navigator.vibrate(100);
    } else {
      loseHeart();
      if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }
  };
  const handleNext = () => {
    setFeedback('none');
    if (currentSignIndex < unitSigns.length - 1) {
      setCurrentSignIndex((prev) => prev + 1);
    } else {
      stopCamera();
      if (unitId) completeUnit(unitId);
      setIsLessonComplete(true);
    }
  };
  if (!unit)
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-500">
        Unit not found
      </div>);

  if (isLessonComplete) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{
            scale: 0
          }}
          animate={{
            scale: 1
          }}
          transition={{
            type: 'spring',
            bounce: 0.5
          }}
          className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-6">
          
          <CheckCircleIcon size={64} className="text-green-500" />
        </motion.div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">
          Lesson Complete!
        </h1>
        <p className="text-slate-500 font-medium mb-8">
          You earned +{xpGained} XP
        </p>
        <button
          onClick={() => navigate('/learn')}
          className="w-full bg-primary text-white font-bold py-4 rounded-2xl">
          
          Continue
        </button>
      </div>);

  }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 z-10 relative">
        <button
          onClick={() => {
            stopCamera();
            navigate('/learn');
          }}
          className="text-slate-400 hover:text-slate-600">
          
          <XIcon size={24} />
        </button>
        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{
              width: `${progress}%`
            }}
            transition={{
              duration: 0.3
            }} />
          
        </div>
        <div className="flex items-center gap-1 text-rose-500 font-bold">
          <HeartIcon size={20} className="fill-rose-500" />
          <span>{hearts}</span>
        </div>
      </div>

      {/* Top Half: Instruction */}
      <div className="flex-1 bg-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {unit.title}
          </span>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
            {currentSign.difficulty}
          </span>
        </div>

        <motion.div
          key={currentSign.id}
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          className="text-center w-full max-w-xs">
          
          <div className="text-8xl mb-4">{currentSign.icon}</div>
          <h2 className="text-3xl font-black text-slate-800 mb-1">
            {currentSign.nameMalay}
          </h2>
          <p className="text-slate-400 font-bold mb-4">
            {currentSign.nameEnglish}
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              {currentSign.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Half: Camera */}
      <div className="h-[45vh] bg-slate-900 relative rounded-t-3xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        {isCameraActive ?
        <>
            <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100" />
          
            {/* Hand landmark overlay */}
            <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 pointer-events-none" />
          

            {/* Detection Status Indicator */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
              <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md text-sm font-bold ${isHandDetected ? 'bg-green-500/20 text-green-300' : 'bg-slate-500/20 text-slate-300'}`}>
              
                <div
                className={`w-2.5 h-2.5 rounded-full ${isHandDetected ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`} />
              
                {isHandDetected ? 'Hand Detected' : 'No Hand'}
              </div>
              {isHandDetected &&
            <div className="bg-primary/20 text-primary-light px-3 py-1.5 rounded-full backdrop-blur-md text-sm font-bold">
                  {Math.round(handConfidence * 100)}%
                </div>
            }
            </div>

            {/* Finger State Indicator */}
            {isHandDetected &&
          <div className="absolute top-14 left-4 flex gap-1.5 z-10">
                {['👍', '☝️', '🖕', '💍', '🤙'].map((emoji, i) =>
            <div
              key={i}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs backdrop-blur-md ${fingerStates[i] ? 'bg-primary/30 border border-primary/50' : 'bg-slate-800/30 border border-slate-600/30'}`}>
              
                    {emoji}
                  </div>
            )}
              </div>
          }
          </> :

        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-6 text-center">
            {isLoading ?
          <>
                <LoaderIcon
              size={48}
              className="mb-4 animate-spin text-primary" />
            
                <p className="font-bold text-white mb-2">
                  Loading Hand Detection...
                </p>
                <p className="font-medium text-sm text-slate-500">
                  Downloading MediaPipe model
                </p>
              </> :

          <>
                <VideoIcon size={48} className="mb-4 opacity-50" />
                <p className="font-medium mb-2">
                  Camera is required to practice this sign
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Uses AI to detect your hand position
                </p>
                <button
              onClick={startCamera}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors flex items-center gap-2">
              
                  <HandIcon size={20} />
                  Start Camera
                </button>
              </>
          }
          </div>
        }

        {/* Check Sign Button */}
        {isCameraActive && feedback === 'none' &&
        <div className="absolute bottom-6 left-0 w-full px-6 flex justify-center z-10">
            <button
            onClick={handleCheckSign}
            disabled={!isHandDetected}
            className={`font-black py-4 px-12 rounded-full shadow-xl transition-all w-full max-w-xs ${isHandDetected ? 'bg-white text-slate-900 shadow-black/20 hover:scale-105 active:scale-95' : 'bg-slate-700 text-slate-400 shadow-none cursor-not-allowed'}`}>
            
              {isHandDetected ? 'Check Sign' : 'Show Your Hand...'}
            </button>
          </div>
        }

        {/* Feedback Overlays */}
        <AnimatePresence>
          {feedback === 'correct' &&
          <motion.div
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            className="absolute bottom-0 left-0 w-full bg-green-500 p-6 pt-8 rounded-t-3xl text-white z-20">
            
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <CheckCircleIcon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-black">Excellent!</h3>
              </div>
              <p className="text-green-100 font-medium text-sm mb-6 ml-12">
                +10 XP earned
              </p>
              <button
              onClick={handleNext}
              className="w-full bg-white text-green-600 font-black py-4 rounded-2xl">
              
                Continue
              </button>
            </motion.div>
          }

          {feedback === 'incorrect' &&
          <motion.div
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            className="absolute bottom-0 left-0 w-full bg-rose-500 p-6 pt-8 rounded-t-3xl text-white z-20">
            
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/20 p-2 rounded-full">
                  <AlertCircleIcon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black">Not quite</h3>
                </div>
              </div>
              <p className="text-rose-100 font-medium text-sm mb-6 ml-12">
                Hint: {currentSign.description}
              </p>
              <button
              onClick={() => setFeedback('none')}
              className="w-full bg-white text-rose-600 font-black py-4 rounded-2xl">
              
                Try Again
              </button>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>);

}