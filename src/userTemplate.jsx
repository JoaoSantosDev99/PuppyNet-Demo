import down from "./assets/down.png";
import profile from "./assets/profile.png";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { addressShortener } from "./utils";
import { ethers } from "ethers";
// import registrarAbi from "./contracts/tokens_abi.json";
import DomainlistItem from "./components/UI/DomainItem";
import SubDomainlistItem from "./components/UI/SubdomainItem";
import { Link } from "react-router-dom";
const { getNFTsByAddress } = require("sns-namechecker");

const User = () => {
  const { address, isConnected } = useAccount();
  const [primary, setprimary] = useState("cryptodaddy.inu");
  const [tokenBalance, setTokenBalance] = useState();
  const [updateUserData, setUpdateUserData] = useState(false);
  const { data: signer } = useSigner();

  //   const staticProvider = new ethers.providers.JsonRpcProvider(
  //     "https://rpc.ankr.com/eth"
  //   );

  //   const tokenAddress = "0xEa4a2327E75252517535fd013b7C6706609819DB";
  //   const tokenAbi = abi;

  //   const readTokenContract = new ethers.Contract(
  //     tokenAddress,
  //     tokenAbi,
  //     staticProvider
  //   );

  //   useEffect(() => {
  //     const getBalance = async () => {
  //       const balance = await readTokenContract.balanceOf(address);
  //       const formatedBalance = ethers.utils.formatUnits(balance, 18);
  //       setTokenBalance(
  //         Number(Number(formatedBalance).toFixed(0)).toLocaleString()
  //       );
  //     };

  //     const fetchUserNfts = async () => {
  //       const test = await getNFTsByAddress(
  //         "0x689f654f452cbe147e870d290f84e6ad479f48a0"
  //       );
  //       console.log(test);
  //     };

  //     getBalance();
  //     fetchUserNfts();
  //   }, []);

  const changePrimary = (e) => {
    setprimary(e.target.textContent);
  };

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-screen-2xl flex p-1 sm:px-4 flex-col items-center justify-center min-h-screen w-full">
        {/* Avatar */}

        <div className="mt-20 sm:mt-44 mb-10 flex flex-col gap-2 items-center">
          <div className="w-36 p-2 h-36 rounded-xl bg-[#fdfdfd] border-2 border-[#919191]"></div>
          <h2 className="p-2 rounded-xl bg-white min-w-[300px] flex justify-center items-center font-bold text-2xl">
            exampledoamin.inu
          </h2>

          {/* Description */}
          <p className="max-w-lg text-center mt-5 text-white font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            ad ab impedit, veritatis aliquid similique consectetur fugit maxime
            ducimus, enim neque voluptatum sequi. Dicta nisi quibusdam
            voluptatum ab error delectus?
          </p>

          {/* Primary */}
          <div className="w-96 mt-10 rounded-xl flex flex-col gap-1 justify-center items-center">
            <div className="flex justify-center w-full">
              <div className="w-[90%]">
                <div
                  className="relative"
                  data-te-dropdown-ref
                >
                  <button
                    className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl"
                    data-te-dropdown-toggle-ref
                  >
                    {primary}
                  </button>
                  <ul
                    className="absolute w-full z-[1000] text-[#ededed] font-bold p-4 hidden list-none overflow-hidden rounded-lg border-none bg-[#8b8b8b] shadow-lg [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenu"
                    data-te-dropdown-menu-ref
                  >
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      cryptodaddy.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      snshypper.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      100xmisser.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      elonenjoyer420.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      fomoguy65.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      paperhands69.inu
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h3 className="text-md font-sans text-[#58ff5e] font-bold text-center">
              Select Primary Domain
            </h3>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-5 max-w-7xl w-full">
          {/* Data */}
          <div className="flex flex-col flex-wrap justify-center items-center gap-1">
            <ul className="bg-[#c3c3c3] text-center flex justify-center text-[#000000] w-[350px] h-36 flex-col text-lg sm:text-xl font-bold p-3 rounded-xl">
              <li>Primary: {primary}</li>
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

          {/* Transfer Domain */}
          <div className="flex flex-col bg-[#8b8b8b] w-[400px] justify-center items-center p-2 rounded-xl">
            {/* Dropdown */}
            <div className="flex justify-center w-full">
              <div className="w-[90%]">
                <div
                  className="relative"
                  data-te-dropdown-ref
                >
                  <button
                    className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#9d9d9d] flex justify-center items-center p-2 rounded-xl"
                    data-te-dropdown-toggle-ref
                  >
                    {primary}
                  </button>
                  <ul
                    className="absolute w-full z-[1000] text-[#fff] font-bold p-4 hidden list-none overflow-hidden rounded-lg border-none bg-[#414141] shadow-lg [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenu"
                    data-te-dropdown-menu-ref
                  >
                    <li className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg">
                      cryptodaddy.inu
                    </li>
                    <li className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg">
                      snshypper.inu
                    </li>
                    <li className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg">
                      100xmisser.inu
                    </li>
                    <li className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg">
                      elonenjoyer420.inu
                    </li>
                    <li className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg">
                      fomoguy65.inu
                    </li>
                    <li className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg">
                      paperhands69.inu
                    </li>
                  </ul>
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

        <h2 className="flex text-[#ffffff] text-4xl font-bold mb-2 mt-20 text-center">
          Your subdomains
        </h2>

        {/* subdomains List */}

        <div className="max-w-4xl rounded flex items-center justify-end w-full font-bold text-lg py-2 bg-[#c6c6c600] mt-10">
          <button className="bg-[#464646] rounded p-2 text-white">
            New Subdomain +
          </button>

          <div className="">
            <div className="flex justify-center w-[200px]">
              <div className="w-[90%]">
                <div
                  className="relative"
                  data-te-dropdown-ref
                >
                  <button
                    className="gap-2 w-full px-4 bg-[#393939] font-bold text-[#f2f2f2] border-2 border-[#a1a1a1] flex justify-center items-center p-2 rounded-xl"
                    data-te-dropdown-toggle-ref
                  >
                    {primary}
                  </button>
                  <ul
                    className="absolute w-full z-[1000] text-[#ededed] font-bold p-4 hidden list-none overflow-hidden rounded-lg border-none bg-[#8b8b8b] shadow-lg [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenu"
                    data-te-dropdown-menu-ref
                  >
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      cryptodaddy.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      snshypper.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      100xmisser.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      elonenjoyer420.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      fomoguy65.inu
                    </li>
                    <li
                      onClick={changePrimary}
                      className="py-1 mb-1 cursor-pointer transition-all ease-in-out duration-150 hover:bg-[#a4a4a4] text-center px-2 rounded-lg"
                    >
                      paperhands69.inu
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="mt-2 mb-20 max-w-4xl flex justify-center flex-wrap gap-2">
          <SubDomainlistItem
            parent="domain"
            sub="dev"
          />
          <SubDomainlistItem
            parent="domain"
            sub="marketing"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="airdrop"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="vault"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="cto"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="ceo"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="liquidity"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="burn"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="vested"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="presale"
          />{" "}
          <SubDomainlistItem
            parent="domain"
            sub="casino"
          />{" "}
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

export default User;
