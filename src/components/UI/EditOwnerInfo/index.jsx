import { ethers } from "ethers";
import { useState } from "react";
import registrarAbi from "../../../contracts/registrar_abi.json";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";

const EditOwnerInfoAll = ({
  setVisibility,
  signer,
  registrarAdd,
  domain,
  condition,
}) => {
  console.log(condition);
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

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

  const handleDescChange = async (e) => {
    setDescription(e.target.value);
  };
  const handleWebsChange = async (e) => {
    setWebsite(e.target.value);
  };
  const handleAvatcChange = async (e) => {
    setAvatar(e.target.value);
  };

  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  const changeOnwerInfo = async () => {
    console.log("desc", description);
    console.log("email", email);
    console.log("avatar", avatar);
    console.log("website", website);

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

    if (condition === "all") {
      try {
        const editData = await registrarContract.setOwnerData(
          description,
          website,
          email,
          avatar
        );
        await editData.wait();
        alert("Info edited!");
        setVisibility(false);
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else if (condition === "avatar") {
      try {
        const editData = await registrarContract.setOwnerAvatar(avatar);

        await editData.wait();
        alert("Avatar Changed");
        setVisibility(false);
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else if (condition === "description") {
      try {
        const editData = await registrarContract.setOwnerDescription(
          description
        );

        await editData.wait();
        alert("Description Changed");
        setVisibility(false);
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else if (condition === "email") {
      try {
        const editData = await registrarContract.setOwnerEmail(email);

        await editData.wait();
        alert("Email Changed");
        setVisibility(false);
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else {
      try {
        const editData = await registrarContract.setOwnerWebsite(website);

        await editData.wait();
        alert("Website Changed");
        setVisibility(false);
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    }
  };

  return (
    <>
      <section
        onClick={() => setVisibility(false)}
        className="fixed w-full bottom-0 right-0 left-0 top-0 bg-[#000000e0] z-50 flex items-center justify-center"
      ></section>
      <div className="bg-white w-[400px] fixed -translate-y-[50%] z-[51] -translate-x-[50%] left-[50%] top-[50%] py-10 flex flex-col items-center rounded-lg">
        <h2 className="text-xl mb-4 font-bold">
          Edit Owner Info For{" "}
          <span className="bg-[#0999] p-[1px] px-2 rounded-md">{domain}</span>
        </h2>
        {(condition === "all" || condition === "avatar") && (
          <img
            src={
              avatar !== ""
                ? avatar
                : "https://imgs.search.brave.com/poNnaqRebxpPLTVSB0hS5am3GhVRCX5FtoJNhvc6aI8/rs:fit:300:300:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnJl/cG9sLmNvcGwudWxh/dmFsLmNhL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE5LzAxL2Rl/ZmF1bHQtdXNlci1p/Y29uLmpwZz9maXQ9/MzAwJTJDMzAw"
            }
            alt="avatar"
            className="w-32 mt-3 h-32 rounded-md mb-5"
          />
        )}
        {(condition === "all" || condition === "website") && (
          <input
            spellCheck={false}
            value={website}
            onChange={handleWebsChange}
            placeholder="website"
            type="text"
            className="bg-[#212121] text-center mt-1 rounded-lg p-2 text-white"
          />
        )}
        {(condition === "all" || condition === "avatar") && (
          <input
            spellCheck={false}
            value={avatar}
            onChange={handleAvatcChange}
            placeholder="avatar"
            type="text"
            className="bg-[#212121] text-center mt-1 rounded-lg p-2 text-white"
          />
        )}
        {(condition === "all" || condition === "description") && (
          <input
            spellCheck={false}
            value={description}
            onChange={handleDescChange}
            placeholder="description"
            type="text"
            className="bg-[#212121] text-center mt-1 rounded-lg p-2 text-white"
          />
        )}
        {(condition === "all" || condition === "email") && (
          <input
            spellCheck={false}
            value={email}
            onChange={handleEmailChange}
            placeholder="email"
            type="text"
            className="bg-[#212121] mb-5 text-center mt-1 rounded-lg p-2 text-white"
          />
        )}{" "}
        {/* buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setVisibility(false)}
            className="p-2 bg-[#656565] rounded-lg text-white"
          >
            Cancel
          </button>
          <button
            onClick={changeOnwerInfo}
            className="p-2 bg-[#474747] rounded-lg text-white"
          >
            Change Data
          </button>
        </div>
      </div>
    </>
  );
};

export default EditOwnerInfoAll;
