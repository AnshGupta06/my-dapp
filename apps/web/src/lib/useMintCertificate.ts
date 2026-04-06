import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './contract';

export const useMintCertificate = () => {
  const { writeContract, data: hash, isPending: isWritePending, error: writeError } = useWriteContract();
  
  const { isLoading: isWaitingForTx, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const mint = async (to: string, courseName: string, skills: string[], metadataURI: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'mintCertificate',
      args: [to as `0x${string}`, courseName, skills, metadataURI],
    });
  };

  return { 
    mint, 
    hash, 
    isLoading: isWritePending || isWaitingForTx, 
    isSuccess, 
    error: writeError 
  };
};
