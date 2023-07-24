import { useEffect, useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { Link } from "react-router-dom";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import DomainlistItem from "./components/UI/DomainItem";
import { ethers } from "ethers";
import registryAbi from "./contracts/registry_abi.json";
import faucet from "./assets/icons/faucet.svg";
import redirect from "./assets/icons/share.png";
import search from "./assets/icons/search.png";
import axios from "axios";

const Home = ({ setter }) => {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const registryAddress = "0x02CcEf72f68DAb05239A7e0107165D2FC05816B7";

  const [purchase, setPurchase] = useState(true);

  const [inputText, setInputText] = useState("");
  const [available, setAvailable] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [domainList, setDomainList] = useState([]);
  const [searchDomainList, setSearchDomainList] = useState([]);

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

    console.log("text", filterText);
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

      // alert("New Domain Created!");
      fetchInitialData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInitialData = async () => {
    const response = await axios.get(
      "https://snslibraryshib.onrender.com/getAllDomains"
    );
    console.log("Axios", response.data);

    setDomainList(response.data.reverse());
    setSearchDomainList(
      response.data.map((item) => ethers.utils.parseBytes32String(item.domain))
    );
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl p-2 min-h-[90vh] w-full flex flex-col items-center ">
        {/* Bone for testing */}
        <div className="mt-40 w-full flex justify-end max-w-[900px] mb-1">
          <a
            href="https://puppynetfaucet.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex items-center gap-2 max-w-[400px] border px-5 py-3 font-semibold rounded-sm bg-[#ffffff]">
              <img
                src={faucet}
                alt=""
                className="w-16"
              />
              <h2>Get $BONE for testing here</h2>
              <img
                src={redirect}
                alt=""
                className="w-6"
              />
            </div>
          </a>
        </div>

        {/* Purchase new domain */}
        <div className="flex min-h-[400px] max-w-[900px] w-full flex-col items-center bg-[#646464] p-2 rounded-sm">
          <div className="w-full flex md:justify-start justify-center p-1 gap-7 md:gap-10">
            <button
              onClick={() => setPurchase(true)}
              className={
                purchase
                  ? "text-blue-200 border-b-2 border-blue-200 font-bold text-lg sm:text-2xl"
                  : "text-white font-bold text-lg sm:text-2xl"
              }
            >
              Purchase Domain
            </button>
            <button
              onClick={() => setPurchase(false)}
              className={
                purchase
                  ? "text-white font-bold text-lg sm:text-2xl"
                  : "text-blue-200 border-b-2 border-blue-200 font-bold text-lg sm:text-2xl"
              }
            >
              Search Domain
            </button>
          </div>

          {purchase ? (
            <div className="mt-10 max-w-[700px] w-full flex flex-col items-center mb-2">
              <h2 className="text-2xl mb-5">
                Get you own Shibarium domain now!
              </h2>
              <input
                spellCheck={false}
                value={inputText}
                placeholder="mydomain.inu"
                onChange={handleInputText}
                type="text"
                className="bg-[#ffffff] w-full mb-2 text-center placeholder:text-[#898989] text-[#000000] rounded-md h-10 px-2 italic font-bold border-[2px] border-[#404040] outline-none"
              />

              <div className="flex flex-col items-center">
                <span className="flex gap-1">
                  {inputText !== ""
                    ? inputText + ".inu"
                    : "Join Our Massive Community"}
                </span>
                <button
                  onClick={purchaseDomain}
                  className="p-2 mb-7 bg-[#000] text-white w-[200px] mt-10 rounded-lg"
                >
                  {!available ? "Not Available!" : "Mint Domain"}
                </button>
              </div>

              {/* Connect message */}
              {(!isConnected || chain?.id !== 719) && (
                <div className="mt-1 bg-red-300 w-full py-2 text-lg text-center">
                  Please, connect and switch to Puppynet.
                </div>
              )}
              {!available && (
                <div className="mt-1 bg-red-300 w-full py-2 text-lg text-center">
                  This domain is already taken!
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-[700px] w-full flex flex-col items-center mt-12 mb-2">
              <h2 className="text-xl mb-2">Every Dog Has a Name</h2>
              <input
                spellCheck={false}
                value={filterText}
                placeholder="Search Domain"
                onChange={handleFilterText}
                type="text"
                className="bg-[#ffffff] max-w-[700px] w-full mb-2 text-center placeholder:text-[#898989] text-[#000000] rounded-md h-10 px-2 italic font-bold border-[2px] border-[#404040] outline-none"
              />

              {filterText !== "" ? (
                <div className="absolute overflow-y-auto max-h-[200px] mt-20 w-full p-2 max-w-[700px] bg-[#c7c7c7] gap-1 rounded-md py-3 flex flex-col items-center">
                  {searchDomainList.filter((item) => item.includes(filterText))
                    .length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center">
                      <span className="p-2 bg-[#a3a3a3] text-center rounded-md font-bold w-full">
                        Not results found
                      </span>
                    </div>
                  ) : (
                    searchDomainList
                      .filter((item) => item.indexOf(filterText) !== -1)
                      .map((item) => (
                        <Link
                          className="w-full flex justify-center"
                          to={`/${item}`}
                          d
                        >
                          <span className="p-2 bg-[#a3a3a3] text-center rounded-md font-semibold w-full">
                            {item}.inu
                          </span>
                        </Link>
                      ))
                  )}
                </div>
              ) : (
                <img
                  src={search}
                  alt=""
                  className="w-32 mt-10"
                />
              )}
            </div>
          )}
        </div>

        {/* Domains List */}
        <ul className="mt-20 w-full mb-32 max-w-[1000px] flex justify-center flex-wrap gap-2">
          {domainList.length === 0 ? (
            <span className="text-white font-bold text-3xl">
              Loading Domains...
            </span>
          ) : (
            domainList.reverse().map((item) => (
              <DomainlistItem
                domain={item.domain}
                owner={item.owner}
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
