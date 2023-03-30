import { Link } from "react-router-dom";
import { addressShortener } from "../../../utils/index";

// const DomainlistItem = ({ domain, address, id }) => {
const DomainlistItem = () => {
  return (
    <Link to="/domain">
      <li className="w-72 h-24 bg-white flex flex-col items-center justify-center rounded-xl border-2 border-[#c3c3c3] cursor-pointer text-center">
        <h2 className="font-bold text-xl">domain-name.inu</h2>
        <h2 className="font-semibold">0x43...1da3</h2>
        <h2 className="font-semibold">12 subdomains</h2>
      </li>
    </Link>
  );
};

export default DomainlistItem;
