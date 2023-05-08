import { Chain } from "wagmi";

export const puppynet = {
  id: 719,
  name: "Puppy Net",
  network: "puppyNet",
  nativeCurrency: {
    decimals: 18,
    name: "BONE",
    symbol: "BONE",
  },
  rpcUrls: {
    public: { http: ["https://puppynet.shibrpc.com"] },
    default: { http: ["https://puppynet.shibrpc.com"] },
  },
  blockExplorers: {
    etherscan: { name: "SnowTrace", url: "https://puppyscan.shib.io/s" },
    default: { name: "SnowTrace", url: "https://puppyscan.shib.io/s" },
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 11_907_934,
    },
  },
} as const satisfies Chain;
