'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck } from 'lucide-react';

interface Props {
  courseName: string;
  recipientName: string;
  date: string;
  skills: string[];
  tokenId?: string;
  compact?: boolean;
}

export const CertificateCard = ({ courseName, recipientName, date, skills, tokenId, compact = false }: Props) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-3xl border-2 border-[#f5c542]/30 bg-gradient-to-br from-[#0a0f1e] via-[#1a2542] to-[#0a0f1e] shadow-[0_0_50px_rgba(245,197,66,0.15)] ${
        compact ? 'p-6 w-full max-w-sm' : 'p-12 w-full max-w-2xl'
      }`}
    >
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 h-full w-full opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative flex flex-col items-center text-center">
        <div className="mb-6 rounded-full bg-[#f5c542] p-4 shadow-[0_0_20px_rgba(245,197,66,0.4)]">
          <GraduationCap className={`text-[#0a0f1e] ${compact ? 'h-8 w-8' : 'h-12 w-12'}`} />
        </div>

        <h2 className={`font-serif uppercase tracking-widest text-[#f5c542] ${compact ? 'text-lg' : 'text-xl'}`}>
          Certificate of Completion
        </h2>
        
        <div className="my-6 h-px w-24 bg-[#f5c542]/40" />

        <p className="text-white/60 text-sm italic mb-2">This is to certify that</p>
        <p className={`font-bold text-white mb-6 underline decoration-[#f5c542]/50 underline-offset-8 ${compact ? 'text-xl' : 'text-3xl tracking-tight'}`}>
          {recipientName}
        </p>

        <p className="text-white/60 text-sm italic mb-2">has successfully completed the course</p>
        <p className={`font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-8 ${compact ? 'text-lg' : 'text-2xl'}`}>
          {courseName}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {skills.map(skill => (
            <span key={skill} className="rounded-lg border border-[#f5c542]/20 bg-[#f5c542]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#f5c542]">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex w-full items-end justify-between mt-4">
          <div className="text-left">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Date Issued</p>
            <p className="text-xs font-bold text-white/80">{date}</p>
          </div>

          <div className="flex flex-col items-center gap-1">
             <ShieldCheck className="h-10 w-10 text-[#f5c542]/20" />
             {tokenId && <p className="text-[8px] text-white/30 font-mono">Token ID: #{tokenId}</p>}
          </div>

          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Authority</p>
            <p className="text-xs font-bold text-white/80">CertiMint Protocol</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
