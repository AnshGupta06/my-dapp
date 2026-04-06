'use client';

import { useParams } from 'next/navigation';
import { useAccount } from 'wagmi';
import { COURSES } from '@/lib/courses';
import { useProgress } from '@/lib/useProgress';
import { Header } from '@/components/Header';
import { CertificateCard } from '@/components/CertificateCard';
import { MintButton } from '@/components/MintButton';
import { ArrowLeft, Lock, Trophy } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CertificatePage() {
  const params = useParams();
  const { address, isConnected } = useAccount();
  const { getProgress } = useProgress();

  const courseId = params.courseId as string;
  const course = COURSES.find(c => c.id === courseId);
  const progress = getProgress(courseId);

  if (!course) return <div>Course not found</div>;

  const canClaim = progress.canMint;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Header />

      <main className="container mx-auto max-w-4xl px-4 py-12">
        <Link 
          href={`/courses/${courseId}`}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#4f9cf9] mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Curriculum
        </Link>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full space-y-12"
          >
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#f5c542]/10 text-[#f5c542] mb-4">
                <Trophy className="h-8 w-8" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight italic">Claim Your NFT Certificate</h1>
              <p className="max-w-xl mx-auto text-white/60 leading-relaxed">
                Congratulations! You've completed all modules and passed all assessments for 
                <span className="text-white font-medium"> {course.title}</span>. 
                Mint your verifiable soulbound token below.
              </p>
            </div>

            {/* Certificate Preview */}
            <div className="flex justify-center perspective-1000">
              <CertificateCard 
                courseName={course.title}
                recipientName={address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Unnamed Student'}
                date={new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                skills={course.skills}
              />
            </div>

            {/* Mint Action */}
            <div className="max-w-md mx-auto w-full">
              {isConnected ? (
                canClaim ? (
                  <MintButton 
                    address={address!} 
                    courseName={course.title} 
                    skills={course.skills}
                  />
                ) : (
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6 text-center">
                    <Lock className="mx-auto h-8 w-8 text-rose-400 mb-3" />
                    <h4 className="font-bold text-rose-400 mb-1">Requirements Not Met</h4>
                    <p className="text-xs text-white/50 mb-4 tracking-tight">
                      You must complete all modules and pass all quizzes before minting.
                    </p>
                    <Link href={`/courses/${courseId}`} className="text-sm font-bold underline underline-offset-4 hover:text-white transition-colors">
                      Return to Curriculum
                    </Link>
                  </div>
                )
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
                   <p className="text-white/60 mb-6 font-medium">Connect your wallet to claim your reward</p>
                   {/* WalletConnect button is in Header, but we can put a prompt here too */}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
