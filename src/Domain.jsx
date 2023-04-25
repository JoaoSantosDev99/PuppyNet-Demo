import down from "./assets/down.png";
import profile from "./assets/profile.png";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { addressShortener } from "./utils";

import { ethers } from "ethers";
import registrarAbi from "./contracts/registrar_abi.json";
import registryAbi from "./contracts/registry_abi.json";

import SubDomainlistItem from "./components/UI/SubdomainItem";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SubdomainInfo from "./components/UI/SubdomainInfo";

const Domain = ({ domain }) => {
  const { id } = useParams();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const [subdomainList, setSubdomainList] = useState([]);
  const [registrarAdd, setRegistrarAdd] = useState("");
  const [domainOwner, setDomainOwner] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [domainDesc, setDomainDesc] = useState("");
  const [domainAvatar, setDomainAvatar] = useState("");
  const [domainEmail, setDomainEmail] = useState("");
  const [domainWebsite, setDomainWebsite] = useState("");

  const [subdInfoVisibility, setSubdInfoVisibility] = useState(false);
  const [displayDomain, setDisplayDomain] = useState();
  const [popOwner, setPopOwner] = useState("");
  const [popWebsite, setPopWebsite] = useState("");
  const [popEmail, setPopEmail] = useState("");
  const [popDesc, setPopDesc] = useState("");
  const [popAvatar, setPopAvatar] = useState("");
  const [popName, setPopName] = useState("");

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const registryAdd = "0x50Fdeff07AeffD7Ae1a58f913a4536dB3155785a";

  const readRegistry = new ethers.Contract(
    registryAdd,
    registryAbi,
    staticProvider
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      const formatedId = ethers.utils.formatBytes32String(id);

      try {
        const data = await readRegistry.registry(formatedId);
        setDomainOwner(addressShortener(data.owner));
        setRegistrarAdd(data.registrar);
        console.table({ owner: data.owner, registrar: data.registrar });

        const readRegistrar = new ethers.Contract(
          data.registrar,
          registrarAbi,
          staticProvider
        );

        const subdomains = await readRegistrar.getAllSubDomains();

        const ownerData = await readRegistrar.ownerInfo();

        setDomainDesc(ownerData.description);
        setDomainAvatar(ownerData.avatar);
        setDomainEmail(ownerData.email);
        setDomainWebsite(ownerData.email);

        setSubdomainList(subdomains);
        console.log(subdomains);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubDomDisplay = async (subdom) => {
    console.log(subdom);

    const registryContract = new ethers.Contract(
      registryAdd,
      registryAbi,
      staticProvider
    );

    const parsedDisplay = ethers.utils.formatBytes32String(id);
    const info = await registryContract.registry(parsedDisplay);

    const readRegistrarContract = new ethers.Contract(
      info.registrar,
      registrarAbi,
      staticProvider
    );

    const parsedSubdom = ethers.utils.formatBytes32String(subdom);
    const domainInfo = await readRegistrarContract.subDomainData(parsedSubdom);

    setPopOwner(domainInfo.owner);
    setPopWebsite(domainInfo.website);
    setPopEmail(domainInfo.email);
    setPopDesc(domainInfo.description);
    setPopAvatar(domainInfo.avatar);
    setPopName(subdom);

    setSubdInfoVisibility(true);
  };

  return (
    <section className="w-full flex justify-center">
      {subdInfoVisibility && (
        <SubdomainInfo
          Owner={popOwner}
          Webs={popWebsite}
          Desc={popDesc}
          Email={popEmail}
          Avatar={popAvatar}
          Name={popName}
          key={popName}
          setVisibility={setSubdInfoVisibility}
        />
      )}

      <div className="max-w-screen-2xl flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        {/* Avatar */}
        <div className="mt-20 sm:mt-44 mb-10 flex flex-col gap-2 items-center">
          <div className="w-36 h-36 rounded-md bg-[#fdfdfd] border-2 border-[#919191]">
            <img
              src={
                domainAvatar !== ""
                  ? domainAvatar
                  : "https://imgs.search.brave.com/poNnaqRebxpPLTVSB0hS5am3GhVRCX5FtoJNhvc6aI8/rs:fit:300:300:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnJl/cG9sLmNvcGwudWxh/dmFsLmNhL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE5LzAxL2Rl/ZmF1bHQtdXNlci1p/Y29uLmpwZz9maXQ9/MzAwJTJDMzAw"
              }
              alt="avatar"
              className="rounded-md"
            />
          </div>
          <h2 className="p-2 rounded-xl bg-white min-w-[300px] flex justify-center items-center font-bold text-2xl">
            {id}.inu
          </h2>
          {/* <span className="text-[#b3fb7b] text-lg italic">shibarium.com</span> */}
          <span className="text-[#b3fb7b] text-lg italic">
            Owner: {domainOwner}
          </span>
          <span className="text-[#b3fb7b] text-lg italic">
            Website: {domainWebsite}
          </span>
          <span className="text-[#b3fb7b] text-lg italic">
            Email: {domainEmail}
          </span>
          {/* Description */}
          <p className="max-w-lg text-center mt-5 text-white font-bold">
            {domainDesc === ""
              ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit Officiis veritatis modi, ullam"
              : domainDesc}
          </p>
        </div>

        <h2 className="flex text-[#ffffff] text-4xl font-bold mb-2 mt-20 text-center">
          Subdomains
        </h2>

        {/* subdomains List */}
        <ul className="mt-10 mb-20 max-w-4xl flex justify-center flex-wrap gap-2">
          {isLoading ? (
            <span className="text-3xl text-gray-200">
              Loading Subdomains...
            </span>
          ) : (
            <>
              {subdomainList.length !== 0 ? (
                subdomainList
                  .map((item) => ethers.utils.parseBytes32String(item))
                  .map((item) => (
                    <SubDomainlistItem
                      onClick={() => handleSubDomDisplay(item)}
                      key={item}
                      parent={displayDomain}
                      sub={item}
                    />
                  ))
              ) : (
                <span className="font-bold text-center text-xl text-white">
                  No subdomains set yet...
                </span>
              )}
            </>
          )}
        </ul>
      </div>
      <Link to="/">
        <button className="fixed right-12 bottom-12 text-xl font-bold bg-white p-3 rounded-lg">
          Back
        </button>
      </Link>
    </section>
  );
};

export default Domain;
