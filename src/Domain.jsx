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

const Domain = ({ domain }) => {
  const { id } = useParams();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const [subdomainList, setSubdomainList] = useState([]);
  const [registrarAdd, setRegistrarAdd] = useState("");
  const [domainOwner, setDomainOwner] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const registryAdd = "0x7A3Bf49274C893De0122eaDA97BFb572288B94fC";

  const readRegistry = new ethers.Contract(
    registryAdd,
    registryAbi,
    staticProvider
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      const data = await readRegistry.registry(id);
      setDomainOwner(addressShortener(data.owner));
      setRegistrarAdd(data.registrar);
      console.table({ owner: data.owner, registrar: data.registrar });

      const readRegistrar = new ethers.Contract(
        data.registrar,
        registrarAbi,
        staticProvider
      );

      const subdomains = await readRegistrar.getAllSubDomains();
      setSubdomainList(subdomains);
      console.log(subdomains);

      setIsLoading(false);
    };

    fetchInitialData();
  }, []);

  console.log(id);

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        {/* Avatar */}

        <div className="mt-20 sm:mt-44 mb-10 flex flex-col gap-2 items-center">
          <div className="w-36 p-2 h-36 rounded-xl bg-[#fdfdfd] border-2 border-[#919191]"></div>
          <h2 className="p-2 rounded-xl bg-white min-w-[300px] flex justify-center items-center font-bold text-2xl">
            {id}.inu
          </h2>
          {/* <span className="text-[#b3fb7b] text-lg italic">shibarium.com</span> */}

          <span className="text-[#b3fb7b] text-lg italic">
            Owner: {domainOwner}
          </span>

          {/* Description */}
          <p className="max-w-lg text-center mt-5 text-white font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            ad ab impedit, veritatis aliquid similique consectetur fugit maxime
            ducimus, enim neque voluptatum sequi. Dicta nisi quibusdam
            voluptatum ab error delectus?
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
                subdomainList.map((item) => (
                  <SubDomainlistItem
                    parent={id}
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
