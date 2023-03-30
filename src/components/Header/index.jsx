import { useWeb3Modal } from "@web3modal/react";
import { Link, NavLink } from "react-router-dom";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { addressShortener } from "../../utils";

const Header = () => {
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const { address, isConnected } = useAccount();

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
  return (
    <header className="w-full flex justify-center pt-1 px-1">
      <div className="flex flex-col gap-1 w-full justify-center items-center">
        <div className="max-w-screen-2xl w-full flex justify-center items-center p-2 rounded-xl bg-[#252b2fe3]">
          <ul className="flex gap-2">
            <li className="bg-[#4847C9] min-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#e7e7e7] font-bold">
              Telegram
            </li>
            <li className="bg-[#4847C9] min-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#e7e7e7] font-bold">
              Twitter
            </li>
            <li className="bg-[#4847C9] min-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#e7e7e7] font-bold">
              Puppynet
            </li>
          </ul>

          <h1>
            <Link to="/">
              <div className="flex w-32 h-24 mx-5 rounded-2xl bg-white font-bold text-xl justify-center items-center">
                Logo
              </div>
            </Link>
          </h1>

          <ul className="flex gap-2">
            <li className="bg-[#4847C9] min-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#e7e7e7] font-bold">
              About
            </li>
            <li className="bg-[#4847C9] min-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#e7e7e7] font-bold">
              Bridge
            </li>
            <li className="bg-[#4847C9] min-w-[120px] w-full flex justify-center items-center h-12 rounded-xl text-[#e7e7e7] font-bold">
              Docs
            </li>
          </ul>
        </div>
        <div className="max-w-screen-2xl bg-[#c3ff43f0] font-bold w-full flex justify-center items-center p-2 rounded-xl">
          This is a warning, write something here
        </div>
      </div>
    </header>
  );
};

export default Header;
