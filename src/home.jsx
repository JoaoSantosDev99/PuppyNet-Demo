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
  const registryAddress = "0xa3e95A1a797711b779d3B70aA4B8380d6b1cf5BF";

  const [inputText, setInputText] = useState("");
  const [available, setAvailable] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [totalDomains, setTotalDomains] = useState(0);
  const [domainList, setDomainList] = useState([]);

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://puppynet.shibrpc.com"
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
    if (chain?.id !== 719) {
      switchNetwork?.(719);
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
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
    );

    setInputText(
      e.target.value
        .replace(".", "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .slice(0, 32)
    );
  };

  const handleFilterText = (e) => {
    setFilterText(
      e.target.value
        .replace(".", "")
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .toLowerCase()
        .trim()
    );

    console.log(filterText);
  };

  const validateAddress = async (text) => {
    const parsedText = ethers.utils.formatBytes32String(text);

    const call = await readRegistryContract.checkAvailable(parsedText);
    setAvailable(call);
    console.log("call", call);
  };

  const purchaseDomain = async () => {
    if (signer === undefined) {
      connectWallet();
    }

    if (chain?.id !== 719) {
      switchNetwork?.(719);
    }

    try {
      const parsedText = ethers.utils.formatBytes32String(inputText);
      console.log("parsed", parsedText);
      const newDomain = await registryContract.newDomain(parsedText);
      await newDomain.wait();
      alert("New Domain Created!");
    } catch (error) {
      console.log(error);
    }
  };

  const checkBefore = () => {
    if (signer === undefined) {
      return alert("Please Connect Wallet");
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
        totalData.push({
          owner: owner,
          domain: ethers.utils.parseBytes32String(domain),
        });
      }

      setDomainList(totalData);
      console.log("Total data:", totalData);
    };

    fetchInitialData();
  }, []);

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl min-h-[90vh] w-full flex flex-col items-center ">
        <a
          href="https://puppynetfaucet.com/"
          target="_blank"
          rel="noreferrer"
        >
          <h2 className="mt-40 mb-5 px-5 py-3 font-semibold rounded-lg bg-[#00e3ee]">
            Get $BONE for testing here
          </h2>
        </a>

        {/* Purchase new domain */}
        <div className="flex w-80 flex-col items-center justify-center bg-[#646464] p-2 rounded-md">
          <h3 className="text-xl font-bold mb-3 text-white">
            Purchase New Domain
          </h3>

          <div className=" flex flex-col items-center mb-2">
            <input
              spellCheck={false}
              value={inputText}
              placeholder="mydomain.inu"
              onChange={handleInputText}
              type="text"
              className="bg-[#ffffff] w-md mb-2 text-center placeholder:text-[#898989] text-[#000000] rounded-lg h-10 px-2 italic font-bold border-[2px] border-[#404040] outline-none"
            />
            {inputText !== "" && (
              <div>
                {!available ? (
                  <span className="text-[#000000] font-bold flex justify-center items-center gap-2">
                    Address already taken!
                  </span>
                ) : (
                  <span className="text-[#ededed] font-bold flex justify-center items-center gap-2">
                    {chain?.id !== 719 ? (
                      "Please, connect or switch to Puppynet."
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

        {/* User buttons */}
        <Link
          onClick={checkBefore}
          to={signer && "/user"}
        >
          <button className="bg-[#ebebeb] mt-2 w-[320px] flex justify-center items-center h-12 rounded-md text-[#000000] font-bold p-2">
            My Domains
          </button>
        </Link>

        {/* Search For Domain */}
        <div className=" flex flex-col items-center mt-20 mb-2">
          <h2 className="text-white font-bold text-2xl">
            Search for Specific Domain
          </h2>
          <input
            spellCheck={false}
            value={filterText}
            placeholder="Search Domain"
            onChange={handleFilterText}
            type="text"
            className="bg-[#ffffff] w-md mb-2 text-center placeholder:text-[#898989] text-[#000000] rounded-lg h-10 px-2 italic font-bold border-[2px] border-[#686868] outline-none"
          />
          {filterText !== "" && (
            <div className="absolute mt-20 w-[300px] bg-[#c7c7c7] gap-1 rounded-md py-3 flex flex-col items-center">
              {domainList
                .filter((item) => item.domain.includes(filterText))
                .map((item) => (
                  <span className="p-2 rounded-lg">{item.domain}</span>
                )).length === 0 ? (
                <span className="p-2 bg-[#a3a3a3] text-center rounded-md font-bold w-[90%]">
                  Not results found
                </span>
              ) : (
                domainList
                  .filter((item) => item.domain.includes(filterText))
                  .map((item) => (
                    <Link
                      className="w-full flex justify-center"
                      to={`/domain/${item.domain}`}
                    >
                      <span className="p-2 bg-[#a3a3a3] text-center rounded-md font-semibold w-[90%]">
                        {item.domain}.inu
                      </span>
                    </Link>
                  ))
              )}
            </div>
          )}
        </div>

        {/* Domains List */}
        <ul className="mt-20 mb-32 max-w-4xl flex justify-center flex-wrap gap-2">
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
                key={item.domain}
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
