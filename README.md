# Land Registry System

Welcome to the Land Registry System, a decentralized application built on blockchain technology. This system allows users and officials to securely register and manage land ownership records. The backend is developed using Solidity and TypeScript, while the frontend utilizes Next.js with Tailwind CSS.

## Getting Started

To begin using the Land Registry System, follow these instructions:

### Backend Setup

1. Open the command line and navigate to the "blockchain" folder.
2. Run the following command to install the necessary dependencies:
   ```
   npm install
   ```
3. Compile the script by running the command:
   ```
   npx hardhat compile
   ```
4. Deploy the contract by executing the command:
   ```
   npx hardhat run .\scripts\deploy.ts --network polygon_mumbai
   ```

### Frontend Setup

1. Open the command line and navigate to the "frontend" folder.
2. Install the frontend dependencies by running the following command:
   ```
   npm install
   ```

## Running the System

After completing the setup steps, you can now run the Land Registry System:

1. Start the frontend server by executing the command:
   ```
   npm run dev
   ```
2. Open your web browser and visit [https://localhost:3000](https://localhost:3000) to access the system.

