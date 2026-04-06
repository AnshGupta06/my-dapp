'use client';

import { useState } from 'react';
import { Quiz, Question } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react';

interface Props {
  quiz: Quiz;
  onPass: (score: number) => void;
  onFail: (score: number) => void;
}

export const QuizComponent = ({ quiz, onPass, onFail }: Props) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const score = answers.reduce((acc, ans, idx) => 
    ans === quiz.questions[idx].correctIndex ? acc + 1 : acc, 0
  );

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
      const finalScore = newAnswers.reduce((acc, ans, idx) => 
        ans === quiz.questions[idx].correctIndex ? acc + 1 : acc, 0
      );
      if (finalScore >= quiz.passingScore) {
        onPass(finalScore);
      } else {
        onFail(finalScore);
      }
    }
  };

  const reset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setShowResult(false);
  };

  if (showResult) {
    const passed = score >= quiz.passingScore;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md"
      >
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
          {passed ? (
            <CheckCircle2 className="h-12 w-12 text-emerald-400" />
          ) : (
            <XCircle className="h-12 w-12 text-rose-400" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {passed ? 'Quiz Passed!' : 'Try Again'}
        </h3>
        <p className="text-white/60 mb-6">
          You scored {score} out of {quiz.questions.length}. 
          {passed ? ' Well done!' : ` You need at least ${quiz.passingScore} to pass.`}
        </p>
        {!passed && (
          <button 
            onClick={reset}
            className="flex items-center gap-2 mx-auto rounded-xl bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/20"
          >
            <RotateCcw className="h-4 w-4" /> Retake Quiz
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-xs text-white/50 tracking-widest uppercase">
        <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
        <div className="flex gap-1">
          {quiz.questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-8 rounded-full transition-colors ${
                i === currentQuestionIndex ? 'bg-[#4f9cf9]' : i < currentQuestionIndex ? 'bg-emerald-400' : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white leading-relaxed">
        {currentQuestion.question}
      </h3>

      <div className="grid gap-3">
        {currentQuestion.options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAnswer(index)}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:bg-white/10 hover:border-[#4f9cf9]/50 group"
          >
            <span className="text-white/80 group-hover:text-white">{option}</span>
            <ChevronRight className="h-4 w-4 text-white/30 group-hover:text-[#4f9cf9]" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
