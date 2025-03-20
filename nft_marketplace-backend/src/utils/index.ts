const parsedTokenUri = (tokenUri: string) => {
  const ipfsId = tokenUri.split("://")[1];
  return `https://ipfs.io/ipfs/${ipfsId}`;
};

export { parsedTokenUri };
