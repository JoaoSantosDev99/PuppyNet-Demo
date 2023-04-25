import { ethers } from "ethers";
import { useState } from "react";
import registrarAbi from "../../../contracts/registrar_abi.json";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import edit from "../../../assets/icons/edit.png";

const EditSubdomModal = ({
  setVisibility,
  signer,
  registrarAdd,
  subdomain,
}) => {
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [condition, setCondition] = useState("all");

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

  const registryAddress = "0x73b8CfcD9cAcfA6a07B7cEa27CED869021325962";

  const readRegistrarContract = new ethers.Contract(
    registrarAdd,
    registrarAbi,
    staticProvider
  );

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

  const editSubdomain = async () => {
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

    const parsedText = ethers.utils.formatBytes32String(subdomain);

    if (condition === "all") {
      try {
        const editData = await registrarContract.changeSubDomainData(
          parsedText,
          description,
          website,
          email,
          avatar
        );

        await editData.wait();
        setVisibility(false);
        alert("Domain edited");
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else if (condition === "description") {
      try {
        const editData = await registrarContract.changeSubdomainDescription(
          parsedText,
          description
        );

        await editData.wait();
        setVisibility(false);
        alert("Description edited");
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else if (condition === "avatar") {
      try {
        const editData = await registrarContract.changeSubdomainAvatar(
          parsedText,
          avatar
        );

        await editData.wait();
        setVisibility(false);
        alert("Avatar edited");
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else if (condition === "website") {
      try {
        const editData = await registrarContract.changeSubdomainWebsite(
          parsedText,
          website
        );

        await editData.wait();
        setVisibility(false);
        alert("Website edited");
      } catch (error) {
        console.log(error);
        setVisibility(false);
      }
    } else {
      try {
        const editData = await registrarContract.changeSubdomainEmail(
          parsedText,
          email
        );

        await editData.wait();
        setVisibility(false);
        alert("Email edited");
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
          Edit Info For{" "}
          <span className="bg-[#0999] p-[1px] px-2 rounded-md">
            {subdomain}
          </span>
        </h2>

        {(condition === "all" || condition === "avatar") && (
          <img
            src={
              avatar !== ""
                ? avatar
                : "https://imgs.search.brave.com/poNnaqRebxpPLTVSB0hS5am3GhVRCX5FtoJNhvc6aI8/rs:fit:300:300:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnJl/cG9sLmNvcGwudWxh/dmFsLmNhL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE5LzAxL2Rl/ZmF1bHQtdXNlci1p/Y29uLmpwZz9maXQ9/MzAwJTJDMzAw"
            }
            alt="avatar"
            className="w-32 h-32 mt-4 rounded-md mb-5"
          />
        )}

        {condition === "all" && (
          <h2 className="text-lg max-w-[90%] text-center bg-gray-300 rounded-md p-1 px-2 mb-4 font-bold">
            This will change all the data at once, click the pen to edit a
            single field
          </h2>
        )}

        <div className="flex mt-1 gap-1 justify-center items-center">
          {(condition === "all" || condition === "avatar") && (
            <input
              spellCheck={false}
              value={avatar}
              onChange={handleAvatcChange}
              placeholder="avatar"
              type="text"
              className="bg-[#212121] text-center rounded-lg p-2 text-white"
            />
          )}

          {condition === "all" && (
            <button
              className="border p-[1px] flex justify-center items-center rounded-lg bg-[#e8e8e8] border-[#696969]"
              onClick={() => setCondition("avatar")}
            >
              <img
                src={edit}
                alt="pen"
                className="w-8 flex justify-center items-center h-8"
              />
            </button>
          )}
        </div>

        <div className="flex mt-1 gap-1 justify-center items-center">
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

          {condition === "all" && (
            <button
              className="border p-[1px] flex justify-center items-center rounded-lg bg-[#e8e8e8] border-[#696969]"
              onClick={() => setCondition("description")}
            >
              <img
                src={edit}
                alt="pen"
                className="w-8 flex justify-center items-center h-8"
              />
            </button>
          )}
        </div>

        <div className="flex mt-1 gap-1 justify-center items-center">
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

          {condition === "all" && (
            <button
              className="border p-[1px] flex justify-center items-center rounded-lg bg-[#e8e8e8] border-[#696969]"
              onClick={() => setCondition("website")}
            >
              <img
                src={edit}
                alt="pen"
                className="w-8 flex justify-center items-center h-8"
              />
            </button>
          )}
        </div>

        <div className="flex mt-1 gap-1 justify-center items-center">
          {(condition === "all" || condition === "email") && (
            <input
              spellCheck={false}
              value={email}
              onChange={handleEmailChange}
              placeholder="email"
              type="text"
              className="bg-[#212121] text-center mt-1 rounded-lg p-2 text-white"
            />
          )}

          {condition === "all" && (
            <button
              className="border p-[1px] flex justify-center items-center rounded-lg bg-[#e8e8e8] border-[#696969]"
              onClick={() => setCondition("email")}
            >
              <img
                src={edit}
                alt="pen"
                className="w-8 flex justify-center items-center h-8"
              />
            </button>
          )}
        </div>

        {condition !== "all" && (
          <button
            className="bg-[#888] py-1 mt-1 px-3 rounded-md"
            onClick={() => setCondition("all")}
          >
            Back
          </button>
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
            onClick={editSubdomain}
            className="p-2 bg-[#474747] rounded-lg text-white"
          >
            Commit Data
          </button>
        </div>
      </div>
    </>
  );
};

export default EditSubdomModal;
