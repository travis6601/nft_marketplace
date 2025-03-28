import NftCollections from "~/components/ui/NftCollections/NftCollection";

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-white">
      <main className="container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">NFT Marketplace</h1>
          <p className="text-gray-500 mb-8">
            Discover, collect, and sell extraordinary NFTs
          </p>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Top Collections</h2>
            <NftCollections />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
