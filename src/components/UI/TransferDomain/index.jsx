import { ethers } from "ethers";
import { useState } from "react";
import registrarAbi from "../../../contracts/registrar_abi.json";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import edit from "../../../assets/icons/edit.png";
import registryAbi from "../../../contracts/registry_abi.json";

const TransferDomain = ({
  setVisibility,
  signer,
  balance,
  domains,
  address,
}) => {
  const { switchNetwork } = useSwitchNetwork();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();

  const [newDomainOwner, setnewDomainOwner] = useState("");
  const [isvalidadd, setValidAddr] = useState(true);
  const [hasAlready, setHasAlready] = useState(false);
  const [selectedDomain, setselectedDomain] = useState(domains[0]);

  const registryAddress = "0xa3e95A1a797711b779d3B70aA4B8380d6b1cf5BF";

  const registryContract = new ethers.Contract(
    registryAddress,
    registryAbi,
    signer
  );

  const handleOwnerChange = async (e) => {
    setnewDomainOwner(e.target.value);
    checkHasDomain(e.target.value);
  };

  const checkHasDomain = async (text) => {
    if (!ethers.utils.isAddress(text)) return;
    console.log(text);

    setValidAddr(ethers.utils.isAddress(text));

    const call = await registryContract.balanceOf(text);
    const balance = ethers.utils.formatUnits(call, 0);
    setHasAlready(balance !== "0");
    console.log(balance !== "0");
  };

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

  const transferDomain = async () => {
    if (signer === undefined) {
      connectWallet();
    }

    if (chain?.id !== 719) {
      switchNetwork?.(719);
    }

    console.log(selectedDomain, balance);

    const parsedText = ethers.utils.formatBytes32String(selectedDomain);
    let id;

    for (let i = 0; i < balance; i++) {
      const data = await registryContract.tokenOfOwnerByIndex(address, i);
      const formatedData = ethers.utils.formatUnits(data, 0);
      const domain = await registryContract.tokenToDomain(formatedData);

      if (domain === parsedText) {
        id = formatedData;
      }
    }

    console.log(id);

    try {
      const tranferDomain = await registryContract.transferFrom(
        address,
        newDomainOwner,
        id
      );

      await tranferDomain.wait();
      setVisibility(false);
      alert("Domain Transfered");
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
      <div className="bg-white w-[350px] fixed -translate-y-[50%] z-[51] -translate-x-[50%] left-[50%] top-[50%] py-10 flex flex-col items-center rounded-lg">
        <h2 className="text-xl flex items-center gap-2 mb-4 font-bold">
          Tranfering
          <div className="flex justify-center w-full">
            <div className="min-w-[200px]">
              <div
                className="relative"
                data-te-dropdown-ref
              >
                <>
                  <button
                    className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-1 rounded-xl"
                    data-te-dropdown-toggle-ref
                  >
                    {selectedDomain}
                  </button>
                  <ul
                    className="absolute w-full z-[1000] text-[#ededed] font-bold p-4 hidden list-none overflow-hidden rounded-lg border-none bg-[#8b8b8b] shadow-lg [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenu"
                    data-te-dropdown-menu-ref
                  >
                    {domains.map((item) => (
                      <li
                        onClick={() => setselectedDomain(item)}
                        className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              </div>
            </div>
          </div>
        </h2>
        <input
          spellCheck={false}
          value={newDomainOwner}
          onChange={handleOwnerChange}
          placeholder="new owner"
          type="text"
          className="bg-[#212121] text-center mt-1 rounded-lg p-2 text-white"
        />

        {hasAlready && (
          <h2 className="mt-4 bg-[#c92828d6] p-2 font-bold rounded-lg text-white">
            This address already has a domain!
          </h2>
        )}

        {/* buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setVisibility(false)}
            className="p-2 bg-[#656565] rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={transferDomain}
            className="p-2 bg-[#474747] rounded-lg text-white"
          >
            Transfer
          </button>
        </div>
      </div>
    </>
  );
};

export default TransferDomain;
