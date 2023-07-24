import edit from "./assets/icons/edit.png";
import down from "./assets/down.png";
import profile from "./assets/profile.png";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useSigner } from "wagmi";
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
import EditOwnerInfoAll from "./components/UI/EditOwnerInfo";
import EditSubdomModal from "./components/UI/EditSubdom";
import TransferDomain from "./components/UI/TransferDomain";

const User = () => {
  const { address, isConnected } = useAccount();
  const [primary, setprimary] = useState("cryptodaddy.inu");
  // real primary domain
  const [primaryDomain, setPrimaryDomain] = useState("");
  const [tokenBalance, setTokenBalance] = useState();
  const [newSubModal, setNewSubModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subdomainList, setSubdomainList] = useState([]);
  const [displayDomain, setDisplayDomain] = useState();
  const [userDomains, setUserDomains] = useState([]);
  const [userDomainsAmount, setUserDomainsAmount] = useState(0);
  const [registrarAdd, setRegistrarAdd] = useState("");

  const [ownerCondition, setOwnerCondition] = useState("all");

  const [subdInfoVisibility, setSubdInfoVisibility] = useState(false);
  const [allInfoOwnerModal, setAllInfoOwnerModal] = useState(false);
  const [domainImage, setdomainImage] = useState("");
  const [domainDesc, setdomainDesc] = useState("");
  const [domainWebs, setdomainWebs] = useState("");
  const [domainEmail, setdomainEmail] = useState("");

  const [popOwner, setPopOwner] = useState("");
  const [popWebsite, setPopWebsite] = useState("");
  const [popEmail, setPopEmail] = useState("");
  const [popDesc, setPopDesc] = useState("");
  const [popAvatar, setPopAvatar] = useState("");
  const [popName, setPopName] = useState("");

  const [subdomainTarget, setSubdomainTarget] = useState("");
  const [hasSubDomAlready, setHasSubDomAlready] = useState(false);
  const [validAddr, setValidAddr] = useState(true);
  const [currentSubdomain, setCurrentSubdomain] = useState("");

  const [editSubdomModalVis, setEditSubdomModalVis] = useState(false);
  const [transferDomainVis, settransferDomainVis] = useState(false);
  const [editSubdomTarget, setEditSubdomTarget] = useState("");

  const { data: signer } = useSigner();

  const staticProvider = new ethers.providers.JsonRpcProvider(
    "https://puppynet.shibrpc.com"
  );

  const registryAdd = "0xa3e95A1a797711b779d3B70aA4B8380d6b1cf5BF";

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
      console.log("userDomains", userDomains, balance);
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

        const ownerData = await readRegistrarContract.ownerInfo();

        setdomainImage(ownerData.avatar);
        setdomainDesc(ownerData.description);
        setdomainWebs(ownerData.website);
        setdomainEmail(ownerData.email);

        const allSubdomains = await readRegistrarContract.getAllSubDomains();
        const formated = allSubdomains.map((item) =>
          ethers.utils.parseBytes32String(item)
        );
        console.log("formated", allSubdomains);
        setSubdomainList(formated);
        setCurrentSubdomain(formated[0]);
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

  const handleSubDomDisplay = async (subdom) => {
    const registryContract = new ethers.Contract(
      registryAdd,
      registryAbi,
      staticProvider
    );

    const parsedDisplay = ethers.utils.formatBytes32String(displayDomain);
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

  const hadnleEditWebsite = () => {
    setOwnerCondition("website");
    setAllInfoOwnerModal(true);
  };

  const hadnleEditAvatar = () => {
    setOwnerCondition("avatar");
    setAllInfoOwnerModal(true);
  };

  const hadnleEditDescript = () => {
    setOwnerCondition("description");
    setAllInfoOwnerModal(true);
  };

  const hadnleEditEmail = () => {
    setOwnerCondition("email");
    setAllInfoOwnerModal(true);
  };

  const handleChangeAll = () => {
    setOwnerCondition("all");
    setAllInfoOwnerModal(true);
  };

  const handleSubdomainTranfer = async () => {
    const parsedText = ethers.utils.formatBytes32String(currentSubdomain);

    const registrarContract = new ethers.Contract(
      registrarAdd,
      registrarAbi,
      signer
    );

    try {
      const tranfer = await registrarContract.transferSubDomain(
        parsedText,
        subdomainTarget
      );

      await tranfer.wait();
      alert("Subdomain tranfered");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDomainTransfer = async () => {
    settransferDomainVis(true);
  };

  const handleReceiverAddress = (e) => {
    setHasSubDomAlready(false);

    setSubdomainTarget(e.target.value);
    setValidAddr(ethers.utils.isAddress(e.target.value));

    checkHasDomain(e.target.value);
  };

  const checkHasDomain = async (text) => {
    const primDom = await readRegistryContract.primaryDomain(address);

    const info = await readRegistryContract.registry(primDom);

    const readRegistrarContract = new ethers.Contract(
      info.registrar,
      registrarAbi,
      staticProvider
    );
    const call = await readRegistrarContract.hasSubDomain(text);
    setHasSubDomAlready(call);
  };

  const handleEditSubdom = (subdom) => {
    console.log("edit", subdom);
    setEditSubdomTarget(subdom);
    setEditSubdomModalVis(true);
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

      {allInfoOwnerModal && (
        <EditOwnerInfoAll
          signer={signer}
          registrarAdd={registrarAdd}
          setVisibility={setAllInfoOwnerModal}
          domain={primaryDomain}
          condition={ownerCondition}
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

      {transferDomainVis && (
        <TransferDomain
          signer={signer}
          setVisibility={settransferDomainVis}
          address={address}
          domains={userDomains}
          balance={userDomainsAmount}
        />
      )}

      {isLoading && <Loading />}
      <div className="max-w-screen-2xl px-2 flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        {/* Top row */}
        <div className="flex-wrap items-center mt-20 sm:mt-44 mb-10 flex flex-col gap-2">
          <div className="flex flex-wrap justify-center gap-2">
            {/* Avatar group */}
            <div className="flex flex-wrap justify-center gap-2">
              {/* Avatar */}
              <div className="relative w-44 p-1 rounded-md flex justify-center items-center h-44 bg-[#222222] border-2 border-[#919191]">
                <img
                  src={domainImage}
                  alt=""
                  className="rounded-md w-full h-full"
                />
                <button
                  className="absolute bottom-2 right-2 border p-[1px] rounded-md bg-[#e8e8e8] border-[#696969]"
                  onClick={hadnleEditAvatar}
                >
                  <img
                    src={edit}
                    alt="pen"
                    className="w-6 h-6"
                  />
                </button>
              </div>

              {/* Domain and Description */}
              <div className="flex flex-col max-w-xs">
                {/* Primary */}
                <h2 className="p-2 rounded-xl bg-white w-[250px] flex justify-center items-center font-bold text-2xl">
                  {primaryDomain !== ""
                    ? primaryDomain
                    : addressShortener(address)}
                </h2>

                {/* Description */}
                <p className="max-w-[250px] relative h-[120px] p-1 rounded-md bg-[#2d2d2d] text-center mt-2 text-white font-bold">
                  {domainDesc === ""
                    ? "Lorem ipsum, dolor sit amet consectetur adipisicing elit Officiis veritatis modi, ullam"
                    : domainDesc}
                  <button
                    className="absolute bottom-2 right-2 border p-[1px] rounded-md bg-[#e8e8e8] border-[#696969]"
                    onClick={hadnleEditDescript}
                  >
                    <img
                      src={edit}
                      alt="pen"
                      className="w-6 h-6"
                    />
                  </button>
                </p>
              </div>
            </div>

            {/* Generic Info Card */}
            <div className="flex justify-center items-center flex-col flex-wrap gap-1">
              <ul className="bg-[#c3c3c3] text-center flex justify-center text-[#000000] w-[350px] h-32 flex-col text-lg sm:text-xl font-bold p-3 rounded-xl">
                <li className="flex justify-center items-center gap-2">
                  Primary: {primaryDomain === "" ? "not set" : primaryDomain}{" "}
                </li>
                <li className="flex justify-center items-center gap-2">
                  Website: {domainWebs === "" ? "not set" : domainWebs}{" "}
                  <button
                    className="border p-[1px] rounded-md bg-[#e8e8e8] border-[#696969]"
                    onClick={hadnleEditWebsite}
                  >
                    <img
                      src={edit}
                      alt="pen"
                      className="w-6 h-6"
                    />
                  </button>
                </li>
                <li className="flex text-sm justify-center items-center gap-2">
                  Email: {domainEmail === "" ? "not set" : domainEmail}{" "}
                  <button
                    className="border p-[1px] rounded-md bg-[#e8e8e8] border-[#696969]"
                    onClick={hadnleEditEmail}
                  >
                    <img
                      src={edit}
                      alt="pen"
                      className="w-6 h-6"
                    />
                  </button>
                </li>
              </ul>
              <button
                onClick={handleChangeAll}
                className="w-full font-bold bg-[#989898] p-2 rounded-lg"
              >
                Edit all at once here
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap justify-center gap-5 max-w-7xl w-full">
          <div className="flex flex-col bg-[#8b8b8b] w-[400px] justify-center items-center p-2 rounded-xl">
            {/* primaryDomain !== "" */}
            <div className="flex justify-center w-full">
              <div className="w-[90%]">
                <div className="w-full justify-center p-1 rounded-md bg-white text-center mb-3 mt-2">
                  <h2>
                    Sub domains of{" "}
                    <span className="font-bold">{displayDomain}</span>
                  </h2>
                </div>
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
                            {currentSubdomain}
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
                                onClick={() => setCurrentSubdomain(item)}
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
                spellCheck={false}
                value={subdomainTarget}
                onChange={handleReceiverAddress}
                id="target"
                placeholder="receiver address"
                type="text"
                className="flex outline-none w-[90%] p-2 rounded-lg text-center"
              />
            </div>

            {hasSubDomAlready && (
              <h2 className="mt-3 text-[#ff1010] font-semibold">
                This address already has a subdomain!
              </h2>
            )}
            {!validAddr && (
              <h2 className="mt-3 text-[#ff1010] font-semibold">
                Not a valid address
              </h2>
            )}

            {/* Transfer Button */}
            <button
              onClick={handleSubdomainTranfer}
              className="p-2 font-bold rounded-lg mt-4 text-white bg-[#323232] flex"
            >
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
            <button
              onClick={handleDomainTransfer}
              className="gap-2 w-[90%] px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl"
            >
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

        {/* Subdomain title */}
        {primaryDomain !== "" ? (
          <h2 className="flex flex-wrap justify-center text-[#ffffff] text-3xl md:text-4xl font-bold mb-2 mt-20 text-center">
            <span className="mb-3 md:mb-none">Your subdomains for:</span>{" "}
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
                          className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 text-center px-2 rounded-lg"
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
                  <div className="relative">
                    <SubDomainlistItem
                      onClick={() => handleSubDomDisplay(item)}
                      key={item}
                      parent={displayDomain}
                      sub={item}
                    />
                    <button
                      className="absolute bottom-2 right-2 border p-[1px] rounded-md bg-[#e8e8e8] border-[#696969]"
                      onClick={() => handleEditSubdom(item)}
                    >
                      <img
                        src={edit}
                        alt="pen"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                ))
              )}
            </ul>
          </>
        )}
      </div>
      <Link to="/">
        <button className="fixed bottom-5 right-5 md:right-12 md:bottom-12 text-xl font-bold bg-white p-3 rounded-lg">
          Back
        </button>
      </Link>
    </section>
  );
};

export default User;
