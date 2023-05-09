import { longAddressCrop } from "../../../utils/index";
import copy from "../../../assets/icons/copy.png";
import check from "../../../assets/icons/check.png";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";
import pen from "../../../assets/icons/edit.png";

const SubdomainInfo = ({
  setVisibility,
  Name,
  Owner,
  Desc,
  Email,
  Avatar,
  Webs,
  edit,
  cardChanger,
}) => {
  const [copied, setCopied] = useState(false);

  const changeCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleEditFromOutside = () => {
    cardChanger(true);
    setVisibility(false);
  };

  return (
    <>
      <section
        onClick={() => setVisibility(false)}
        className="fixed w-full bottom-0 right-0 left-0 top-0 bg-[#000000e0] z-50 flex items-center justify-center"
      ></section>
      <div className="bg-white w-[350px] px-3 fixed -translate-y-[50%] z-[51] -translate-x-[50%] left-[50%] top-[50%] py-10 flex flex-col items-center rounded-lg">
        {edit && (
          <div
            onClick={handleEditFromOutside}
            className="absolute cursor-pointer py-1 gap-2 items-center px-2 flex bottom-2 right-2 border p-[1px] rounded-md bg-[#e8e8e8] border-[#696969]"
          >
            <h2 className="font-semibold">
              {" "}
              Since you are the owenr you can edit
            </h2>
            <div
              className="border p-[1px] rounded-md bg-[#ffffff] border-[#696969]"
              // onClick={hadnleEditAvatar}
            >
              <img
                src={pen}
                alt="pen"
                className="w-6 h-6"
              />
            </div>
          </div>
        )}
        <h2 className="text-xl font-bold">Subdomain Info:</h2>
        <img
          src={Avatar}
          alt="prof-pic"
          className="w-32 flex justify-center mt-2 items-center h-32 border border-black rounded-md"
        />
        <h2 className="text-xl font-bold mt-5">{Name}</h2>
        <ul className="flex mt-4 flex-col mb-5 items-center text-center">
          <li className="flex items-center justify-center gap-2">
            <span className="font-bold">Owner:</span> {longAddressCrop(Owner)}{" "}
            <CopyToClipboard text={Owner}>
              <button
                onClick={changeCopy}
                className="flex justify-center items-center"
              >
                <img
                  src={copied ? check : copy}
                  alt=""
                  className="w-5 h-5 flex justify-center items-center"
                />
              </button>
            </CopyToClipboard>
          </li>
          <li>
            <span className="font-bold">Description:</span> {Desc}
          </li>
          <li>
            <span className="font-bold">Email:</span> {Email}
          </li>
          <li>
            <span className="font-bold">Website:</span>
            {Webs}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SubdomainInfo;
