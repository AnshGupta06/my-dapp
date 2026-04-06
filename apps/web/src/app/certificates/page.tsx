'use client';

import { useAccount, useWatchContractEvents } from 'wagmi';
import { Header } from '@/components/Header';
import { CertificateCard } from '@/components/CertificateCard';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { ShieldAlert, Info, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CertificatesGallery() {
  const { address, isConnected } = useAccount();
  const [certificates, setCertificates] = useState<any[]>([]);

  // In a real app, we'd use useReadContract to fetch all tokens for user or listen to events
  // For demo, we might mock historical mints if the user has completed courses
  
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <Header />

      <main className="container mx-auto px-4 py-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold italic tracking-tight mb-2">My On-Chain Diplomas</h1>
          <p className="text-white/50">Your verifiable credentials, secured by the CertiMint protocol.</p>
        </div>

        {!isConnected ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-20 text-center">
            <div className="mb-6 rounded-full bg-white/5 p-4 text-white/40">
              <ShieldAlert className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Wallet Not Connected</h3>
            <p className="max-w-xs text-white/40 mb-8 italic">Connect your wallet to view your earned NFT certificates recorded on-chain.</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-20 text-center">
            <div className="mb-6 rounded-full bg-[#4f9cf9]/10 p-4 text-[#4f9cf9]">
              <Info className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Certificates Found</h3>
            <p className="max-w-sm text-white/40 mb-8 italic">You haven't minted any certificates yet. Complete a course and pass the final exam to earn your first NFT!</p>
            <a href="/#courses" className="rounded-xl bg-[#4f9cf9] px-8 py-3 text-sm font-bold text-white transition-all hover:scale-105 active:scale-95">
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Real list rendering would go here */}
          </div>
        )}

        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-[#4f9cf9]/10 to-transparent border border-[#4f9cf9]/20 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="space-y-1">
              <h4 className="font-bold text-lg">Looking for a real job?</h4>
              <p className="text-sm text-white/60">Your soulbound certificates can be linked to your LinkedIn or Web3 CV profile.</p>
           </div>
           <button className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-6 py-3 text-sm font-bold hover:bg-white/20 transition-all text-white">
              <ExternalLink className="h-4 w-4" /> Export to OpenSea
           </button>
        </div>
      </main>
    </div>
  );
}
