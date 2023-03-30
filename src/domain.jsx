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

const Domain = () => {
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
          <span className="text-[#b3fb7b] text-lg italic">shibarium.com</span>

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
          <SubDomainlistItem parent="domain" sub="dev" />
          <SubDomainlistItem parent="domain" sub="marketing" />{" "}
          <SubDomainlistItem parent="domain" sub="airdrop" />{" "}
          <SubDomainlistItem parent="domain" sub="vault" />{" "}
          <SubDomainlistItem parent="domain" sub="cto" />{" "}
          <SubDomainlistItem parent="domain" sub="ceo" />{" "}
          <SubDomainlistItem parent="domain" sub="liquidity" />{" "}
          <SubDomainlistItem parent="domain" sub="burn" />{" "}
          <SubDomainlistItem parent="domain" sub="vested" />{" "}
          <SubDomainlistItem parent="domain" sub="presale" />{" "}
          <SubDomainlistItem parent="domain" sub="casino" />{" "}
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
