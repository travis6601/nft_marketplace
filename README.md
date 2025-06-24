# NFT Marketplace Project

This repository contains a complete NFT Marketplace project, including smart contracts, backend services, and a frontend application. The project is structured into multiple directories for better organization and modularity.

## Project Structure

- **contracts/**: Contains Solidity smart contracts for the NFT marketplace.

  - `MarketplaceNft.sol`: The main marketplace contract for handling NFT transactions.
  - `Nft.sol`: A contract for minting and managing NFTs.

- **deploy_contracts/**: Contains the Hardhat project for deploying and testing the smart contracts.

  - `hardhat.config.ts`: Configuration file for Hardhat.
  - `ignition/`: Contains deployment modules for the contracts.
  - `test/`: Contains test scripts for the smart contracts.

- **nft_marketplace-backend/**: Backend services for the NFT marketplace.

  - `prisma/`: Database schema and migrations using Prisma.
  - `src/`: Source code for the backend API.
  - `uploads/`: Directory for handling file uploads.

- **nft_marketplace-frontend/**: Frontend application for the NFT marketplace.

  - Built with [Next.js](https://nextjs.org).
  - Includes pages, components, and assets for the user interface.

## Getting Started

### Prerequisites

- Node.js
- npm, yarn, pnpm, or bun (for package management)
- Hardhat (for smart contract deployment and testing)

### Setting Up the Project

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/nft-marketplace.git
   cd nft-marketplace
   ```

2. Install dependencies for each module:

   ```bash
   # Deploy Contracts
   cd deploy_contracts
   npm install

   # Backend
   cd ../nft_marketplace-backend
   npm install

   # Frontend
   cd ../nft_marketplace-frontend
   npm install
   ```

### Running the Project

#### Deploy Contracts

Preparing environment variables:
Create a `.env` file in the `deploy_contracts` directory and add the following variables:

```plaintext
PRIVATE_KEY=your_wallet_private_key
RPC_URL=your_rpc_url
```

1. Navigate to the `deploy_contracts` directory:

   ```bash
   cd deploy_contracts
   ```

2. Compile the contracts:

   ```bash
   npx hardhat compile
   ```

3. Deploy the contracts:

   ```bash
   npx hardhat ignition deploy ./ignition/modules/Lock.ts
   ```

#### Backend

Preparing environment variables:
Create a `.env` file in the `nft_marketplace-backend` directory and add the following variables:

```plaintext
PORT=3001
RPC_URL=your_rpc_url
DATABASE_URL=your_database_url -> currently using Postgres
PRIVATE_KEY=your_wallet_private_key
PINATA_GATEWAY_URL=your_pinata_gateway_url
PINATA_GATEWAY_KEY=your_pinata_gateway_key
PINATA_JWT=your_pinata_jwt
```

1. Navigate to the `nft_marketplace-backend` directory:

   ```bash
   cd nft_marketplace-backend
   ```

2. Start the backend server:

   ```bash
   npm run dev
   ```

#### Frontend

Preparing environment variables:
Create a `.env` file in the `nft_marketplace-frontend` directory and add the following variables:

```plaintext
NEXT_PUBLIC_PINATA_GATEWAY_KEY=your_pinata_gateway_key
```

1. Navigate to the `nft_marketplace-frontend` directory:

   ```bash
   cd nft_marketplace-frontend
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Learn More

- [Hardhat Documentation](https://hardhat.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Preview

To preview the NFT Marketplace in action, you can watch the following video:

[Watch the demo](./preview.mp4)
