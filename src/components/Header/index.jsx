import { useWeb3Modal } from "@web3modal/react";
import { Link, NavLink } from "react-router-dom";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { addressShortener } from "../../utils";
import { useEffect } from "react";
import { useState } from "react";
import { ethers } from "ethers";
import registryAbi from "../../contracts/registry_abi.json";
import puppy from "../../assets/dog.png";

const Header = () => {
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [primaryDomain, setPrimaryDomain] = useState("");

  const { address, isConnected } = useAccount();

  const connectWallet = () => {
    if (chain?.id !== 719) {
      switchNetwork?.(719);
    }
    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  const registryAddress = "0x80b5d1b70026DA1fD0Ac4ccF1b545f949b9f2444";

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://puppynet.shibrpc.com"
  );

  const readRegistryContract = new ethers.Contract(
    registryAddress,
    registryAbi,
    staticProvider
  );

  useEffect(() => {
    const fetchPrimaryDomain = async () => {
      if (isConnected) {
        const name = await readRegistryContract.primaryDomain(address);

        setPrimaryDomain(ethers.utils.parseBytes32String(name));
      }
    };

    fetchPrimaryDomain();
  }, []);

  return (
    <header className="w-full py-2 items-center bg-[#191919] flex justify-center pt-1 px-1">
      <div className="flex flex-col gap-1 max-w-screen-2xl w-full justify-center items-center">
        <div className="flex justify-between max-w-screen-2xl w-full">
          <h1>
            <Link to="/">
              <div className="flex w-36 h-14 rounded-md bg-white font-bold text-xl justify-center items-center">
                LOGO
              </div>
            </Link>
          </h1>

          {isConnected ? (
            <Link to="/user">
              <div className="bg-[#d6d6d6] font-bold text-lg p-3 rounded-md">
                {primaryDomain !== "" ? (
                  <>{primaryDomain.slice(0, 11)}.inu</>
                ) : (
                  addressShortener(address)
                )}
              </div>
            </Link>
          ) : (
            <div>
              <button
                onClick={connectWallet}
                className="hidden md:flex bg-[#d6d6d6] p-3 rounded-md"
              >
                Connect Wallet
              </button>
              <button
                onClick={connectWallet}
                className="md:hidden bg-[#d6d6d6] p-3 rounded-md"
              >
                Connect
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
