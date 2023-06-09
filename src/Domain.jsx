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
import EditSubdomModal from "./components/UI/EditSubdom";

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

  const [editSubdomModalVis, setEditSubdomModalVis] = useState(false);
  const [editSubdomTarget, setEditSubdomTarget] = useState("");
  const [allowEdit, setAllowEdit] = useState(false);

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://puppynet.shibrpc.com"
  );

  const registryAdd = "0xa3e95A1a797711b779d3B70aA4B8380d6b1cf5BF";

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

        const subdomains = await readRegistrar.getAllSubDomains();

        const ownerData = await readRegistrar.ownerInfo();

        setDomainDesc(ownerData.description);
        setDomainAvatar(ownerData.avatar);
        setDomainEmail(ownerData.email);
        setDomainWebsite(ownerData.website);

        setSubdomainList(subdomains);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubDomDisplay = async (subdom) => {
    setAllowEdit(false);

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

    if (address === domainInfo.owner) {
      setAllowEdit(true);
      setEditSubdomTarget(subdom);
    }

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
          edit={allowEdit}
          cardChanger={setEditSubdomModalVis}
          setVisibility={setSubdInfoVisibility}
        />
      )}

      {editSubdomModalVis && (
        <EditSubdomModal
          setVisibility={setEditSubdomModalVis}
          signer={signer}
          registrarAdd={registrarAdd}
          subdomain={editSubdomTarget}
        />
      )}

      <div className="max-w-screen-2xl flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        {/* Avatar */}
        <div className="mt-20 sm:mt-44 mb-10 flex flex-col gap-2 items-center">
          <div className="flex justify-center flex-wrap items-center gap-2">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-md bg-[#fdfdfd] border-2 border-[#919191]">
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
            <div className="flex flex-col max-w-xs">
              <h2 className="p-2 rounded-md bg-white min-w-[300px] flex justify-center items-center font-bold text-2xl">
                {id}.inu
              </h2>
              <p className="max-w-lg flex flex-wrap break-words overflow-y-auto justify-center items-center bg-[#242424] h-24 px-4 py-2 rounded-lg text-center mt-2 text-white font-bold">
                {domainDesc === "" ? "No description available." : domainDesc}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center w-[350px] bg-[#d3d3d3] p-3 px-5 rounded-md">
            <span className="text-[#353535] font-bold text-lg italic">
              Owner: {domainOwner !== "" ? domainOwner : "Not set"}
            </span>
            <span className="text-[#353535] font-bold text-lg italic">
              Website: {domainWebsite !== "" ? domainWebsite : "Not set"}
            </span>
            <span className="text-[#353535] font-bold text-lg italic">
              Email: {domainEmail !== "" ? domainEmail : "Not set"}
            </span>
          </div>
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
        <button className="fixed bottom-5 right-5 md:right-12 md:bottom-12 text-xl font-bold bg-white p-3 rounded-lg">
          Back
        </button>
      </Link>
    </section>
  );
};

export default Domain;
