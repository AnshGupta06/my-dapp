'use client';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Award, BookOpen, GraduationCap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0f1e]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="rounded-lg bg-gradient-to-br from-[#4f9cf9] to-[#8b5cf6] p-2">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white sm:inline hidden">
            Certi<span className="text-[#4f9cf9]">Mint</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Courses
          </Link>
          <Link href="/certificates" className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <Award className="h-4 w-4" /> My Certificates
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ConnectButton 
            chainStatus="icon" 
            showBalance={false}
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
          />
        </div>
      </div>
    </header>
  );
};
