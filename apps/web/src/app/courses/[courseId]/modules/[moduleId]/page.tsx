'use client';

import { useParams, useRouter } from 'next/navigation';
import { COURSES } from '@/lib/courses';
import { useProgress } from '@/lib/useProgress';
import { Header } from '@/components/Header';
import { QuizComponent } from '@/components/QuizComponent';
import { ArrowLeft, BookOpen, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const { getProgress, completeModule, saveQuizScore } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);

  const { courseId, moduleId } = params as { courseId: string; moduleId: string };
  const course = COURSES.find(c => c.id === courseId);
  const moduleIndex = course?.modules.findIndex(m => m.id === moduleId) ?? -1;
  const module = course?.modules[moduleIndex];

  if (!course || !module) return <div>Module not found</div>;

  const progress = getProgress(courseId);
  const isCompleted = progress.completedModules.includes(moduleId);
  const nextModule = course.modules[moduleIndex + 1];

  const handleQuizPass = (score: number) => {
    saveQuizScore(courseId, moduleId, score);
    completeModule(courseId, moduleId);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Header />

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <Link 
          href={`/courses/${courseId}`}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#4f9cf9] mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Course
        </Link>

        <div className="space-y-12">
          {/* Module Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#4f9cf9]/10 px-3 py-1 text-xs font-bold text-[#4f9cf9] uppercase tracking-wider">
              <BookOpen className="h-3 w-3" /> Module {moduleIndex + 1}
            </div>
            <h1 className="text-4xl font-bold tracking-tight italic">{module.title}</h1>
            
            <div className="prose prose-invert max-w-none text-white/70 leading-relaxed text-lg">
              <p>{module.content}</p>
              <div className="my-8 rounded-2xl bg-white/5 p-8 border border-white/10 italic">
                {/* Mocked detailed content */}
                <h4 className="text-white font-bold not-italic mb-4 uppercase tracking-widest text-sm">Key Takeaways:</h4>
                <ul className="list-disc pl-5 space-y-2 text-base not-italic">
                  <li>Understanding the underlying architecture of {module.title}.</li>
                  <li>How this module fits into the broader Web3 ecosystem.</li>
                  <li>Best practices for implementing and securing these concepts.</li>
                </ul>
              </div>
            </div>

            {!showQuiz && !isCompleted && module.quiz && (
              <button 
                onClick={() => setShowQuiz(true)}
                className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-[#0a0f1e] transition-all hover:bg-white/90 hover:scale-[1.01]"
              >
                Take Module Quiz
              </button>
            )}

            {(isCompleted || !module.quiz) && (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                  <span className="font-bold">Module Completed!</span>
                </div>
                {nextModule ? (
                  <Link 
                    href={`/courses/${courseId}/modules/${nextModule.id}`}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-[#0a0f1e] hover:bg-white/90"
                  >
                    Next Module <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <Link 
                    href={`/courses/${courseId}/certificate`}
                    className="flex items-center gap-2 rounded-xl bg-[#f5c542] px-6 py-2.5 text-sm font-bold text-[#0a0f1e] hover:bg-[#f5c542]/90"
                  >
                    Go to Certificate <ChevronRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
          </motion.div>

          {/* Quiz Section */}
          <AnimatePresence>
            {showQuiz && module.quiz && (
              <motion.section 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-12 border-t border-white/5"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Final Assessment</h2>
                  <p className="text-white/50 text-sm">Complete this quiz to mark the module as finished.</p>
                </div>
                <QuizComponent 
                  quiz={module.quiz} 
                  onPass={handleQuizPass} 
                  onFail={() => {}} 
                />
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
