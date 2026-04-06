export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as const; // Mock address for local/simulated demo

export const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "courseName", "type": "string" },
      { "internalType": "string[]", "name": "skills", "type": "string[]" },
      { "internalType": "string", "name": "metadataURI", "type": "string" }
    ],
    "name": "mintCertificate",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "getCertificate",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "courseName", "type": "string" },
          { "internalType": "uint256", "name": "completionDate", "type": "uint256" },
          { "internalType": "string[]", "name": "skills", "type": "string[]" },
          { "internalType": "address", "name": "recipient", "type": "address" },
          { "internalType": "string", "name": "metadataURI", "type": "string" }
        ],
        "internalType": "struct CourseCertificate.CertificateData",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "name": "hasMinted",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "recipient", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" },
      { "indexed": false, "internalType": "string", "name": "courseName", "type": "string" }
    ],
    "name": "CertificateMinted",
    "type": "event"
  }
] as const;
