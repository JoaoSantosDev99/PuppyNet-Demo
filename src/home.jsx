import { useEffect, useState } from "react";
import ConnectButton from "./components/UI/ConnectButton";

import { useWeb3Modal } from "@web3modal/react";
import { Link, NavLink } from "react-router-dom";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import { addressShortener, longAddressCrop } from "./utils";
import DomainlistItem from "./components/UI/DomainItem";
import { ethers } from "ethers";
import registryAbi from "./contracts/registry_abi.json";

const Home = ({ setter }) => {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const registryAddress = "0x7A3Bf49274C893De0122eaDA97BFb572288B94fC";

  const [inputText, setInputText] = useState("");
  const [available, setAvailable] = useState(true);
  const [totalDomains, setTotalDomains] = useState(0);
  const [domainList, setDomainList] = useState([]);

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const readRegistryContract = new ethers.Contract(
    registryAddress,
    registryAbi,
    staticProvider
  );

  const registryContract = new ethers.Contract(
    registryAddress,
    registryAbi,
    signer
  );

  const connectWallet = () => {
    if (chain?.id !== 1) {
      switchNetwork?.(1);
    }
    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputText = (e) => {
    validateAddress(
      e.target.value
        .replace(".", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .trim()
    );

    setInputText(
      e.target.value
        .replace(".", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .trim()
    );
  };

  const validateAddress = async (text) => {
    const call = await readRegistryContract.checkAvailable(text);
    setAvailable(call);
    console.log(call);
  };

  const purchaseDomain = async () => {
    if (signer === undefined) {
      connectWallet();
    }

    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }

    try {
      const newDomain = await registryContract.newDomain(inputText);
      await newDomain.wait();
      alert("New Domain Created!");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const rawTotalSupply = await readRegistryContract.totalSupply();
      const totalSupply = ethers.utils.formatUnits(rawTotalSupply, 0);

      setTotalDomains(totalSupply);
      console.log("Total supply:", totalSupply);

      let totalData = [];
      for (let i = 0; i < totalSupply; i++) {
        const owner = await readRegistryContract.ownerOf(i);
        const domain = await readRegistryContract.tokenToDomain(i);
        totalData.push({ owner: owner, domain: domain });
      }

      setDomainList(totalData);
      console.log(totalData);
    };

    fetchInitialData();
  }, []);

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl w-full flex flex-col items-center ">
        {/* Connect Button */}

        {/* Purchase new domain */}
        <div className="mt-40 flex w-80 flex-col items-center justify-center bg-[#646464] p-2 rounded-xl">
          <h3 className="text-xl font-bold mb-3 text-white">
            Purchase New Domain
          </h3>

          <div className=" flex flex-col items-center mb-2">
            <input
              value={inputText}
              spellCheck={false}
              placeholder="mydomain.inu"
              onChange={handleInputText}
              type="text"
              className="bg-[#ffffff] w-md mb-2 text-center placeholder:text-[#898989] text-[#000000] rounded-lg h-10 px-2 italic font-bold border-[2px] border-[#0e4f84] outline-none"
            />
            {inputText !== "" && (
              <div>
                {!available ? (
                  <span className="text-[#000000] font-bold flex justify-center items-center gap-2">
                    Address already taken!
                  </span>
                ) : (
                  <span className="text-[#ededed] font-bold flex justify-center items-center gap-2">
                    {chain?.id !== 5 ? (
                      "Please, connect or switch to Goerli."
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="flex gap-1">{inputText}.inu</span>
                        <button
                          onClick={purchaseDomain}
                          className="p-2 bg-[#000] rounded-lg"
                        >
                          purchase Domain
                        </button>
                      </div>
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="w-80 flex justify-center items-center bg-white h-80 mt-2 rounded-xl">
          Image 2
        </div>

        {/* User buttons */}
        <div className="mt-5">
          {isConnected ? (
            <ConnectButton title={longAddressCrop(address)} />
          ) : (
            <div>
              <div className="hidden md:flex">
                <ConnectButton
                  title="Connect Wallet"
                  onClick={connectWallet}
                />
              </div>
              <div className="md:hidden">
                <ConnectButton
                  title="Connect"
                  onClick={connectWallet}
                />
              </div>
            </div>
          )}
        </div>

        <Link to="/user">
          <button className="bg-[#606060] mt-2 max-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#f8f8f8] font-bold p-2">
            My Domains
          </button>
        </Link>

        {/* Domains List */}
        <ul className="mt-20 mb-32 max-w-4xl flex flex-wrap gap-2">
          {domainList.length === 0 ? (
            <span className="text-white font-bold text-3xl">
              Loading Domains...
            </span>
          ) : (
            domainList.map((item) => (
              <DomainlistItem
                domain={item.domain}
                owner={item.owner}
                subCount={"To be impl."}
                setter={setter}
              />
            ))
          )}
        </ul>

        {/* <button className="bg-[#3d3d3d] mb-20 max-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#e7e7e7] font-bold">
          More
        </button> */}
      </div>
    </section>
  );
};

export default Home;
