export const useIPFS = () => {
  const uploadMetadata = async (data: any): Promise<string> => {
    console.log('Uploading metadata to mock IPFS:', data);
    // Mimicking a slight delay for realism
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Hardcoded demo CID (deterministic mock)
    return `ipfs://bafybeiczsscdsbs7ffqz55asqdf3smv6klcw3gofszvwlyarci47bgf354`;
  };

  return { uploadMetadata };
};
