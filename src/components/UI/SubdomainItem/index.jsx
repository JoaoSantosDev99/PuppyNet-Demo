import { addressShortener } from "../../../utils/index";

// const DomainlistItem = ({ domain, address, id }) => {
const SubDomainlistItem = ({ parent, sub }) => {
  return (
    <li className="w-72 h-24 bg-white flex flex-col items-center justify-center rounded-xl border-2 border-[#919191] cursor-pointer text-center">
      <h2 className="font-bold text-xl">{sub + "." + parent + ".inu"}</h2>
      <h2 className="font-semibold">0x43...1da3</h2>
    </li>
  );
};

export default SubDomainlistItem;
