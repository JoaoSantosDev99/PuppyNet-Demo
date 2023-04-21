import down from "./assets/down.png";
import profile from "./assets/profile.png";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { addressShortener } from "./utils";
import { ethers } from "ethers";
import DomainlistItem from "./components/UI/DomainItem";
import SubDomainlistItem from "./components/UI/SubdomainItem";
import { Link, useParams } from "react-router-dom";
import registryAbi from "./contracts/registry_abi.json";
import registrarAbi from "./contracts/registrar_abi.json";
import { longAddressCrop } from "./utils";
import NewSubdomainModal from "./components/UI/NewSubdomain";
import Loading from "./components/UI/LoadingAnimation/Loading";

const User = () => {
  const { address, isConnected } = useAccount();
  const [primary, setprimary] = useState("cryptodaddy.inu");
  // real primary domain
  const [primaryDomain, setPrimaryDomain] = useState("");
  const [tokenBalance, setTokenBalance] = useState();
  const [updateUserData, setUpdateUserData] = useState(false);
  const [newSubModal, setNewSubModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subdomainList, setSubdomainList] = useState([]);
  const [displayDomain, setDisplayDomain] = useState();
  const [userDomains, setUserDomains] = useState([]);
  const [userDomainsAmount, setUserDomainsAmount] = useState(0);
  const [registrarAdd, setRegistrarAdd] = useState("");

  const { data: signer } = useSigner();

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://rpc.ankr.com/eth_goerli"
  );

  const registryAdd = "0x211DB1D98C0949416eF78252f95D1c440744bC7E";

  const readRegistryContract = new ethers.Contract(
    registryAdd,
    registryAbi,
    staticProvider
  );

  useEffect(() => {
    const fetchInitialData = async () => {
      const balance = await readRegistryContract.balanceOf(address);
      const formatedBalance = ethers.utils.formatUnits(balance, 0);

      const primDom = await readRegistryContract.primaryDomain(address);

      const add = await readRegistryContract.registry(primDom);
      const registrarAdd = add.registrar;

      console.log("registrar add on fetch", registrarAdd);
      console.log("balance", formatedBalance);

      const userDomainsFetch = [];
      for (let i = 0; i < formatedBalance; i++) {
        const token = await readRegistryContract.tokenOfOwnerByIndex(
          address,
          i
        );
        const data = await readRegistryContract.tokenToDomain(token);
        userDomainsFetch.push(ethers.utils.parseBytes32String(data));
      }

      setPrimaryDomain(ethers.utils.parseBytes32String(primDom));
      setDisplayDomain(ethers.utils.parseBytes32String(primDom));
      setUserDomains(userDomainsFetch);
      setUserDomainsAmount(formatedBalance);

      if (true) {
        const registryContract = new ethers.Contract(
          registryAdd,
          registryAbi,
          staticProvider
        );

        const info = await registryContract.registry(primDom);
        console.log("registrar add", info.registrar);

        setRegistrarAdd(info.registrar);

        const readRegistrarContract = new ethers.Contract(
          info.registrar,
          registrarAbi,
          staticProvider
        );

        const allSubdomains = await readRegistrarContract.getAllSubDomains();
        const formated = allSubdomains.map((item) =>
          ethers.utils.parseBytes32String(item)
        );
        console.log("formated", allSubdomains);
        setSubdomainList(formated);
      }
    };

    fetchInitialData();
  }, []);

  const changePrimary = async (e) => {
    const registryContract = new ethers.Contract(
      registryAdd,
      registryAbi,
      signer
    );

    const parsedText = ethers.utils.formatBytes32String(e.target.textContent);
    try {
      const changePrim = await registryContract.setPrimaryDomain(parsedText);
      await changePrim.wait();
      alert("Primary Domain Changed!");
    } catch (error) {
      console.log(error);
    }
  };

  const changeDisplayDomain = (e) => {
    console.log(e.target.textContent);
    setDisplayDomain(e.target.textContent);
    fetchSubdomains(e.target.textContent);
  };

  const fetchSubdomains = async (domain) => {
    const registryContract = new ethers.Contract(
      registryAdd,
      registryAbi,
      signer
    );

    const parsedText = ethers.utils.formatBytes32String(domain);
    const info = await registryContract.registry(parsedText);

    setRegistrarAdd(info.registrar);
    const readRegistrarContract = new ethers.Contract(
      info.registrar,
      registrarAbi,
      staticProvider
    );

    const allSubdomains = await readRegistrarContract.getAllSubDomains();
    const formated = allSubdomains.map((item) =>
      ethers.utils.parseBytes32String(item)
    );

    setSubdomainList(formated);
  };

  return (
    <section className="w-full flex justify-center">
      {newSubModal && (
        <NewSubdomainModal
          signer={signer}
          registrarAdd={registrarAdd}
          setVisibility={setNewSubModal}
        />
      )}

      {}

      {isLoading && <Loading />}
      <div className="max-w-screen-2xl flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        {/* Top row */}
        <div className=" mt-20 sm:mt-44 mb-10 flex flex-col gap-2 items-center">
          <div className="flex gap-2">
            {/* Avatar group */}
            <div className="flex gap-2">
              {/* Avatar */}
              <div className="w-44 p-2 h-44 rounded-xl bg-[#fdfdfd] border-2 border-[#919191]"></div>

              {/* Domain and Description */}
              <div className="flex flex-col max-w-xs">
                {/* Primary */}
                <h2 className="p-2 rounded-xl bg-white w-[250px] flex justify-center items-center font-bold text-2xl">
                  {primaryDomain !== ""
                    ? primaryDomain
                    : addressShortener(address)}
                </h2>

                {/* Description */}
                <p className="max-w-[250px] text-center mt-2 text-white font-bold">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Officiis veritatis dicta esse nobis asperiores, odio molestias
                  aspernatur amet modi, ullam
                </p>
              </div>
            </div>

            {/* Generic Info Card */}
            <div className="flex flex-col flex-wrap justify-center items-center gap-1">
              <ul className="bg-[#c3c3c3] text-center flex justify-center text-[#000000] w-[350px] h-32 flex-col text-lg sm:text-xl font-bold p-3 rounded-xl">
                <li>
                  Primary: {primaryDomain === "" ? "not set" : primaryDomain}
                </li>
                <li>Website: shibarium.com</li>
                <li>SNS Balance: 100.000</li>
              </ul>
              <button
                onClick={() => setUpdateUserData(true)}
                className="w-full font-bold bg-[#989898] p-2 rounded-lg"
              >
                Edit Personal Data
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap justify-center gap-5 max-w-7xl w-full">
          <div className="flex flex-col bg-[#8b8b8b] w-[400px] justify-center items-center p-2 rounded-xl">
            {/* Dropdown */}

            {/* primaryDomain !== "" */}
            <div className="flex justify-center w-full">
              <div className="w-[90%]">
                <div
                  className="relative"
                  data-te-dropdown-ref
                >
                  {primaryDomain !== "" ? (
                    <>
                      <>
                        {subdomainList.length === 0 ? (
                          <button
                            className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#9d9d9d] flex justify-center items-center p-2 rounded-xl"
                            data-te-dropdown-toggle-ref
                          >
                            You have no subdomains yet.
                          </button>
                        ) : (
                          <button
                            className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#9d9d9d] flex justify-center items-center p-2 rounded-xl"
                            data-te-dropdown-toggle-ref
                          >
                            {subdomainList[0]}
                          </button>
                        )}
                      </>

                      <ul
                        className="absolute w-full z-[1000] text-[#fff] font-bold p-4 hidden list-none overflow-hidden rounded-lg border-none bg-[#414141] shadow-lg [&[data-te-dropdown-show]]:block"
                        aria-labelledby="dropdownMenu"
                        data-te-dropdown-menu-ref
                      >
                        {subdomainList.length === 0 ? (
                          <button
                            className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#9d9d9d] flex justify-center items-center p-2 rounded-xl"
                            data-te-dropdown-toggle-ref
                          >
                            Not subdomains set
                          </button>
                        ) : (
                          <>
                            {subdomainList.map((item) => (
                              <li
                                key={item}
                                className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                              >
                                {item}
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </>
                  ) : (
                    <button className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#9d9d9d] flex justify-center items-center p-2 rounded-xl">
                      You Have No Subdomains
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* input */}
            <div className="flex mt-1 justify-center text-center items-center w-full">
              <input
                id="target"
                placeholder="receiver address"
                type="text"
                className="flex outline-none w-[90%] p-2 rounded-lg text-center"
              />
            </div>

            {/* Transfer Button */}
            <button className="p-2 font-bold rounded-lg mt-4 text-white bg-[#323232] flex">
              Transfer Subdomain
            </button>
          </div>

          {/* Change primary domain */}
          <div className="flex bg-white py-2 rounded-md w-96 flex-col items-center gap-1">
            <div className="bg-[#b2b2b2] p-2 w-[90%] rounded-xl flex flex-col gap-1 justify-center items-center">
              <h3 className="text-xl font-sans text-[#090909] font-bold text-center">
                Change Primary Domain
              </h3>
              <div className="flex justify-center w-full">
                <div className="w-[100%]">
                  <div
                    className="relative"
                    data-te-dropdown-ref
                  >
                    {primaryDomain !== "" ? (
                      <>
                        <button
                          className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl"
                          data-te-dropdown-toggle-ref
                        >
                          {primaryDomain}
                        </button>
                        <ul
                          className="absolute w-full z-[1000] text-[#ededed] font-bold p-4 hidden list-none overflow-hidden rounded-lg border-none bg-[#8b8b8b] shadow-lg [&[data-te-dropdown-show]]:block"
                          aria-labelledby="dropdownMenu"
                          data-te-dropdown-menu-ref
                        >
                          {userDomains
                            ?.filter((item) => item !== primaryDomain)
                            .map((item) => (
                              <li
                                onClick={changePrimary}
                                className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                              >
                                {item}
                              </li>
                            ))}
                        </ul>
                      </>
                    ) : (
                      <button className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl">
                        No Domains
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <button className="gap-2 w-[90%] px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl">
              Transfer a Domain
            </button>

            <Link
              to="/"
              className="w-full flex justify-center"
            >
              <button className="w-[90%] px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl">
                Buy new domain
              </button>
            </Link>
          </div>
        </div>

        {updateUserData && (
          <div className="bg-[#a9a9a9] rounded-xl mt-10 w-[500px] flex flex-col items-center">
            <h2 className="text-xl font-bold mt-2">Update User Data</h2>

            {/* InputSections */}
            <div className="flex flex-col gap-1 mt-2">
              {/* Description */}
              <div class="flex justify-center">
                <div
                  class="relative mb-1 xl:w-96"
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-1 bg-[#242424] py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput1"
                    placeholder="Description"
                  />
                  <label
                    for="exampleFormControlInput1"
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-[#ff7d04] font-bold"
                  >
                    Description
                  </label>
                </div>
              </div>

              {/* website */}
              <div class="flex justify-center">
                <div
                  class="relative mb-1 xl:w-96"
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-1 bg-[#242424] py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput1"
                    placeholder="Website"
                  />
                  <label
                    for="exampleFormControlInput1"
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-[#ff7d04] font-bold"
                  >
                    Website
                  </label>
                </div>
              </div>

              {/* email */}
              <div class="flex justify-center">
                <div
                  class="relative mb-1 xl:w-96"
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-1 bg-[#242424] py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                  />
                  <label
                    for="exampleFormControlInput1"
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-[#ff7d04] font-bold"
                  >
                    Email
                  </label>
                </div>
              </div>

              {/* avatar */}
              <div class="flex justify-center">
                <div
                  class="relative mb-1 xl:w-96"
                  data-te-input-wrapper-init
                >
                  <input
                    type="text"
                    class="peer block min-h-[auto] w-full rounded border-1 bg-[#242424] py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput1"
                    placeholder="Avatar"
                  />
                  <label
                    for="exampleFormControlInput1"
                    class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none text-[#ff7d04] font-bold"
                  >
                    Avatar
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mb-2 mt-4">
              <button
                onClick={() => setUpdateUserData(false)}
                className="p-2 bg-[#5f5f5f] w-28 font-bold text-white rounded-lg"
              >
                Cancel
              </button>
              <button className="p-2 bg-[#333333] w-28 font-bold text-white rounded-lg">
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Subdomain title */}
        {primaryDomain !== "" ? (
          <h2 className="flex text-[#ffffff] text-4xl font-bold mb-2 mt-20 text-center">
            Your subdomains for:{" "}
            <div className="">
              <div className="flex justify-center w-[200px]">
                <div className="w-[90%] text-lg">
                  <div
                    className="relative"
                    data-te-dropdown-ref
                  >
                    <button
                      className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl"
                      data-te-dropdown-toggle-ref
                    >
                      {displayDomain}
                    </button>
                    <ul
                      className="absolute w-full z-[1000] text-[#ededed] font-bold p-4 hidden list-none overflow-hidden rounded-lg border-none bg-[#8b8b8b] shadow-lg [&[data-te-dropdown-show]]:block"
                      aria-labelledby="dropdownMenu"
                      data-te-dropdown-menu-ref
                    >
                      {userDomains?.map((item) => (
                        <li
                          onClick={changeDisplayDomain}
                          className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </h2>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="flex text-[#ffffff] text-4xl font-bold mb-2 mt-20 text-center">
              You Have No Domains
            </h2>
            <div className="bg-white w-[400px] flex justify-center items-center rounded-xl mt-10 mb-20 h-[200px]">
              Error Message here
            </div>
          </div>
        )}

        {/* subdomains List */}
        {primaryDomain !== "" && (
          <>
            <div className="max-w-4xl rounded flex items-center justify-end w-full font-bold text-lg py-2 bg-[#c6c6c600] mt-10">
              <button
                onClick={() => setNewSubModal(true)}
                className="bg-[#464646] mr-4 rounded p-2 text-white"
              >
                New Subdomain +
              </button>
            </div>
            <ul className="mt-2 mb-20 max-w-4xl flex justify-center flex-wrap gap-2">
              {subdomainList.length === 0 ? (
                <h2 className="bg-white px-5 py-4 rounded-md text-xl">
                  You have no subdomains for{" "}
                  <span className="font-bold">{displayDomain}</span>
                </h2>
              ) : (
                subdomainList.map((item) => (
                  <SubDomainlistItem
                    key={item}
                    parent={displayDomain}
                    sub={item}
                  />
                ))
              )}
            </ul>
          </>
        )}
      </div>
      <Link to="/">
        <button className="fixed right-12 bottom-12 text-xl font-bold bg-white p-3 rounded-lg">
          Back
        </button>
      </Link>
    </section>
  );
};

export default User;
