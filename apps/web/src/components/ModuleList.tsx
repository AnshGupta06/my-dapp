'use client';

import { Module, UserProgress } from '../types';
import { CheckCircle2, Lock, PlayCircle, FileText } from 'lucide-react';
import Link from 'next/link';

interface Props {
  courseId: string;
  modules: Module[];
  progress: UserProgress;
}

export const ModuleList = ({ courseId, modules, progress }: Props) => {
  return (
    <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      {modules.map((module, index) => {
        const isCompleted = progress.completedModules.includes(module.id);
        const isPreviousCompleted = index === 0 || progress.completedModules.includes(modules[index - 1].id);
        const isLocked = !isPreviousCompleted;

        return (
          <div 
            key={module.id}
            className={`flex items-center justify-between p-4 transition-colors ${
              isLocked ? 'opacity-50 grayscale' : 'hover:bg-white/5'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'
              }`}>
                {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{module.title}</h4>
                <div className="flex items-center gap-2 text-[10px] text-white/40 mt-1 uppercase tracking-wider">
                  {module.videoUrl ? (
                    <span className="flex items-center gap-1"><PlayCircle className="h-3 w-3" /> Video</span>
                  ) : (
                    <span className="flex items-center gap-1"><FileText className="h-3 w-3" /> Reading</span>
                  )}
                  {module.quiz && <span>• Quiz</span>}
                </div>
              </div>
            </div>

            {isLocked ? (
              <Lock className="h-5 w-5 text-white/20" />
            ) : (
              <Link 
                href={`/courses/${courseId}/modules/${module.id}`}
                className="rounded-lg bg-white/5 px-4 py-1.5 text-xs font-bold text-white transition-all hover:bg-[#4f9cf9] hover:text-white"
              >
                {isCompleted ? 'Review' : 'Start'}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};
