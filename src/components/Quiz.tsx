import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QUIZ } from '../constants';
import { Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState<'intro' | 'question' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
    setIsAnswered(true);

    if (optionIndex === QUIZ[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4537E', '#FAC775']
      });
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < QUIZ.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCurrentStep('results');
    }
  };

  const resetQuiz = () => {
    setCurrentStep('intro');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <section id="quiz" className="py-20 px-4 bg-primary-light/5">
      <div className="max-w-xl mx-auto bg-card p-8 md:p-12 rounded-3xl shadow-xl border border-primary-light/20 min-h-[400px] flex flex-col justify-center animate-on-scroll">
        <AnimatePresence mode="wait">
          {currentStep === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-primary-dark mb-6 font-display">Birthday Quiz!</h2>
              <p className="text-text-secondary mb-8">How well do you know our story? Take this quick quiz to find out!</p>
              <button 
                onClick={() => setCurrentStep('question')}
                className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
              >
                Start Quiz
              </button>
            </motion.div>
          )}

          {currentStep === 'question' && (
            <motion.div 
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex justify-end items-center mb-8">
                <span className="text-xs font-bold text-text-secondary">Score: {score}</span>
              </div>
              
              <h3 className="text-xl font-bold text-primary-dark mb-8">{QUIZ[currentQuestionIndex].question}</h3>
              
              <div className="space-y-4">
                {QUIZ[currentQuestionIndex].options.map((option, i) => {
                  let bgColor = 'bg-primary-light/10 hover:bg-primary-light/20';
                  if (isAnswered) {
                    if (i === QUIZ[currentQuestionIndex].correctAnswer) bgColor = 'bg-green-100 border-green-500 text-green-700';
                    else if (i === selectedOption) bgColor = 'bg-red-100 border-red-500 text-red-700';
                    else bgColor = 'opacity-50 bg-gray-100';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 border-transparent ${bgColor}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {isAnswered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={nextQuestion}
                  className="mt-8 w-full bg-primary-dark text-white py-3 rounded-xl font-bold"
                >
                  {currentQuestionIndex === QUIZ.length - 1 ? 'See Results' : 'Next Question'}
                </motion.button>
              )}
            </motion.div>
          )}

          {currentStep === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Trophy className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-primary-dark mb-4 font-display">Quiz Complete!</h2>
              <p className="text-4xl font-bold text-primary mb-6">{score} / {QUIZ.length}</p>
              <p className="text-text-secondary mb-8 leading-relaxed">
                {score === QUIZ.length ? "Perfect score! You know us better than anyone. I love you!" : 
                 score >= QUIZ.length / 2 ? "Great job! You know our story well." : 
                 "Not bad! We'll have to make even more memories this year."}
              </p>
              <button 
                onClick={resetQuiz}
                className="flex items-center justify-center gap-2 mx-auto text-primary font-bold hover:underline"
              >
                <RotateCcw size={18} /> Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
