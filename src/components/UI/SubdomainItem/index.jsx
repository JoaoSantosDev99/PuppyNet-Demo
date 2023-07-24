const SubDomainlistItem = ({ parent, sub }) => {
  return (
    <li className="w-60 h-20 text-black bg-white flex flex-col items-center justify-center rounded-md cursor-pointer text-center">
      <h2 className="font-bold leading-[20px] text-2xl">{sub}</h2>
      <h2 className="font-bold leading-[18px] text-lg">{parent}.inu</h2>
    </li>
  );
};

export default SubDomainlistItem;
