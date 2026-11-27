import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths: {
    artifacts: "../frontend/artifacts",
  },

  networks: {
    hardhat: {
      chainId: 1337,
    },
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/9YRdKIGi3PLgEUjVdxt5Cn3Y2nEwHnzd",
      accounts: [
        `0xfb7cfa46a786941f95417ab809acc2632649a15edcfe17dc409ac0f47d7772da`,
      ],
    },
  },
};

export default config;
