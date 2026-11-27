/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [''],
  },
  env: {
    MAP_BOX_TOKEN: process.env.MAP_BOX_TOKEN,
    NFT_URL: 'https://api.nft.storage/',
    NFT_API_KEY: process.env.NFT_API_KEY,
    LOCAL_CONTRACT_ADDRESS: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    REMOTE_NETWORK_URL: process.env.REMOTE_NETWORK_URL,
    POLYGON_MATIC_CONTRACT_ADDRESS: process.env.POLYGON_MATIC_CONTRACT_ADDRESS,
    ALCHEMY_URL: process.env.ALCHEMY_URL,
    CONTRACT_ADDRESS_ON_ALCHEMY: process.env.CONTRACT_ADDRESS_ON_ALCHEMY,
    LOCALLAND_ARCHIVE_API_URL: 'http://localhost:3001/lands',
  },
};

module.exports = nextConfig;

