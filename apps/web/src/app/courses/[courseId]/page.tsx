'use client';

import { useParams, useRouter } from 'next/navigation';
import { COURSES } from '@/lib/courses';
import { useProgress } from '@/lib/useProgress';
import { Header } from '@/components/Header';
import { ModuleList } from '@/components/ModuleList';
import { DifficultyBadge } from '@/components/Badges';
import { ArrowLeft, Clock, Zap, Award, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CoursePage() {
  const params = useParams();
  const router = useRouter();
  const { getProgress } = useProgress();
  
  const courseId = params.courseId as string;
  const course = COURSES.find(c => c.id === courseId);
  const progress = getProgress(courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const completedCount = progress.completedModules.length;
  const isFinished = completedCount === course.modules.length;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#4f9cf9] mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Courses
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar / Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <img 
                src={course.imageUrl} 
                className="h-48 w-full object-cover" 
                alt={course.title}
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <DifficultyBadge difficulty={course.difficulty} />
                  <span className="flex items-center gap-1 text-xs text-white/40"><Clock className="h-3 w-3" /> {course.duration}</span>
                </div>
                <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#4f9cf9]">Skills You'll Master</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map(skill => (
                      <span key={skill} className="bg-white/5 text-white/80 px-3 py-1 rounded-lg text-xs border border-white/5">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-5 w-5 text-[#f5c542]" />
                <h4 className="font-bold">Course Reward</h4>
              </div>
              <p className="text-sm text-white/50 mb-6 italic leading-relaxed">
                Complete all modules and pass the final assessment to earn your Soulbound NFT Certificate.
              </p>
              {isFinished ? (
                 <Link 
                  href={`/courses/${courseId}/certificate`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4f9cf9] to-[#8b5cf6] py-3 text-sm font-bold shadow-[0_0_20px_rgba(79,156,249,0.3)] hover:scale-[1.02] transition-all"
                >
                  <GraduationCap className="h-4 w-4" /> Claim Certificate
                </Link>
              ) : (
                <div className="flex items-center gap-3 opacity-50 bg-white/5 p-3 rounded-xl border border-dashed border-white/10">
                   <Zap className="h-5 w-5" />
                   <span className="text-xs font-medium">Reward locked until completion</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content / Modules */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold italic tracking-tight">Curriculum</h2>
              <div className="text-sm font-medium text-white/60">
                 {completedCount} / {course.modules.length} Modules Completed
              </div>
            </div>

            <ModuleList 
              courseId={courseId} 
              modules={course.modules} 
              progress={progress} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}
