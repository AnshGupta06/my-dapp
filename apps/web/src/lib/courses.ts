import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'blockchain-fundamentals',
    title: 'Blockchain Fundamentals',
    description: 'Master the core concepts of decentralization, cryptography, and consensus mechanisms.',
    difficulty: 'Beginner',
    duration: '4 hours',
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832',
    skills: ['Blockchain', 'Cryptography', 'Consensus Mechanisms', 'DeFi Basics'],
    modules: [
      {
        id: 'what-is-blockchain',
        title: 'What is Blockchain?',
        content: 'A blockchain is a distributed ledger that records transactions across many computers...',
        quiz: {
          passingScore: 2,
          questions: [
            {
              id: 'q1',
              question: 'What is a blockchain?',
              options: ['A central database', 'A distributed ledger', 'A cloud storage service'],
              correctIndex: 1
            },
            {
              id: 'q2',
              question: 'Is blockchain reversible?',
              options: ['Yes', 'No', 'Sometimes'],
              correctIndex: 1
            },
            {
              id: 'q3',
              question: 'What is a block in a blockchain?',
              options: ['A set of data', 'A physical device', 'A network node'],
              correctIndex: 0
            }
          ]
        }
      },
      { id: 'how-cryptography-works', title: 'How Cryptography Works', content: 'Encryption and hashing are the foundations...' },
      { id: 'consensus-mechanisms', title: 'Consensus (PoW vs PoS)', content: 'Proof of Work vs Proof of Stake...' },
      { id: 'intro-to-defi', title: 'Intro to DeFi', content: 'Decentralized Finance allows for peer-to-peer financial services...' }
    ]
  },
  {
    id: 'solidity-development',
    title: 'Solidity Smart Contract Development',
    description: 'Deep dive into writing secure and efficient smart contracts using Solidity.',
    difficulty: 'Intermediate',
    duration: '8 hours',
    imageUrl: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=2832',
    skills: ['Solidity', 'ERC20', 'ERC721', 'Smart Contract Security'],
    modules: [
      { id: 'solidity-syntax', title: 'Solidity Syntax', content: 'Variables, functions, and control structures...' },
      { id: 'writing-erc20', title: 'Writing ERC20', content: 'Creating your first fungible token...' },
      { id: 'writing-erc721', title: 'Writing ERC721', content: 'Implementing the NFT standard...' },
      { id: 'security-patterns', title: 'Security Patterns', content: 'Reentrancy, overflow, and other vulnerabilities...' }
    ]
  },
  {
    id: 'web3-frontend',
    title: 'Web3 Frontend Development',
    description: 'Learn to build beautiful and functional dApp interfaces with React and Wagmi.',
    difficulty: 'Advanced',
    duration: '6 hours',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=2832',
    skills: ['wagmi', 'ethers.js', 'RainbowKit', 'IPFS'],
    modules: [
      { id: 'connecting-wallets', title: 'Connecting Wallets', content: 'Using RainbowKit to onboard users...' },
      { id: 'reading-contract-data', title: 'Reading Contract Data', content: 'Fetching data from the blockchain...' },
      { id: 'writing-transactions', title: 'Writing Transactions', content: 'Executing state-changing calls...' },
      { id: 'ipfs-metadata', title: 'IPFS & Metadata', content: 'Storing NFT content off-chain...' }
    ]
  }
];
