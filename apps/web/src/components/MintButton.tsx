'use client';

import { useMintCertificate } from '../lib/useMintCertificate';
import { useIPFS } from '../lib/useIPFS';
import { Loader2, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Props {
  address: string;
  courseName: string;
  skills: string[];
  onSuccess?: (hash: string) => void;
}

export const MintButton = ({ address, courseName, skills, onSuccess }: Props) => {
  const { mint, isLoading, isSuccess, hash, error } = useMintCertificate();
  const { uploadMetadata } = useIPFS();

  useEffect(() => {
    if (isSuccess && hash) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f9cf9', '#8b5cf6', '#f5c542']
      });
      onSuccess?.(hash);
    }
  }, [isSuccess, hash, onSuccess]);

  const handleMint = async () => {
    try {
      // 1. Upload metadata to IPFS (mocked)
      const metadata = {
        name: `${courseName} Certificate`,
        description: `Certificate awarded to ${address} for completing ${courseName}.`,
        courseName,
        skills,
        recipient: address,
        date: new Date().toISOString()
      };
      
      const metadataURI = await uploadMetadata(metadata);

      // 2. Mint the NFT
      await mint(address, courseName, skills, metadataURI);
    } catch (e) {
      console.error('Minting failed:', e);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleMint}
        disabled={isLoading || isSuccess}
        className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-lg font-bold transition-all ${
          isSuccess 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 cursor-default'
            : 'bg-gradient-to-r from-[#4f9cf9] to-[#8b5cf6] text-white hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,156,249,0.5)] active:scale-95 disabled:opacity-50 disabled:scale-100'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            Minting on Sepolia...
          </>
        ) : isSuccess ? (
          <>
            <Zap className="h-6 w-6" />
            Certificate Minted!
          </>
        ) : (
          <>
            <Zap className="h-6 w-6" />
            Mint My NFT Certificate
          </>
        )}
      </button>

      {error && (
        <p className="text-center text-sm text-rose-400 bg-rose-400/10 p-3 rounded-xl border border-rose-400/20">
          Error: {error.message.includes('user rejected') ? 'Transaction rejected by user' : 'Something went wrong. Do you have Sepolia ETH?'}
        </p>
      )}

      {hash && (
        <a 
          href={`https://sepolia.etherscan.io/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-xs text-white/40 hover:text-[#4f9cf9] transition-colors"
        >
          View on Etherscan: {hash.slice(0, 10)}...{hash.slice(-8)}
        </a>
      )}
    </div>
  );
};
