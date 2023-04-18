import { Link } from "react-router-dom";
import { addressShortener } from "../../../utils/index";

const DomainlistItem = ({ domain, owner, subCount, setter }) => {
  return (
    <Link
      onClick={() => setter(domain)}
      to={`/domain/${domain}`}
    >
      <li className="w-72 h-24 bg-white flex flex-col items-center justify-center rounded-xl border-2 border-[#c3c3c3] cursor-pointer text-center">
        <h2 className="font-bold text-xl">{domain}.inu</h2>
        <h2 className="font-semibold">Owner:{addressShortener(owner)}</h2>
        <h2 className="font-semibold">Subdomains:{subCount}</h2>
      </li>
    </Link>
  );
};

export default DomainlistItem;
