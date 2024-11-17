import dotenv from 'dotenv';
import '@nomiclabs/hardhat-ethers';

dotenv.config();

export default {
  solidity: {
    version: '0.8.16',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    taikoHekla: {
      url: 'https://rpc.hekla.taiko.xyz/', // RPC URL for TAIKO HEKLA
      chainId: 167009, // Chain ID for TAIKO HEKLA
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
