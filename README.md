# CertiMint - NFT Course Certificate Platform

A decentralized application for earning and minting verifiable soulbound NFT certificates upon course completion.

## 🚀 Overview
CertiMint allows students to take courses, pass quizzes, and claim on-chain credentials. These certificates are Soulbound tokens (SBTs), meaning they are non-transferable and tied to the student's unique wallet address.

## 📁 Project Structure
- `apps/web/`: Next.js 14 frontend using Wagmi, RainbowKit, and Tailwind CSS.
- `contracts/`: Solidity smart contracts (ERC721 Soulbound).
- `scripts/`: Deployment scripts for Sepolia/Arbitrum.

## 🛠 Tech Stack
- **Frontend**: Next.js, Wagmi, viem, RainbowKit, Framer Motion.
- **Contracts**: Solidity, Hardhat, OpenZeppelin.
- **Storage**: IPFS (Metadata).

## 🔗 Smart Contract
The `CourseCertificate` contract is an ERC721 that overrides transfer functions to make tokens non-transferable.
- Address (Sepolia): `0x5FbDB2315678afecb367f032d93F642f64180aa3` (Example)

## 🏃 Run Locally

1. **Install Dependencies**:
   ```bash
   npm install
   cd apps/web && npm install
   ```

2. **Set Environment Variables**:
   Update `apps/web/.env` with your WalletConnect Project ID.

3. **Start Development Server**:
   ```bash
   cd apps/web
   npm run dev
   ```

4. **Connect Wallet**:
   Use MetaMask or any WalletConnect-compatible wallet on the Sepolia testnet.

## 🎓 Learning Flow
1. Browse available courses.
2. Complete all modules in a course.
3. Pass a multiple-choice quiz for each module.
4. Preview your premium parchment certificate.
5. Mint your NFT on Sepolia.
6. View your collection in "My Certificates".

Generated with ❤️ by Antigravity.
