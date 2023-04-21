import { ethers } from "ethers";
import { useState } from "react";
import registrarAbi from "../../../contracts/registrar_abi.json";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

const NewSubdomainModal = ({ setVisibility, signer, registrarAdd }) => {
  const [newSubdomain, setNewSubdomain] = useState("");
  const [newSubdomainOwner, setNewSubdomainOwner] = useState("");
  const [available, setAvailable] = useState(false);
  const [hasAlready, setHasAlready] = useState(false);
  const [validAddr, setValidAddr] = useState(true);

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const { switchNetwork } = useSwitchNetwork();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();

  const connectWallet = () => {
    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }
    try {
      open();
    } catch (error) {
      console.log(error);
    }
  };

  const registryAddress = "0x211DB1D98C0949416eF78252f95D1c440744bC7E";

  const readRegistrarContract = new ethers.Contract(
    registrarAdd,
    registrarAbi,
    staticProvider
  );

  const handleDomainChange = (e) => {
    validateAddress(
      e.target.value
        .replace(".", "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
    );

    setNewSubdomain(
      e.target.value
        .replace(".", "")
        .replace(/[^a-z0-9 ]/g, "")
        .trim()
        .slice(0, 32)
    );
  };

  const validateAddress = async (text) => {
    const parsedText = ethers.utils.formatBytes32String(text);
    const call = await readRegistrarContract.registered(parsedText);
    setAvailable(call);
    console.log(call);
  };

  const handleOwnerChange = async (e) => {
    setNewSubdomainOwner(e.target.value);

    console.log("is address", ethers.utils.isAddress(e.target.value));
    setValidAddr(ethers.utils.isAddress(e.target.value));

    checkHasDomain();

    // console.log("is", parsedText);
    // console.log(e.target.value);
  };

  const checkHasDomain = async (text) => {
    const parsedText = ethers.utils.formatBytes32String(text);
    const call = await readRegistrarContract.hasSubDomain(parsedText);
    setHasAlready(call);
    console.log(call);
  };

  const createNewSubdomain = async () => {
    console.log("new domain owner", newSubdomainOwner);
    console.log("new domain", newSubdomain);

    const parsedText = ethers.utils.formatBytes32String(newSubdomain);

    if (signer === undefined) {
      connectWallet();
    }

    if (chain?.id !== 5) {
      switchNetwork?.(5);
    }

    const registrarContract = new ethers.Contract(
      registrarAdd,
      registrarAbi,
      signer
    );

    try {
      const newSubDom = await registrarContract.setNewSubdomain(
        parsedText,
        newSubdomainOwner
      );

      await newSubDom.wait();
      setVisibility(false);
      alert("New domain created");
    } catch (error) {
      console.log(error);
      setVisibility(false);
    }
  };

  return (
    <>
      <section
        onClick={() => setVisibility(false)}
        className="fixed w-full bottom-0 right-0 left-0 top-0 bg-[#000000e0] z-50 flex items-center justify-center"
      ></section>
      <div className="bg-white w-[400px] fixed -translate-y-[50%] z-[51] -translate-x-[50%] left-[50%] top-[50%] py-10 flex flex-col items-center rounded-lg">
        <h2 className="text-xl font-bold">Create New Subdomain</h2>
        {available && (
          <h2 className="mt-3 text-[#ff1010] font-semibold">
            This subdomain already exists
          </h2>
        )}
        <input
          value={newSubdomain}
          onChange={handleDomainChange}
          placeholder="subdomain name"
          type="text"
          className="bg-[#212121] text-center mt-1 rounded-lg p-2 text-white"
        />

        {hasAlready && (
          <h2 className="mt-3 text-[#ff1010] font-semibold">
            This address already has a domain!
          </h2>
        )}

        {!validAddr && (
          <h2 className="mt-3 text-[#ff1010] font-semibold">
            Not a valid address
          </h2>
        )}

        <input
          spellCheck={false}
          value={newSubdomainOwner}
          onChange={handleOwnerChange}
          placeholder="new owner"
          type="text"
          className="bg-[#212121] text-center mt-1 mb-5 rounded-lg p-2 text-white"
        />

        {/* buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setVisibility(false)}
            className="p-2 bg-[#656565] rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={createNewSubdomain}
            className="p-2 bg-[#474747] rounded-lg text-white"
          >
            Create Sudomain
          </button>
        </div>
      </div>
    </>
  );
};

export default NewSubdomainModal;
