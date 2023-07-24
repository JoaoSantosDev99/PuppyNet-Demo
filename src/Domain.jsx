import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { addressShortener } from "./utils";

import { ethers } from "ethers";
import registrarAbi from "./contracts/registrar_abi.json";
import registryAbi from "./contracts/registry_abi.json";

import SubDomainlistItem from "./components/UI/SubdomainItem";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://puppynet.shibrpc.com"
  );

  const registryAdd = "0x02CcEf72f68DAb05239A7e0107165D2FC05816B7";

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

        const readRegistrar = new ethers.Contract(
          data.registrar,
          registrarAbi,
          staticProvider
        );

        const ownerData = await readRegistrar.ownerInfo();

        setDomainDesc(ownerData.description);
        setDomainAvatar(ownerData.avatar);
        setDomainEmail(ownerData.email);
        setDomainWebsite(ownerData.website);

        const subdomains = await readRegistrar.getAllSubdomains();

        setSubdomainList(subdomains);
        console.log("array", subdomains);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        {/* Avatar */}
        <div className="w-full sm:mt-2 mb-5 flex flex-col gap-2 items-center">
          <div className="max-w-[730px] w-full flex justify-between flex-wrap items-center gap-2">
            {/* Avatar */}
            <div className="w-52 h-52 rounded-md bg-[#fdfdfd] border-[#919191]">
              <img
                src={
                  domainAvatar !== ""
                    ? domainAvatar
                    : "https://imgs.search.brave.com/poNnaqRebxpPLTVSB0hS5am3GhVRCX5FtoJNhvc6aI8/rs:fit:300:300:1/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vd3d3LnJl/cG9sLmNvcGwudWxh/dmFsLmNhL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE5LzAxL2Rl/ZmF1bHQtdXNlci1p/Y29uLmpwZz9maXQ9/MzAwJTJDMzAw"
                }
                alt="avatar"
                className="rounded-md w-full h-full"
              />
            </div>

            {/* Domain and description */}
            <div className="flex h-full flex-col w-full max-w-lg">
              <h2 className="p-2 rounded-sm bg-white min-w-[300px] flex justify-center items-center font-bold text-2xl">
                {id}.inu
              </h2>
              <p className="max-w-lg h-full flex flex-wrap break-words overflow-y-auto justify-center items-center bg-[#242424] px-4 py-2 rounded-lg text-center mt-2 text-white font-bold">
                {domainDesc === "" ? "No description available." : domainDesc}
              </p>
            </div>
          </div>

          <div className="gap-2 max-w-[730px] text-center flex w-full justify-center">
            <div className="bg-white w-full p-2 rounded-sm">
              {domainOwner !== "" ? domainOwner : "Not set"}
            </div>
            <div className="bg-white w-full p-2 rounded-sm">
              Webs: {domainWebsite !== "" ? domainWebsite : "Not set"}
            </div>
            <div className="bg-white w-full p-2 rounded-sm">
              Email: {domainEmail !== "" ? domainEmail : "Not set"}
            </div>
          </div>
        </div>

        <h2 className="flex text-[#ffffff] text-4xl font-bold mb-2 mt-10 text-center">
          Subdomains
        </h2>

        {/* subdomains List */}
        <ul className="mt-2 mb-20 max-w-4xl flex justify-center flex-wrap gap-2">
          {/* {isLoading ? (
            <span className="text-3xl text-gray-200">
              Loading Subdomains...
            </span>
          ) : (
            <>
              {subdomainList.length !== 0 ? (
                subdomainList.map((item) => (
                  <SubDomainlistItem
                    parent={id}
                    sub={ethers.utils.parseBytes32String(item)}
                  />
                ))
              ) : (
                <span className="max-w-screen-md flex font-bold text-center text-xl text-white">
                  <SubDomainlistItem
                    parent={id}
                    sub={"test"}
                  />
                  <SubDomainlistItem
                    parent={id}
                    sub={"test"}
                  />
                  <SubDomainlistItem
                    parent={id}
                    sub={"test"}
                  />
                  <SubDomainlistItem
                    parent={id}
                    sub={"test"}
                  />
                  <SubDomainlistItem
                    parent={id}
                    sub={"test"}
                  />
                  <SubDomainlistItem
                    parent={id}
                    sub={"test"}
                  />
                  <SubDomainlistItem
                    parent={id}
                    sub={"test"}
                  />
                </span>
              )}
            </>
          )} */}

          <span className="max-w-screen-md flex flex-wrap justify-center gap-2 font-bold text-center text-xl text-white">
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
            <SubDomainlistItem
              parent={id}
              sub={"test"}
            />
          </span>
        </ul>
      </div>

      <Link to="/">
        <button className="fixed bottom-5 right-5 md:right-12 md:bottom-12 text-xl font-bold bg-white p-3 rounded-lg">
          Back
        </button>
      </Link>
    </section>
  );
};

export default Domain;
