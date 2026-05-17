import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, ArrowRightIcon } from 'lucide-react';
const reasons = [
{
  id: 'work',
  icon: '🏢',
  title: 'Work',
  desc: 'For my career'
},
{
  id: 'family',
  icon: '👨‍👩‍👧',
  title: 'Family/Friends',
  desc: 'To communicate with loved ones'
},
{
  id: 'personal',
  icon: '💡',
  title: 'Personal Interest',
  desc: 'Self-improvement'
},
{
  id: 'community',
  icon: '🤝',
  title: 'Community Service',
  desc: 'To help others'
}];

const facts = [
'Did you know? BIM has its own grammar structure different from Bahasa Malaysia!',
'There are over 300 sign languages used worldwide!',
'Malaysian Sign Language (BIM) is used by over 50,000 Deaf Malaysians.',
'Sign languages have regional dialects, just like spoken languages!'];

export function Survey() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [hasDeafFamily, setHasDeafFamily] = useState<boolean | null>(null);
  const [factIndex, setFactIndex] = useState(0);
  useEffect(() => {
    if (step === 3) {
      const interval = setInterval(() => {
        setFactIndex((prev) => (prev + 1) % facts.length);
      }, 2000);
      const timeout = setTimeout(() => {
        setStep(4);
      }, 6000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [step]);
  const nextStep = () => setStep((prev) => prev + 1);
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col">
      {/* Progress Bar */}
      {step < 4 &&
      <div className="w-full h-3 bg-slate-100 rounded-full mb-8 overflow-hidden">
          <motion.div
          className="h-full bg-primary"
          initial={{
            width: `${(step - 1) / 3 * 100}%`
          }}
          animate={{
            width: `${step / 3 * 100}%`
          }}
          transition={{
            duration: 0.5
          }} />
        
        </div>
      }

      <AnimatePresence mode="wait">
        {step === 1 &&
        <motion.div
          key="step1"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          className="flex-1 flex flex-col">
          
            <h2 className="text-2xl font-black text-slate-800 mb-6">
              Why do you want to learn BIM?
            </h2>
            <div className="space-y-3 flex-1">
              {reasons.map((reason, i) =>
            <motion.button
              key={reason.id}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.1
              }}
              onClick={() => setSelectedReason(reason.id)}
              className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${selectedReason === reason.id ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/30 hover:bg-slate-50'}`}>
              
                  <span className="text-3xl">{reason.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{reason.title}</h3>
                    <p className="text-sm text-slate-500 font-medium">
                      {reason.desc}
                    </p>
                  </div>
                  {selectedReason === reason.id &&
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <CheckIcon
                  size={14}
                  className="text-white"
                  strokeWidth={3} />
                
                    </div>
              }
                </motion.button>
            )}
            </div>
            <button
            onClick={nextStep}
            disabled={!selectedReason}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl mt-6 disabled:opacity-50 disabled:bg-slate-300 transition-colors">
            
              Continue
            </button>
          </motion.div>
        }

        {step === 2 &&
        <motion.div
          key="step2"
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          exit={{
            opacity: 0,
            x: -20
          }}
          className="flex-1 flex flex-col">
          
            <h2 className="text-2xl font-black text-slate-800 mb-6">
              Do you have family members or close friends with hearing
              difficulties?
            </h2>
            <div className="flex gap-4 flex-1">
              <button
              onClick={() => setHasDeafFamily(true)}
              className={`flex-1 p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${hasDeafFamily === true ? 'border-primary bg-primary/5' : 'border-slate-200'}`}>
              
                <span className="text-4xl">👍</span>
                <span className="font-bold text-slate-800 text-lg">Yes</span>
              </button>
              <button
              onClick={() => setHasDeafFamily(false)}
              className={`flex-1 p-6 rounded-2xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${hasDeafFamily === false ? 'border-primary bg-primary/5' : 'border-slate-200'}`}>
              
                <span className="text-4xl">👎</span>
                <span className="font-bold text-slate-800 text-lg">No</span>
              </button>
            </div>
            {hasDeafFamily !== null &&
          <motion.p
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-center text-slate-500 font-medium mb-6">
            
                {hasDeafFamily ?
            "That's wonderful! Learning BIM will help you connect better." :
            "Awesome! You're taking a great step towards inclusivity."}
              </motion.p>
          }
            <button
            onClick={nextStep}
            disabled={hasDeafFamily === null}
            className="w-full bg-primary text-white font-bold py-4 rounded-2xl disabled:opacity-50 disabled:bg-slate-300 transition-colors">
            
              Continue
            </button>
          </motion.div>
        }

        {step === 3 &&
        <motion.div
          key="step3"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          className="flex-1 flex flex-col items-center justify-center text-center px-4">
          
            <div className="w-24 h-24 border-4 border-slate-100 border-t-primary rounded-full animate-spin mb-8" />
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Building your course...
            </h2>
            <AnimatePresence mode="wait">
              <motion.p
              key={factIndex}
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -10
              }}
              className="text-lg text-slate-600 font-medium">
              
                {facts[factIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        }

        {step === 4 &&
        <motion.div
          key="step4"
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="flex-1 flex flex-col items-center justify-center text-center">
          
            <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0]
            }}
            transition={{
              duration: 1,
              delay: 0.2
            }}
            className="text-7xl mb-6">
            
              🎉
            </motion.div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">
              We're excited to have you!
            </h2>
            <p className="text-lg text-slate-600 font-medium mb-12">
              Good luck on your journey to mastering BIM!
            </p>
            <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => navigate('/dashboard')}
            className="w-full bg-primary text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 text-lg">
            
              Start Learning
              <ArrowRightIcon size={20} strokeWidth={3} />
            </motion.button>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}