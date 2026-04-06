'use client';

import Link from 'next/link';
import { Course, UserProgress } from '../types';
import { SkillBadge, DifficultyBadge } from './Badges';

import { Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  course: Course;
  progress: UserProgress;
}

export const CourseCard = ({ course, progress }: Props) => {
  const completionPercentage = (progress.completedModules.length / course.modules.length) * 100;

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:bg-white/10"
    >
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <img 
          src={course.imageUrl} 
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <DifficultyBadge difficulty={course.difficulty} />
          <div className="flex items-center gap-1 text-xs text-white/50">
            <Clock className="h-3 w-3" /> {course.duration}
          </div>
        </div>

        <h3 className="text-xl font-bold text-white group-hover:text-[#4f9cf9] transition-colors line-clamp-1">
          {course.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {course.skills.slice(0, 3).map(skill => (
            <SkillBadge key={skill} skill={skill} />
          ))}
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between text-xs text-white/70 mb-1.5">
            <span>Progress</span>
            <span>{Math.round(completionPercentage)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              className="h-full bg-gradient-to-r from-[#4f9cf9] to-[#8b5cf6]"
            />
          </div>
        </div>

        <Link 
          href={`/courses/${course.id}`}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#4f9cf9] py-2.5 text-sm font-bold text-white transition-all hover:bg-[#3d85d9] hover:shadow-[0_0_20px_rgba(79,156,249,0.4)]"
        >
          {progress.completedModules.length === course.modules.length ? 'Review Course' : 'Continue Learning'}
        </Link>
      </div>

      {progress.canMint && (
        <div className="absolute top-2 right-2 rounded-full bg-[#f5c542] p-1.5 shadow-lg animate-pulse">
          <CheckCircle2 className="h-5 w-5 text-[#0a0f1e]" />
        </div>
      )}
    </motion.div>
  );
};
