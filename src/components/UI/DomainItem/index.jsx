import { Link } from "react-router-dom";
import { addressShortener } from "../../../utils/index";
import { ethers } from "ethers";
import avatar from "../../../assets/icons/avatar.png";
import { useState } from "react";

const DomainlistItem = ({ domain, owner }) => {
  const formatedName =
    (ethers.utils.parseBytes32String(domain) + ".inu").length > 13
      ? ethers.utils.parseBytes32String(domain).slice(0, 11) + ".."
      : ethers.utils.parseBytes32String(domain) + ".inu";

  return (
    <Link
      to={`/${ethers.utils.parseBytes32String(domain)}`}
      key={domain}
    >
      <li className="w-60 h-20 px-4 gap-2 bg-white flex items-center justify-center rounded-sm cursor-pointer text-center">
        <div className="">
          <img
            src={avatar}
            alt=""
            className="w-14"
          />
        </div>
        <div className="flex-grow flex flex-col items-start">
          <h2 className="font-bold text-xl">{formatedName} </h2>

          <h2 className="font-semibold">{addressShortener(owner)}</h2>
        </div>
      </li>
    </Link>
  );
};

export default DomainlistItem;
