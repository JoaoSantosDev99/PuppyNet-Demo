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

  const registryAddress = "0x0B81948E50Df52866eC3787d2c4c850888594EfF";
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
    <header className="w-full flex justify-center pt-1 px-1">
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <div className="max-w-screen-2xl w-full flex justify-between items-center p-2 rounded-md bg-[#242424e3]">
          <h1>
            <Link to="/">
              <div className="flex w-36 h-14 rounded-md bg-white font-bold text-xl justify-center items-center">
                LOGO
              </div>
            </Link>
          </h1>

          {isConnected ? (
            <div className="bg-[#d6d6d6] font-bold text-lg p-3 rounded-md">
              {primaryDomain !== "" ? (
                <>{primaryDomain}.inu</>
              ) : (
                addressShortener(address)
              )}
            </div>
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
        <div className="max-w-screen-2xl bg-[#484848f0] text-white font-bold w-full flex justify-center gap-4 items-center p-2 rounded-md">
          This is a demo running on Puppynet{" "}
          <img
            src={puppy}
            alt=""
            className="w-7 h-7"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
