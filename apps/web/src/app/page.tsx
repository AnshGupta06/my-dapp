'use client';

import { useAccount } from 'wagmi';
import { COURSES } from '@/lib/courses';
import { useProgress } from '@/lib/useProgress';
import { Header } from '@/components/Header';
import { CourseCard } from '@/components/CourseCard';
import { GraduationCap, Award, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { isConnected } = useAccount();
  const { getProgress } = useProgress();

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white selection:bg-[#4f9cf9]/30">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-4xl bg-[#4f9cf9]/20 blur-[120px] pointer-events-none" />
          
          <div className="container mx-auto px-4 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-[#4f9cf9]/30 bg-[#4f9cf9]/10 px-4 py-1.5 text-xs font-bold tracking-wider text-[#4f9cf9] uppercase mb-6">
                <Zap className="h-4 w-4 fill-[#4f9cf9]" /> The Future of Learning
              </span>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
                Earn Verifiable <br />
                <span className="bg-gradient-to-r from-[#4f9cf9] via-[#8b5cf6] to-[#f5c542] bg-clip-text text-transparent">
                  NFT Certificates
                </span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-white/60 mb-10 leading-relaxed">
                Complete modules, master skills, and mint soulbound tokens on Arbitrum or Sepolia. 
                Your on-chain diploma for the Web3 world—permanent and immutable.
              </p>
              
              {!isConnected && (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-4 rounded-2xl bg-white text-[#0a0f1e] font-bold text-lg hover:bg-white/90 transition-all hover:scale-105 active:scale-95">
                    Connect Wallet to Start
                  </button>
                  <p className="text-xs text-white/40 max-w-[200px] italic">
                    Requires a Web3 wallet on Sepolia testnet
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="pb-24 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: 'Soulbound Tokens', desc: 'Secure, non-transferable NFTs that stay in your wallet forever.' },
                { icon: Award, title: 'Skill Verifiability', desc: 'Employers can verify your skills instantly on the blockchain.' },
                { icon: GraduationCap, title: 'Gamified Learning', desc: 'Pass quizzes and complete modules to unlock your minting power.' },
              ].map((feature, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 border border-white/5">
                  <div className="mb-4 rounded-xl bg-[#4f9cf9]/10 p-3 text-[#4f9cf9]">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section id="courses" className="py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2 italic tracking-tight">Available Courses</h2>
                <p className="text-white/50">Choose a path and start your Web3 career today.</p>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-[#4f9cf9]">
                <span className="h-12 w-12 rounded-full border border-[#4f9cf9]/20 flex items-center justify-center bg-[#4f9cf9]/5">3</span>
                <span>Active Learning Paths</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {COURSES.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  progress={getProgress(course.id)} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer Stats */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-4 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Courses', value: '3' },
                { label: 'Minters', value: '1,240+' },
                { label: 'Blockchain', value: 'Sepolia' },
                { label: 'Type', value: 'ERC-721' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-white/40 text-[10px] uppercase tracking-widest">
        &copy; 2026 CertiMint Protocol. Built with [N]skills at CODE FODH.
      </footer>
    </div>
  );
}